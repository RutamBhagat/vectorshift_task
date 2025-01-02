import { useState } from "react";
import { Position } from "reactflow";
import { NodeWrapper } from "./NodeWrapper";
import { AutosizeTextarea } from "../ui/autosize-textarea";

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || "{{input}}");

  const handles = [
    {
      type: "source",
      position: Position.Right,
      id: `${id}-output`
    }
  ];

  return (
    <NodeWrapper id={id} title="Text Node" handles={handles}>
      <div className="space-y-3">
        <AutosizeTextarea
          type="text"
          value={currText}
          onChange={(e) => setCurrText(e.target.value)}
          className="w-full border-[#818CF8] focus:ring-2 focus:ring-[#818CF8]"
          placeholder="Enter text..."
        />
      </div>
    </NodeWrapper>
  );
};
