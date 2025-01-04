import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models import PipelineRequest, PipelineResponse
from validation import validate_graph
from logger import log_to_markdown

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
async def parse_pipeline(request: PipelineRequest) -> PipelineResponse:
    print(f"Received request with {len(request.nodes)} nodes and {len(request.edges)} edges")
    is_dag, is_pipeline, dag_messages, pipeline_messages = validate_graph(request.nodes, request.edges)
    response = PipelineResponse(
        num_nodes=len(request.nodes),
        num_edges=len(request.edges),
        is_dag=is_dag,
        is_pipeline=is_pipeline,
        dag_validation_messages=dag_messages,
        pipeline_validation_messages=pipeline_messages
    )
    log_to_markdown(request, response)
    return response

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)