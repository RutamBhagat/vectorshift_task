import { Handle, Position, type NodeProps } from "@xyflow/react";
import { type LLMNode } from "./types";
import { Brain } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

export function LLMNode({ id, data }: NodeProps<LLMNode>) {
  return (
    <Card className="w-72 relative bg-white shadow-lg border-2 border-primary/20 transition-all duration-300 ease-in-out hover:shadow-xl hover:border-primary/40">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-center gap-3">
          <div className="rounded-full w-10 h-10 flex justify-center items-center bg-primary/10">
            <Brain className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-primary">
            {data.label || "LLM Node"}
          </h3>
        </div>
      </CardHeader>
      <CardContent className=" py-4">
        <div className="text-base text-center text-muted-foreground mb-6">
          This is an LLM
        </div>

        {/* Input Handles Container - Left Side */}
        <div className="absolute left-0 inset-y-0 flex flex-col justify-around">
          {/* System Input */}
          <div className="relative">
            <Handle
              type="target"
              position={Position.Left}
              id={`${id}-system`}
              className="w-3 h-3 rounded-full -ml-0.5 !bg-yellow-500"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground whitespace-nowrap">
              System
            </span>
          </div>

          {/* User Input */}
          <div className="relative">
            <Handle
              type="target"
              position={Position.Left}
              id={`${id}-prompt`}
              className="w-3 h-3 rounded-full -ml-0.5 !bg-blue-500"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground whitespace-nowrap">
              Prompt
            </span>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 flex flex-col justify-around">
          {/* Output Handle - Bottom */}
          <div className="relative">
            <Handle
              type="source"
              position={Position.Bottom}
              id={`${id}-response`}
              className="w-3 h-3 rounded-full -mb-0.5 !bg-green-500"
            />
            <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs text-muted-foreground whitespace-nowrap">
              Response
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
