import { useState, useEffect, useMemo } from "react";
import { FileText } from "lucide-react";
import { Position, useUpdateNodeInternals } from "reactflow";
import { NodeWrapper } from "./NodeWrapper";
import { AutosizeTextarea } from "../ui/autosize-textarea";

const getVariables = (text) =>
  [...(text.match(/{{(.*?)}}/g) || [])].map((v) => v.slice(2, -2).trim());

export const TextNode = ({ id, data }) => {
  const [text, setText] = useState(data?.text || "{{input}}");
  const updateNodeInternals = useUpdateNodeInternals();
  const variables = getVariables(text);

  useEffect(() => {
    updateNodeInternals(id);
  }, [id, variables, updateNodeInternals]);

  const handles = useMemo(() => {
    const inputHandles = variables.map((variable, index) => ({
      type: "target",
      position: Position.Left,
      id: `${id}-input-${variable}`,
      style: { top: `${((index + 1) * 100) / (variables.length + 1)}%` },
      label: variable,
    }));

    const outputHandle = {
      type: "source",
      position: Position.Right,
      id: `${id}-output`,
      label: "Text",
    };

    return [...inputHandles, outputHandle];
  }, [id, variables]);

  return (
    <NodeWrapper id={id} title="Text Node" icon={FileText} handles={handles}>
      <AutosizeTextarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full border-[#818CF8] focus:ring-2 focus:ring-[#818CF8]"
        placeholder="Enter text with variables like {{variable}}"
      />
    </NodeWrapper>
  );
};
