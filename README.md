# VectorShift Frontend Technical Assessment Instructions

You can find all files necessary for the assignment in the `/frontend/src` and `/backend` folders. Feel free to make any changes to the provided files, including adding new files, deleting existing files, installing new packages, and modifying any provided code. Please use **JavaScript/React** for the frontend and **Python/FastAPI** for the backend.

---

## Getting Started
- To run the **frontend**:
  1. Navigate to the `/frontend` directory.
  2. Run `npm install`.
  3. Run `npm start`.
  
- To run the **backend**:
  1. Navigate to the `/backend` directory.
  2. Run `uvicorn main:app --reload`.

If you have any questions, feel free to reach out to [recruiting@vectorshift.ai](mailto:recruiting@vectorshift.ai).

---

## Assessment Overview

The assessment consists of **four parts**. You are encouraged to read all parts before starting so you can plan your approach.

---

### Part 1: Node Abstraction
In `/frontend/src`, you will find a folder called `nodes`. This folder contains JavaScript files for four types of nodes:
- Inputs
- Outputs
- LLMs
- Text

Currently, new nodes can be created by copying an existing node and modifying it. However, this leads to code duplication, making it harder to maintain as the number of nodes grows.

#### Your Task:
1. **Create an abstraction** for the nodes to streamline the process of creating and styling new nodes.
2. Use this abstraction to create **five new nodes** of your choice to demonstrate its flexibility and efficiency.
   - The functionality of these nodes is not critical; focus on showcasing the reusability of your abstraction.

---

### Part 2: Styling
The provided frontend files lack significant styling.

#### Your Task:
1. Apply an appealing, unified design to the various components.
2. You may use existing VectorShift styles for inspiration or design from scratch.
3. Utilize any React packages or libraries of your choice.

---

### Part 3: Text Node Logic
The Text node in `/frontend/src/nodes` currently has a basic text input field.

#### Your Task:
1. **Dynamic Resizing**: Update the width and height of the Text node to adjust dynamically based on the amount of text entered.
2. **Variable Parsing**:
   - Allow users to define variables in their text input by using double curly brackets (e.g., `{{ input }}`).
   - For each variable, create a **new Handle** on the left side of the Text node that corresponds to the variable.
3. Refer to the provided VectorShift Text node examples or tutorials for inspiration.

---

### Part 4: Backend Integration
The `/backend` folder contains a simple Python/FastAPI backend.

#### Your Task:
1. **Frontend Updates**:
   - Modify `/frontend/src/submit.js` to send the nodes and edges of the pipeline to the `/pipelines/parse` endpoint in the backend when the button is clicked.

2. **Backend Updates**:
   - Modify the `/pipelines/parse` endpoint in `/backend/main.py` to:
     - Calculate the number of nodes and edges in the pipeline.
     - Check if the pipeline forms a **Directed Acyclic Graph (DAG)**.
     - Return a response in the format:
       ```json
       {
         "num_nodes": int,
         "num_edges": int,
         "is_dag": bool
       }
       ```

3. **Frontend Alert**:
   - Create an alert on the frontend to display the backend response values (`num_nodes`, `num_edges`, and `is_dag`) in a user-friendly format.
   - The final result should allow the user to:
     - Create a pipeline.
     - Click a "Submit" button.
     - Receive a response in the alert indicating the number of nodes, edges, and whether the pipeline is a DAG.

---

### Final Deliverables
- A functional frontend and backend demonstrating the tasks outlined above.
- An abstracted and styled frontend that allows for scalability.
- Integration between the frontend and backend with a working response alert.

Good luck, and we look forward to seeing your work!