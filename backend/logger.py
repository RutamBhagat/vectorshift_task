from datetime import datetime
import json
from models import PipelineRequest, PipelineResponse

def log_to_markdown(request: PipelineRequest, response: PipelineResponse):
    """Log request and response to markdown file"""
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    # Format JSON with proper indentation
    request_json = json.dumps(json.loads(request.json()), indent=2)
    response_json = json.dumps(json.loads(response.json()), indent=2)
    
    log_entry = f"""
## Request at {timestamp}

### Pipeline Request
```json
{request_json}
```

### Pipeline Response
```json
{response_json}
```

---
"""
    with open("pipeline_logs.md", "a") as log_file:
        log_file.write(log_entry)