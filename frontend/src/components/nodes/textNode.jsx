import { useState } from "react";
import { FileText } from "lucide-react";
import { NodeWrapper } from "./NodeWrapper";
import { AutosizeTextarea } from "../ui/autosize-textarea";
import { useNodeHandles } from "../../hooks/useNodeHandles";

const getVariables = text => [...(text.match(/{{(.*?)}}/g) || [])].map(v => v.slice(2, -2).trim());

export const TextNode = ({ id, data }) => {
  const [text, setText] = useState(data?.text || "{{input}}");
  const handles = useNodeHandles(id, getVariables(text));

  return (
    <NodeWrapper id={id} title="Text Node" handles={handles} icon={FileText}>
      <AutosizeTextarea
        value={text}
        onChange={e => setText(e.target.value)}
        className="w-full border-[#818CF8] focus:ring-2 focus:ring-[#818CF8]"
        placeholder="Enter text with variables like {{variable}}"
      />
    </NodeWrapper>
  );
};
