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
  label?: string;
}

interface NodeWrapperProps {
  title: string;
  children: ReactNode;
  handles: HandleConfig[];
  id: string;
}

export const NodeWrapper = ({ title, children, handles, id }: NodeWrapperProps) => {
  const removeNode = useStore((state) => state.removeNode);

  const getLabelPosition = (position: Position, top?: string) => {
    const baseStyles = "absolute text-xs text-gray-500 whitespace-nowrap";
    
    switch (position) {
      case Position.Left:
        return `${baseStyles} right-[calc(100%+12px)] ${top || 'top-1/2 -translate-y-1/2'}`;
      case Position.Right:
        return `${baseStyles} left-[calc(100%+12px)] ${top || 'top-1/2 -translate-y-1/2'}`;
      case Position.Top:
        return `${baseStyles} bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2`;
      case Position.Bottom:
        return `${baseStyles} top-[calc(100%+8px)] left-1/2 -translate-x-1/2`;
      default:
        return baseStyles;
    }
  };

  return (
    <div className="group relative w-[250px] p-5 rounded-xl border-2 border-[#a2aaf8] bg-white transition-all hover:shadow-[0_0_0_2px_#818CF8]">
      <button
        onClick={() => removeNode(id)}
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors"
      >
        <XCircle size={18} />
      </button>
      {handles.map((handle) => (
        <>
          <Handle
            key={handle.id}
            type={handle.type}
            position={handle.position}
            id={handle.id}
            style={handle.style}
            className="w-3 h-3 !bg-[#FF6B6B] border-2 border-[#E55959] hover:!bg-[#E55959] transition-colors"
          />
          {handle.label && (
            <span
              className={getLabelPosition(handle.position, handle.style?.top as string)}
              style={{ top: handle.style?.top }}
            >
              {handle.label}
            </span>
          )}
        </>
      ))}
      <div className="mb-3 text-sm font-semibold text-gray-900">{title}</div>
      {children}
    </div>
  );
};
