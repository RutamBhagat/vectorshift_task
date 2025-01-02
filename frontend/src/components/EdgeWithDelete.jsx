import { XCircle } from "lucide-react";
import { useStore } from "./store";

const EdgeWithDelete = ({ id, sourceX, sourceY, targetX, targetY }) => {
  // Calculate the middle point for the step
  const midX = (sourceX + targetX) / 2;

  // Create a custom path with a single step in the middle
  const path = `M${sourceX},${sourceY} H${midX} V${targetY} H${targetX}`;

  // Calculate label position at the middle of the path
  const labelX = midX;
  const labelY = (sourceY + targetY) / 2;

  const { removeEdge } = useStore((state) => ({
    removeEdge: state.removeEdge,
  }));

  return (
    <>
      <path
        id={id}
        className="react-flow__edge-path"
        d={path}
        strokeWidth={2}
        stroke="#b1b1b7"
        style={{
          pointerEvents: "all",
        }}
      />
      <foreignObject
        width={20}
        height={20}
        x={labelX - 10}
        y={labelY - 10}
        className="cursor-pointer flex items-center justify-center"
        onClick={(e) => {
          e.stopPropagation();
          removeEdge(id);
        }}
      >
        <div className="bg-white rounded-full p-[2px]">
          <XCircle className="h-4 w-4 bg-white text-muted-foreground hover:text-destructive" />
        </div>
      </foreignObject>
    </>
  );
};

export default EdgeWithDelete;
