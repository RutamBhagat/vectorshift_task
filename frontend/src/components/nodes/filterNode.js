import { useState } from "react";
import { Position } from "reactflow";
import { Input } from "../ui/input";
import { NodeWrapper } from "./NodeWrapper";

export const FilterNode = ({ id }) => {
  const [condition, setCondition] = useState("");

  const handles = [
    { type: "target", position: Position.Left, id: `${id}-input` },
    { type: "source", position: Position.Right, id: `${id}-true` },
    { type: "source", position: Position.Bottom, id: `${id}-false` }
  ];

  return (
    <NodeWrapper id={id} title="Filter Node" handles={handles}>
      <Input
        placeholder="Enter condition..."
        value={condition}
        onChange={(e) => setCondition(e.target.value)}
        className="w-full border-[#818CF8]"
      />
    </NodeWrapper>
  );
};
