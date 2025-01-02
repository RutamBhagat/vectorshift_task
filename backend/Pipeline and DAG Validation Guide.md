# Pipeline and DAG Validation Guide

## DAG Validation (`is_dag`)
For when only cycle detection is needed.

### Returns `true`:
- Empty graph (no nodes, no edges)
- Single node (no edges)
- Multiple nodes with no edges
- Linear flow (A → B → C)
- Branching flow (A → B, A → C)
- Multiple paths without cycles (A → B → D, A → C → D)

### Returns `false`:
- Self-loop (A → A)
- Direct cycle (A → B → A)
- Indirect cycle (A → B → C → A)
- Complex cycle (A → B → C, B → D → A)

## Pipeline Validation (`is_pipeline`)
For when additional pipeline structure rules are needed.

### Returns `true`:
- Multiple nodes (2+) with valid connections
- Linear flow (A → B → C)
- Branching flow with 2+ nodes (A → B, A → C)
- Multiple valid paths (A → B → D, A → C → D)

### Returns `false`:
- Empty graph (no nodes)
- Single node
- Multiple nodes with no edges
- Any cycles (like in `is_dag`)
- Invalid connections

## Example Visualizations:
```
Valid DAG & Pipeline:    Valid DAG but Invalid Pipeline:    Invalid for Both:
       A                         A                               A
      / \                                                      / \
     B   C                      (no edges)                    B   C
      \ /                                                      \ /
       D                                                        A
```
