import { useState } from "react";
import { Position } from "reactflow";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { NodeWrapper } from "./NodeWrapper";

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.outputName || id.replace("customOutput-", "output_")
  );
  const [outputType, setOutputType] = useState(data.outputType || "Text");

  const handles = [
    {
      type: "target",
      position: Position.Left,
      id: `${id}-value`
    }
  ];

  return (
    <NodeWrapper id={id} title="Output Node" handles={handles}>
      <div className="space-y-3">
        <Input
          type="text"
          value={currName}
          onChange={(e) => setCurrName(e.target.value)}
          className="w-full border-[#818CF8] focus:ring-2 focus:ring-[#818CF8]"
          placeholder="Output name..."
        />
        <Select value={outputType} onValueChange={setOutputType}>
          <SelectTrigger className="border-[#818CF8] focus:ring-2 focus:ring-[#818CF8]">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Text">Text</SelectItem>
            <SelectItem value="File">Image</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </NodeWrapper>
  );
};
