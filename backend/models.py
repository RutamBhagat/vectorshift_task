from pydantic import BaseModel
from typing import List, Dict, Any, Optional

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