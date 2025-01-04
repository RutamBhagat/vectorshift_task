import { Handle, Position } from "reactflow";
import { XCircle } from "lucide-react";
import { useStore } from "../store";
import { Card } from "../ui/card";

export const NodeWrapper = ({ title, children, handles, id, icon: Icon }) => {
  const removeNode = useStore((state) => state.removeNode);

  const getLabelStyle = (position) => {
    switch (position) {
      case Position.Left:
        return "absolute transform -translate-x-[calc(100%+8px)] top-2";
      case Position.Right:
        return "absolute transform translate-x-[8px] top-2";
      case Position.Top:
        return "absolute transform left-3 -translate-y-[calc(100%+8px)]";
      case Position.Bottom:
        return "absolute transform left-3 translate-y-[8px]";
      default:
        return "";
    }
  };

  return (
    <Card className="group relative w-[250px] p-5 rounded-xl border-2 border-[#a2aaf8] bg-white transition-all hover:shadow-[0_0_0_2px_#818CF8]">
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
          className="relative !w-2 !h-2 !bg-[#FF6B6B] border-2 border-[#E55959] hover:!bg-[#E55959] transition-colors"
        >
          {handle.label && (
            <span
              className={`${getLabelStyle(
                handle.position,
              )} text-xs text-gray-500 whitespace-nowrap pointer-events-none`}
            >
              {handle.label}
            </span>
          )}
        </Handle>
      ))}
      <div className="mb-3 text-sm font-semibold text-gray-900 flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
          <Icon className="w-4 h-4" />
        </div>
        {title}
      </div>
      {children}
    </Card>
  );
};
