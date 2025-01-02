import { Position } from "reactflow";
import { NodeWrapper } from "./NodeWrapper";
import { Textarea } from "../ui/textarea";

export const TransformNode = ({ id }) => {
  const handles = [
    { 
      type: "target", 
      position: Position.Left, 
      id: `${id}-input`,
      label: "Input"
    },
    { 
      type: "source", 
      position: Position.Right, 
      id: `${id}-output`,
      label: "Transformed"
    }
  ];

  return (
    <NodeWrapper id={id} title="Transform Node" handles={handles}>
      <Textarea
        placeholder="Enter transformation logic..."
        className="h-20 border-[#818CF8]"
      />
    </NodeWrapper>
  );
};
