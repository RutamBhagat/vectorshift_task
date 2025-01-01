import { useState } from "react";
import { Handle, Position } from "reactflow";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.outputName || id.replace("customOutput-", "output_")
  );
  const [outputType, setOutputType] = useState(data.outputType || "Text");

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  return (
    <div className="w-[250px] p-5 rounded-xl border-2 border-[#818CF8] bg-white shadow-[0_4px_20px_rgba(129,140,248,0.15)] hover:shadow-[0_4px_20px_rgba(129,140,248,0.25)] transition-shadow">
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-value`}
        className="w-3 h-3 !bg-[#FF6B6B] border-2 border-[#E55959] hover:!bg-[#E55959] transition-colors"
      />
      <div className="mb-3 text-sm font-semibold text-gray-900">
        Output Node
      </div>
      <div className="space-y-3">
        <Input
          type="text"
          value={currName}
          onChange={handleNameChange}
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
    </div>
  );
};
