from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any, Optional, Tuple, Set
import uvicorn
from collections import defaultdict

class NodeData(BaseModel):
    id: str
    type: str
    position: Dict[str, float]
    data: Dict[str, Any]
    width: int
    height: int

class EdgeStyle(BaseModel):
    strokeWidth: int
    animation: str

class Edge(BaseModel):
    id: str
    type: str
    source: str
    target: str
    sourceHandle: str
    targetHandle: str
    animated: bool
    style: EdgeStyle
    deletable: bool
    markerEnd: Optional[Dict[str, str]] = None

class PipelineRequest(BaseModel):
    nodes: List[NodeData]
    edges: List[Edge]

class PipelineResponse(BaseModel):
    num_nodes: int
    num_edges: int
    is_dag: bool
    is_pipeline: bool

def get_graph_components(nodes: List[NodeData], edges: List[Edge]) -> Tuple[Dict[str, List[str]], Set[str], Set[str]]:
    """Helper function to get graph components for analysis"""
    # Create adjacency list
    graph = defaultdict(list)
    # Track incoming and outgoing connections
    incoming = defaultdict(int)
    outgoing = defaultdict(int)
    
    for edge in edges:
        graph[edge.source].append(edge.target)
        incoming[edge.target] += 1
        outgoing[edge.source] += 1
    
    # Find start nodes (no incoming edges) and end nodes (no outgoing edges)
    node_ids = {node.id for node in nodes}
    start_nodes = {node for node in node_ids if incoming[node] == 0}
    end_nodes = {node for node in node_ids if outgoing[node] == 0}
    
    return graph, start_nodes, end_nodes

def check_is_dag(nodes: List[NodeData], edges: List[Edge]) -> bool:
    """Check if the graph is a DAG (no cycles)"""
    if not nodes:
        return True  # Empty graph is considered a valid DAG
        
    graph = defaultdict(list)
    for edge in edges:
        graph[edge.source].append(edge.target)
    
    visited = set()
    recursion_stack = set()
    
    def has_cycle(node: str) -> bool:
        visited.add(node)
        recursion_stack.add(node)
        
        for neighbor in graph[node]:
            if neighbor not in visited:
                if has_cycle(neighbor):
                    return True
            elif neighbor in recursion_stack:
                return True
        
        recursion_stack.remove(node)
        return False
    
    # Check for cycles starting from each unvisited node
    for node in [node.id for node in nodes]:
        if node not in visited:
            if has_cycle(node):
                return False  # Found a cycle, not a DAG
    
    return True

def check_is_pipeline(nodes: List[NodeData], edges: List[Edge]) -> bool:
    """
    Check if the graph is a valid pipeline:
    - Must have 2+ nodes
    - Must have edges connecting nodes
    - Must be a DAG (no cycles)
    - Must have valid start and end nodes
    - All nodes must be connected
    """
    # Basic checks
    if len(nodes) < 2 or len(edges) == 0:  # Added explicit check for edges
        return False
    if not check_is_dag(nodes, edges):
        return False
        
    graph, start_nodes, end_nodes = get_graph_components(nodes, edges)
    
    # Must have at least one start and one end node
    if not start_nodes or not end_nodes:
        return False
        
    # Check if all nodes are reachable from start nodes
    reachable = set()
    
    def dfs(node: str):
        reachable.add(node)
        for neighbor in graph[node]:
            if neighbor not in reachable:
                dfs(neighbor)
    
    # Run DFS from all start nodes
    for start in start_nodes:
        dfs(start)
    
    # All nodes must be reachable
    return len(reachable) == len(nodes)


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse', response_model=PipelineResponse)
async def parse_pipeline(request: PipelineRequest) -> PipelineResponse:
    return PipelineResponse(
        num_nodes=len(request.nodes),
        num_edges=len(request.edges),
        is_dag=check_is_dag(request.nodes, request.edges),
        is_pipeline=check_is_pipeline(request.nodes, request.edges)
    )

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)