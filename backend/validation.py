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

def validate_dag(graph: Dict[str, List[str]], in_degree: Dict[str, int], node_ids: Set[str]) -> bool:
    """Check if the graph is a DAG using Kahn's algorithm"""
    if not node_ids:
        return True

    zero_in_degree = [node for node in node_ids if in_degree[node] == 0]
    visited_count = 0
    temp_in_degree = in_degree.copy()

    while zero_in_degree:
        current = zero_in_degree.pop(0)
        visited_count += 1

        for neighbor in graph[current]:
            temp_in_degree[neighbor] -= 1
            if temp_in_degree[neighbor] == 0:
                zero_in_degree.append(neighbor)

    return visited_count == len(node_ids)

def validate_pipeline(graph: Dict[str, List[str]], in_degree: Dict[str, int], node_ids: Set[str]) -> bool:
    """Check if the graph forms a valid pipeline"""
    if len(node_ids) < 2:
        return False

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

    return len(connected) == len(node_ids)

def validate_graph(nodes: List[NodeData], edges: List[Edge]) -> Tuple[bool, bool]:
    """Combined validation for both DAG and Pipeline properties"""
    # Empty or single node cases
    if not nodes:
        return True, False
    if not edges:
        return True, False

    graph, in_degree, node_ids = build_graph(nodes, edges)

    is_dag = validate_dag(graph, in_degree, node_ids)
    if not is_dag:
        return False, False

    is_pipeline = validate_pipeline(graph, in_degree, node_ids)
    return is_dag, is_pipeline