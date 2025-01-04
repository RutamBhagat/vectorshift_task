import { ArrowRight, Bug, FileText, Filter, Globe, Layers, LogIn, MessageSquare, Wand2 } from "lucide-react";
import { useStore } from "./store";
import { shallow } from "zustand/shallow";
import { DraggableNode } from "./draggable-node";
import { Card } from "./ui/card";
import { SubmitButton } from "./submit";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";

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

const selector = (state) => ({
  isCustomEdge: state.isCustomEdge,
  toggleEdgeType: state.toggleEdgeType,
});

export const PipelineToolbar = () => {
  const { isCustomEdge, toggleEdgeType } = useStore(selector, shallow);

  return (
    <Card className="bg-card rounded-b-none py-3 px-4 border-0 flex items-center justify-between gap-6">
      <div className="flex gap-5 items-center">
        <div className="w-16 h-16 text-white flex justify-center items-center font-semibold bg-indigo-800 text-4xl rounded-lg">
          <span>VS</span>
        </div>

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

      <div className="flex items-center gap-4">
        <div className="flex items-center space-x-2">
          <Switch
            id="edge-type"
            checked={isCustomEdge}
            onCheckedChange={toggleEdgeType}
          />
          <Label htmlFor="edge-type">Deletable Edges</Label>
        </div>
        <SubmitButton className="w-full aspect-square" />
      </div>
    </Card>
  );
};
