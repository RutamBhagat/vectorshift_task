import { useState } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import { type InputNode } from "./types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileInput, Type, File } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function InputNode({ id, data }: NodeProps<InputNode>) {
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace("customInput-", "input_")
  );
  const [inputType, setInputType] = useState<"Text" | "File">(
    data.inputType || "Text"
  );

  return (
    <Card className="w-72 bg-white shadow-lg border-2 border-primary/20 transition-all duration-300 ease-in-out hover:shadow-xl hover:border-primary/40">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          <div className="rounded-full w-10 h-10 flex justify-center items-center bg-primary/10">
            <FileInput className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-primary">{data.label}</h3>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm text-start font-medium text-foreground">
            Name
          </Label>
          <Input
            id="name"
            value={currName}
            onChange={(e) => setCurrName(e.target.value)}
            className="nodrag text-sm transition-all duration-200 ease-in-out focus:ring-2 focus:ring-primary/50"
            placeholder="Enter name..."
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm text-start font-medium text-foreground">Type</Label>
          <div className="flex gap-2">
            <Button
              onClick={() => setInputType("Text")}
              variant="outline"
              size="sm"
              className={cn(
                "flex-1 transition-all duration-200 ease-in-out",
                inputType === "Text" &&
                  "bg-black hover:bg-gray-800 text-white hover:text-white"
              )}
            >
              <Type className="w-4 h-4 mr-2" />
              Text
            </Button>
            <Button
              onClick={() => setInputType("File")}
              variant="outline"
              size="sm"
              className={cn(
                "flex-1 transition-all duration-200 ease-in-out",
                inputType === "File" &&
                  ""
              )}
            >
              <File className="w-4 h-4 mr-2" />
              File
            </Button>
          </div>
        </div>
      </CardContent>

      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 !bg-primary transition-all duration-200 ease-in-out hover:scale-110"
        id={`${id}-value`}
      />

      <div className="absolute -right-0.5 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-primary/20 rounded-l-md" />
    </Card>
  );
}
