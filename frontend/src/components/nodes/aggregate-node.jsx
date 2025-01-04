import { Position } from "reactflow";
import { NodeWrapper } from "./node-wrapper";
import { Layers } from "lucide-react";

export const AggregateNode = ({ id }) => {
  const handles = [
    {
      type: "target",
      position: Position.Left,
      id: `${id}-input1`,
      style: { top: "25%" },
      label: "Source 1",
    },
    {
      type: "target",
      position: Position.Left,
      id: `${id}-input2`,
      style: { top: "75%" },
      label: "Source 2",
    },
    {
      type: "source",
      position: Position.Right,
      id: `${id}-output`,
      label: "Combined",
    },
  ];

  return (
    <NodeWrapper id={id} title="Aggregate Node" handles={handles} icon={Layers}>
      <div className="bg-gray-50 p-3 rounded text-sm text-gray-600">
        Combines multiple inputs into a single output
      </div>
    </NodeWrapper>
  );
};
