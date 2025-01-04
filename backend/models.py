from typing import List, Optional
from pydantic import BaseModel

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