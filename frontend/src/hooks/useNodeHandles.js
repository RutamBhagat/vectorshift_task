import { useMemo } from "react";
import { Position } from "reactflow";

export const useNodeHandles = (id, variables) => {
  return useMemo(() => {
    const inputHandles = variables.map((variable, index) => ({
      type: "target",
      position: Position.Left,
      id: `${id}-input-${variable}`,
      style: { top: `${((index + 1) * 100) / (variables.length + 1)}%` },
      label: variable,
    }));

    return [
      ...inputHandles,
      {
        type: "source",
        position: Position.Right,
        id: `${id}-output`,
        label: "Text",
      },
    ];
  }, [id, variables]);
};
