from fastapi import FastAPI, Form
import uvicorn

app = FastAPI()

def analyze_pipeline(pipeline_str: str) -> dict:
    # Stub implementation - would normally parse and analyze the pipeline
    return {
        "num_nodes": 3,  # Hardcoded values
        "num_edges": 2,
        "is_dag": True
    }

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.get('/pipelines/parse')
def parse_pipeline(pipeline: str = Form(...)):
    analysis = analyze_pipeline(pipeline)
    return analysis

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
