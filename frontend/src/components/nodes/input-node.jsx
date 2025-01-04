import { useState } from "react";
import { Position } from "reactflow";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { NodeWrapper } from "./node-wrapper";
import { LogIn } from "lucide-react";

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace("customInput-", "input_"),
  );
  const [inputType, setInputType] = useState(data.inputType || "Text");

  const handles = [
    {
      type: "source",
      position: Position.Right,
      id: `${id}-value`,
      label: "Output",
    },
  ];

  return (
    <NodeWrapper id={id} title="Input Node" handles={handles} icon={LogIn}>
      <div className="space-y-3">
        <Input
          type="text"
          value={currName}
          onChange={(e) => setCurrName(e.target.value)}
          className="w-full border-[#818CF8] focus:ring-2 focus:ring-[#818CF8]"
          placeholder="Input name..."
        />
        <Select value={inputType} onValueChange={setInputType}>
          <SelectTrigger className="border-[#818CF8] focus:ring-2 focus:ring-[#818CF8]">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Text">Text</SelectItem>
            <SelectItem value="File">File</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </NodeWrapper>
  );
};
