import { Position } from "reactflow";
import { NodeWrapper } from "./node-wrapper";
import { MessageSquare } from "lucide-react";

export const LLMNode = ({ id, data }) => {
  const handles = [
    {
      type: "target",
      position: Position.Left,
      id: `${id}-system`,
      style: { top: "33%" },
      label: "System",
    },
    {
      type: "target",
      position: Position.Left,
      id: `${id}-prompt`,
      style: { top: "66%" },
      label: "Prompt",
    },
    {
      type: "source",
      position: Position.Right,
      id: `${id}-response`,
      label: "Response",
    },
  ];

  return (
    <NodeWrapper
      id={id}
      title="LLM Node"
      handles={handles}
      icon={MessageSquare}
    >
      <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
        Large Language Model
      </div>
    </NodeWrapper>
  );
};
