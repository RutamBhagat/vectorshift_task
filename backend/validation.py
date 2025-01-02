from typing import List, Dict, Any, Tuple, Set
from collections import defaultdict
from models import NodeData, Edge

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
    
    # Empty graph validation
    if not node_ids:
        return True, dag_messages
    
    # Check for self-loops in edges
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
        # Find specific type of cycle
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
    
    # Basic structure validations
    if not nodes:
        pipeline_messages.append("Empty graph (no nodes)")
        return False, pipeline_messages
        
    if len(node_ids) == 1:
        pipeline_messages.append("Invalid pipeline: contains only a single node")
        return False, pipeline_messages

    if not edges:
        pipeline_messages.append("Invalid pipeline: nodes exist but no connections between them")
        return False, pipeline_messages

    # Build undirected graph for connectivity check
    undirected = defaultdict(set)
    for node in node_ids:
        for neighbor in graph[node]:
            undirected[node].add(neighbor)
            undirected[neighbor].add(node)

    # Check if all nodes are connected
    connected = set()
    def dfs(node: str):
        connected.add(node)
        for neighbor in undirected[node]:
            if neighbor not in connected:
                dfs(neighbor)

    start = next(iter(node_ids))
    dfs(start)

    if len(connected) != len(node_ids):
        disconnected = node_ids - connected
        pipeline_messages.append(f"Invalid pipeline: disconnected nodes detected")
        return False, pipeline_messages

    # Check for start and end nodes
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

    # Validate DAG properties first
    is_dag, dag_messages = validate_dag(graph, in_degree, node_ids, edges)
    
    # Only validate pipeline if it's a valid DAG
    if is_dag:
        is_pipeline, pipeline_messages = validate_pipeline(graph, in_degree, node_ids, nodes, edges)
    else:
        is_pipeline = False
        pipeline_messages = ["Pipeline validation skipped - not a valid DAG"]
    
    return is_dag, is_pipeline, dag_messages, pipeline_messages