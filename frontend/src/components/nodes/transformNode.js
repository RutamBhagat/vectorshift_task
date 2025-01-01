import { Position } from "reactflow";
import { NodeWrapper } from "./NodeWrapper";
import { Textarea } from "../ui/textarea";

export const TransformNode = ({ id }) => {
  const handles = [
    { type: "target", position: Position.Left, id: `${id}-input` },
    { type: "source", position: Position.Right, id: `${id}-output` }
  ];

  return (
    <NodeWrapper title="Transform Node" handles={handles}>
      <Textarea
        placeholder="Enter transformation logic..."
        className="h-20 border-[#818CF8]"
      />
    </NodeWrapper>
  );
};
