import { XCircle } from "lucide-react";
import { useStore } from "./store";

const EdgeWithDelete = ({ id, sourceX, sourceY, targetX, targetY, markerEnd }) => {
  const midX = (sourceX + targetX) / 2;
  const radius = 16;

  const path = `
    M${sourceX},${sourceY}
    H${midX - radius}
    Q${midX},${sourceY} ${midX},${
    sourceY + Math.sign(targetY - sourceY) * radius
  }
    V${targetY - Math.sign(targetY - sourceY) * radius}
    Q${midX},${targetY} ${midX + radius},${targetY}
    H${targetX}
  `.trim();

  const labelX = midX;
  const labelY = (sourceY + targetY) / 2;

  const { removeEdge } = useStore((state) => ({
    removeEdge: state.removeEdge,
  }));

  return (
    <>
      <path
        id={id}
        className="react-flow__edge-path !stroke-[2]"
        d={path}
        stroke="#b1b1b7"
        markerEnd={markerEnd}
        style={{ pointerEvents: "all" }}
      />
      <foreignObject
        width={20}
        height={20}
        x={labelX - 10}
        y={labelY - 10}
        className="cursor-pointer flex items-center justify-center no-edge-animation"
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
