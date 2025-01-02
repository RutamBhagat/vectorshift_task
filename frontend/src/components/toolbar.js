import { ArrowRight, Bug, FileText, Filter, Globe, Layers, LogIn, MessageSquare, Wand2 } from "lucide-react";
import { DraggableNode } from "./draggableNode";
import { Card } from "./ui/card";
import { SubmitButton } from "./submit";

const nodes = [
  { type: "customInput", label: "Input", icon: LogIn },
  { type: "llm", label: "LLM", icon: MessageSquare },
  { type: "customOutput", label: "Output", icon: ArrowRight },
  { type: "text", label: "Text", icon: FileText },
  { type: "aggeregate", label: "Aggregate", icon: Layers },
  { type: "debug", label: "Debug", icon: Bug },
  { type: "filter", label: "Filter", icon: Filter },
  { type: "http", label: "Http", icon: Globe },
  { type: "transform", label: "Transform", icon: Wand2 },
];

export const PipelineToolbar = () => {
  return (
    <Card className="bg-card rounded-none py-3 px-4 border-0 flex items-center justify-between gap-6">
      <div className="flex gap-5 items-center">
        <img
          src="./logo.svg"
          alt="VectorShift Logo"
          className="w-[50px] h-[50px] rounded-lg"
        />

        <div className="grid grid-flow-col auto-cols-[minmax(60px,1fr)] gap-2 items-center overflow-x-auto">
          {nodes.map((node) => (
            <DraggableNode
              key={node.type}
              className="w-full"
              type={node.type}
              label={node.label}
              icon={node.icon}
            />
          ))}
        </div>
      </div>

      <SubmitButton className="w-full aspect-square" />
    </Card>
  );
};
