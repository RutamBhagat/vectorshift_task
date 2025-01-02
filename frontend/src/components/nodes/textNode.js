import { useState, useEffect, useMemo } from "react";
import { Position } from "reactflow";
import { NodeWrapper } from "./NodeWrapper";
import { AutosizeTextarea } from "../ui/autosize-textarea";
import { FileText } from "lucide-react";

const parseVariables = (text) => {
  const regex = /{{(.*?)}}/g;
  const matches = [...text.matchAll(regex)];
  return matches.map(match => match[1].trim());
};

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || "{{input}}");
  const [variables, setVariables] = useState([]);

  useEffect(() => {
    const foundVars = parseVariables(currText);
    setVariables(foundVars);
  }, [currText]);

  const handles = useMemo(() => {
    const inputHandles = variables.map((variable, index) => {
      const position = variables.length === 1 
        ? 50
        : ((index + 1) * 100) / (variables.length + 1);

      return {
        type: "target",
        position: Position.Left,
        id: `${id}-input-${variable}`,
        style: { top: `${position}%` },
        label: variable
      };
    });

    return [
      ...inputHandles,
      {
        type: "source",
        position: Position.Right,
        id: `${id}-output`,
        label: "Text"
      }
    ];
  }, [id, variables]);

  return (
    <NodeWrapper id={id} title="Text Node" handles={handles} icon={FileText}>
      <div className="space-y-3">
        <AutosizeTextarea
          type="text"
          value={currText}
          onChange={(e) => setCurrText(e.target.value)}
          className="w-full border-[#818CF8] focus:ring-2 focus:ring-[#818CF8]"
          placeholder="Enter text with variables like {{variable}}"
        />
      </div>
    </NodeWrapper>
  );
};
