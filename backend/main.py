from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
import uvicorn

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

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse', response_model=PipelineResponse)
async def parse_pipeline(pipeline) -> PipelineResponse:
    # Add validation logic here if needed
    return PipelineResponse(
        num_nodes=len(pipeline.nodes),
        num_edges=len(pipeline.edges),
        is_dag=True  # Add actual DAG validation logic here
    )

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
