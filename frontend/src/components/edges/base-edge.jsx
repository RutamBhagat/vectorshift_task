import { BaseEdge, getSmoothStepPath } from "reactflow";

export const CustomBaseEdge = ({
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  markerEnd,
  ...props
}) => {
  const [edgePath] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    borderRadius: 8,
    offset: 8,
  });

  return (
    <BaseEdge
      path={edgePath}
      markerEnd={markerEnd}
      className="react-flow__edge-path"
      style={{ stroke: "#b1b1b7", strokeWidth: 2 }}
      {...props}
    />
  );
};
