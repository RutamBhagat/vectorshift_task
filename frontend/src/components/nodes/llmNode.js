import { Handle, Position } from "reactflow";

export const LLMNode = ({ id, data }) => {
  return (
    <div className="w-[250px] p-5 rounded-xl border-2 border-[#818CF8] bg-white shadow-[0_4px_20px_rgba(129,140,248,0.15)] hover:shadow-[0_4px_20px_rgba(129,140,248,0.25)] transition-shadow">
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-system`}
        className="w-3 h-3 !bg-[#FF6B6B] border-2 border-[#E55959] hover:!bg-[#E55959] transition-colors"
        style={{ top: "33%" }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-prompt`}
        className="w-3 h-3 !bg-[#FF6B6B] border-2 border-[#E55959] hover:!bg-[#E55959] transition-colors"
        style={{ top: "66%" }}
      />
      <div className="mb-3 text-sm font-semibold text-gray-900">LLM Node</div>
      <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
        Large Language Model
      </div>
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-response`}
        className="w-3 h-3 !bg-[#FF6B6B] border-2 border-[#E55959] hover:!bg-[#E55959] transition-colors"
      />
    </div>
  );
};
