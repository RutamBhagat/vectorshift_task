import { Position } from "reactflow";
import { NodeWrapper } from "./NodeWrapper";

export const LLMNode = ({ id, data }) => {
  const handles = [
    {
      type: "target",
      position: Position.Left,
      id: `${id}-system`,
      style: { top: "33%" }
    },
    {
      type: "target",
      position: Position.Left,
      id: `${id}-prompt`,
      style: { top: "66%" }
    },
    {
      type: "source",
      position: Position.Right,
      id: `${id}-response`
    }
  ];

  return (
    <NodeWrapper id={id} title="LLM Node" handles={handles}>
      <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
        Large Language Model
      </div>
    </NodeWrapper>
  );
};
