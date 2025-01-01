import { useState } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import { type TextNode } from "./types";
import { Text } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function TextNode({ id, data }: NodeProps<TextNode>) {
  const [text, setText] = useState(data?.text || "{{input}}");

  return (
    <Card className="w-72 relative bg-white shadow-lg border-2 border-primary/20 transition-all duration-300 ease-in-out hover:shadow-xl hover:border-primary/40">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-center gap-3">
          <div className="rounded-full w-10 h-10 flex justify-center items-center bg-primary/10">
            <Text className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-primary">
            {data.label || "Text Node"}
          </h3>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label
            htmlFor="text"
            className="text-sm text-start font-medium text-foreground"
          >
            Text Content
          </Label>
          <Textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="nodrag text-sm focus:ring-2 focus:ring-primary/50 min-h-[100px] resize-none"
            placeholder="Enter text content..."
          />
        </div>
      </CardContent>

      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 rounded-full !bg-primary transition-all duration-200 ease-in-out hover:scale-110"
        id={`${id}-output`}
      />
    </Card>
  );
}
