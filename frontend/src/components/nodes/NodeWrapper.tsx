import { type ReactNode } from "react";
//@ts-ignore
import { Handle, Position } from "reactflow";
import { XCircle } from "lucide-react";
import { useStore } from "../store";

interface HandleConfig {
  type: "source" | "target";
  position: Position;
  id: string;
  style?: React.CSSProperties;
}

interface NodeWrapperProps {
  title: string;
  children: ReactNode;
  handles: HandleConfig[];
  id: string;
}

export const NodeWrapper = ({ title, children, handles, id }: NodeWrapperProps) => {
  const removeNode = useStore((state) => state.removeNode);

  return (
    <div className="group relative w-[250px] p-5 rounded-xl border-2 border-[#a2aaf8] bg-white transition-all hover:shadow-[0_0_0_2px_#818CF8]">
      <button
        onClick={() => removeNode(id)}
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors"
      >
        <XCircle size={18} />
      </button>
      {handles.map((handle) => (
        <Handle
          key={handle.id}
          type={handle.type}
          position={handle.position}
          id={handle.id}
          style={handle.style}
          className="w-3 h-3 !bg-[#FF6B6B] border-2 border-[#E55959] hover:!bg-[#E55959] transition-colors"
        />
      ))}
      <div className="mb-3 text-sm font-semibold text-gray-900">{title}</div>
      {children}
    </div>
  );
};
