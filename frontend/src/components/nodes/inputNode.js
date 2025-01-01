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

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace("customInput-", "input_")
  );
  const [inputType, setInputType] = useState(data.inputType || "Text");

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  return (
    <div className="w-[250px] p-5 rounded-xl border-2 border-[#818CF8] bg-white shadow-[0_4px_20px_rgba(129,140,248,0.15)] hover:shadow-[0_4px_20px_rgba(129,140,248,0.25)] transition-shadow">
      <div className="mb-3 text-sm font-semibold text-gray-900">Input Node</div>
      <div className="space-y-3">
        <Input
          type="text"
          value={currName}
          onChange={handleNameChange}
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
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-value`}
        className="w-3 h-3 !bg-[#FF6B6B] border-2 border-[#E55959] hover:!bg-[#E55959] transition-colors"
      />
    </div>
  );
};
