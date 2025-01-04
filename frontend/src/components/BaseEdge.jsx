import { BaseEdge, getSmoothStepPath } from 'reactflow';

export const CustomBaseEdge = ({
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  markerEnd,
  style,
  ...props
}) => {
  const [edgePath] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    borderRadius: 16,
    offset: 16,
  });

  return (
    <BaseEdge 
      path={edgePath} 
      markerEnd={markerEnd}
      style={style}
      {...props}
    />
  );
};
