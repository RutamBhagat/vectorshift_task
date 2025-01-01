import { Position } from "reactflow";
import { NodeWrapper } from "./NodeWrapper";

export const DebugNode = ({ id }) => {
  const handles = [
    { type: "target", position: Position.Left, id: `${id}-input` },
    { type: "source", position: Position.Right, id: `${id}-output` }
  ];

  return (
    <NodeWrapper title="Debug Node" handles={handles}>
      <div className="bg-gray-50 p-3 rounded">
        <pre className="text-xs">Console output here...</pre>
      </div>
    </NodeWrapper>
  );
};
