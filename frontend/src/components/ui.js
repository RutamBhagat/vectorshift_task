import { useState, useRef, useCallback } from "react";
import ReactFlow, { Controls, Background, MiniMap, getSmoothStepPath } from "reactflow";
import { XCircle } from "lucide-react";
import { useStore } from "./store";
import { shallow } from "zustand/shallow";
import { InputNode } from "./nodes/inputNode";
import { LLMNode } from "./nodes/llmNode";
import { OutputNode } from "./nodes/outputNode";
import { TextNode } from "./nodes/textNode";

import "reactflow/dist/style.css";
import { AggregateNode } from "./nodes/aggregateNode";
import { DebugNode } from "./nodes/debugNode";
import { FilterNode } from "./nodes/filterNode";
import { HttpNode } from "./nodes/httpNode";
import { TransformNode } from "./nodes/transformNode";
import { Card } from "./ui/card";

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  aggeregate: AggregateNode,
  debug: DebugNode,
  filter: FilterNode,
  http: HttpNode,
  transform: TransformNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

const EdgeWithDelete = ({ id, sourceX, sourceY, targetX, targetY }) => {
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    borderRadius: 8,
    offset: 0,
    centerX: (sourceX + targetX) / 2,
    centerY: (sourceY + targetY) / 2,
    smoothStep: true,
  });

  const { removeEdge } = useStore(state => ({ removeEdge: state.removeEdge }));

  return (
    <>
      <path
        id={id}
        className="react-flow__edge-path"
        d={edgePath}
        strokeWidth={2}
        stroke="#b1b1b7"
        style={{ 
          pointerEvents: 'all'
        }}
      />
      <foreignObject
        width={20}
        height={20}
        x={labelX - 10}
        y={labelY - 10}
        className="cursor-pointer flex items-center justify-center"
        onClick={(e) => {
          e.stopPropagation();
          removeEdge(id);
        }}
      >
        <div className="bg-white rounded-full p-[2px]">
          <XCircle className="h-4 w-4 bg-white text-muted-foreground hover:text-destructive" />
        </div>
      </foreignObject>
    </>
  );
};

const edgeTypes = {
  custom: EdgeWithDelete,
};

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
  } = useStore(selector, shallow);

  const getInitNodeData = (nodeID, type) => {
    let nodeData = { id: nodeID, nodeType: `${type}` };
    return nodeData;
  };

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      if (event?.dataTransfer?.getData("application/reactflow")) {
        const appData = JSON.parse(
          event.dataTransfer.getData("application/reactflow")
        );
        const type = appData?.nodeType;

        // check if the dropped element is valid
        if (typeof type === "undefined" || !type) {
          return;
        }

        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        const nodeID = getNodeID(type);
        const newNode = {
          id: nodeID,
          type,
          position,
          data: getInitNodeData(nodeID, type),
        };

        addNode(newNode);
      }
    },
    [reactFlowInstance]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  return (
    <Card ref={reactFlowWrapper} className="flex-1 rounded-none">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        nodeTypes={nodeTypes}
        proOptions={proOptions}
        snapGrid={[gridSize, gridSize]}
        connectionLineType="smoothstep"
        edgeTypes={edgeTypes}
        defaultEdgeOptions={{ 
          type: 'custom',
          deletable: true,
          style: { 
            strokeWidth: 2,
            animation: 'none'
          },
          animated: false
        }}
        fitView
        minZoom={0.2}
        maxZoom={4}
        defaultViewport={{ x: 0, y: 0, zoom: 1 }}
      >
        <Background color="#aaa" gap={gridSize} />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </Card>
  );
};
