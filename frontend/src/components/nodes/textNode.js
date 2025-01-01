import { useState } from "react";
import { Handle, Position } from "reactflow";
import { Input } from "../ui/input";

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || "{{input}}");

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  return (
    <div className="w-[250px] p-5 rounded-xl border-2 border-[#818CF8] bg-white shadow-[0_4px_20px_rgba(129,140,248,0.15)] hover:shadow-[0_4px_20px_rgba(129,140,248,0.25)] transition-shadow">
      <div className="mb-3 text-sm font-semibold text-gray-900">Text Node</div>
      <div className="space-y-3">
        <Input
          type="text"
          value={currText}
          onChange={handleTextChange}
          className="w-full border-[#818CF8] focus:ring-2 focus:ring-[#818CF8]"
          placeholder="Enter text..."
        />
      </div>
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        className="w-3 h-3 !bg-[#FF6B6B] border-2 border-[#E55959] hover:!bg-[#E55959] transition-colors"
      />
    </div>
  );
};
