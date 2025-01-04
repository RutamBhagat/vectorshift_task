from typing import List, Dict, Set, Tuple, Optional
from collections import defaultdict
from pydantic import BaseModel
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Models
class Position(BaseModel):
    x: float
    y: float

class Style(BaseModel):
    strokeWidth: int
    stroke: str

class MarkerEnd(BaseModel):
    type: str
    width: int
    height: int
    color: str

class NodeData(BaseModel):
    id: str
    nodeType: str

class Node(BaseModel):
    id: str
    type: str
    position: Position
    data: NodeData
    width: int
    height: int
    selected: Optional[bool] = False
    dragging: Optional[bool] = False

class Edge(BaseModel):
    type: str
    deletable: bool
    style: Style
    markerEnd: MarkerEnd
    animated: bool
    source: str
    sourceHandle: str
    target: str
    targetHandle: str
    id: str

class PipelineRequest(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

class PipelineResponse(BaseModel):
    num_nodes: int
    num_edges: int
    is_dag: bool
    is_pipeline: bool
    dag_validation_messages: List[str]
    pipeline_validation_messages: List[str]

# Validation Functions
def build_graph(nodes: List[NodeData], edges: List[Edge]) -> Tuple[Dict[str, List[str]], Dict[str, int], Set[str]]:
    """Build adjacency graph and track in-degrees"""
    graph: Dict[str, List[str]] = defaultdict(list)
    in_degree: Dict[str, int] = defaultdict(int)
    node_ids = {node.id for node in nodes}

    for edge in edges:
        graph[edge.source].append(edge.target)
        in_degree[edge.target] += 1

    return graph, in_degree, node_ids

def validate_dag(graph: Dict[str, List[str]], in_degree: Dict[str, int], node_ids: Set[str], edges: List[Edge]) -> Tuple[bool, List[str]]:
    """Check if the graph is a DAG using Kahn's algorithm"""
    dag_messages = []
    
    if not node_ids:
        return True, dag_messages
    
    if any(edge.source == edge.target for edge in edges):
        dag_messages.append("Self-loop detected (node connected to itself)")
        return False, dag_messages

    zero_in_degree = [node for node in node_ids if in_degree[node] == 0]
    visited_count = 0
    temp_in_degree = in_degree.copy()
    visited_nodes = set()

    while zero_in_degree:
        current = zero_in_degree.pop(0)
        visited_nodes.add(current)
        visited_count += 1

        for neighbor in graph[current]:
            temp_in_degree[neighbor] -= 1
            if temp_in_degree[neighbor] == 0:
                zero_in_degree.append(neighbor)

    if visited_count != len(node_ids):
        remaining = node_ids - visited_nodes
        if len(remaining) == 2:
            dag_messages.append("Direct cycle detected (A → B → A)")
        else:
            dag_messages.append("Complex cycle detected in the graph")
        return False, dag_messages

    return True, dag_messages

def validate_pipeline(graph: Dict[str, List[str]], in_degree: Dict[str, int], node_ids: Set[str], nodes: List[NodeData], edges: List[Edge]) -> Tuple[bool, List[str]]:
    """Check if the graph forms a valid pipeline"""
    pipeline_messages = []
    
    if not nodes:
        pipeline_messages.append("Empty graph (no nodes)")
        return False, pipeline_messages
        
    if len(node_ids) == 1:
        pipeline_messages.append("Invalid pipeline: contains only a single node")
        return False, pipeline_messages

    if not edges:
        pipeline_messages.append("Invalid pipeline: nodes exist but no connections between them")
        return False, pipeline_messages

    undirected = defaultdict(set)
    for node in node_ids:
        for neighbor in graph[node]:
            undirected[node].add(neighbor)
            undirected[neighbor].add(node)

    connected = set()
    def dfs(node: str):
        connected.add(node)
        for neighbor in undirected[node]:
            if neighbor not in connected:
                dfs(neighbor)

    start = next(iter(node_ids))
    dfs(start)

    if len(connected) != len(node_ids):
        pipeline_messages.append(f"Invalid pipeline: disconnected nodes detected")
        return False, pipeline_messages

    start_nodes = [node for node in node_ids if in_degree[node] == 0]
    end_nodes = [node for node in node_ids if not graph[node]]
    
    if not start_nodes:
        pipeline_messages.append("Invalid pipeline: no start node found (all nodes have incoming edges)")
        return False, pipeline_messages
        
    if not end_nodes:
        pipeline_messages.append("Invalid pipeline: no end node found (all nodes have outgoing edges)")
        return False, pipeline_messages

    return True, pipeline_messages

def validate_graph(nodes: List[NodeData], edges: List[Edge]) -> Tuple[bool, bool, List[str], List[str]]:
    """Combined validation for both DAG and Pipeline properties"""
    graph, in_degree, node_ids = build_graph(nodes, edges)
    is_dag, dag_messages = validate_dag(graph, in_degree, node_ids, edges)
    
    if is_dag:
        is_pipeline, pipeline_messages = validate_pipeline(graph, in_degree, node_ids, nodes, edges)
    else:
        is_pipeline = False
        pipeline_messages = ["Pipeline validation skipped - not a valid DAG"]
    
    return is_dag, is_pipeline, dag_messages, pipeline_messages

# FastAPI App
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["POST", "GET", "OPTIONS"],
    allow_headers=["*"],
    max_age=86400,
)

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.options('/pipelines/parse')
@app.post('/pipelines/parse', response_model=PipelineResponse)
async def parse_pipeline(request: PipelineRequest = None) -> PipelineResponse:
    print(f"Received request with {len(request.nodes)} nodes and {len(request.edges)} edges")
    is_dag, is_pipeline, dag_messages, pipeline_messages = validate_graph(request.nodes, request.edges)
    return PipelineResponse(
        num_nodes=len(request.nodes),
        num_edges=len(request.edges),
        is_dag=is_dag,
        is_pipeline=is_pipeline,
        dag_validation_messages=dag_messages,
        pipeline_validation_messages=pipeline_messages
    )
