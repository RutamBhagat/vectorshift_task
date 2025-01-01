import { useState } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import { type OutputNode } from "./types";
import { FileOutput } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { File, Type } from "lucide-react";

export function OutputNode({ id, data }: NodeProps<OutputNode>) {
  const [currName, setCurrName] = useState(
    data?.outputName || id.replace("customOutput-", "output_")
  );
  const [outputType, setOutputType] = useState<"Text" | "File">(
    data.outputType || "Text"
  );

  return (
    <Card className="w-72 relative bg-white shadow-lg border-2 border-primary/20 transition-all duration-300 ease-in-out hover:shadow-xl hover:border-primary/40">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-center gap-3">
          <div className="rounded-full w-10 h-10 flex justify-center items-center bg-primary/10">
            <FileOutput className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-primary">
            {data.label || "Output Node"}
          </h3>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label
            htmlFor="name"
            className="text-sm text-start font-medium text-foreground"
          >
            Name
          </Label>
          <Input
            id="name"
            value={currName}
            onChange={(e) => setCurrName(e.target.value)}
            className="nodrag text-sm focus:ring-2 focus:ring-primary/50"
            placeholder="Enter name..."
          />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="outputType"
            className="text-sm text-start font-medium text-foreground"
          >
            Type
          </Label>
          <Select
            value={outputType}
            onValueChange={(value: "Text" | "File") => setOutputType(value)}
          >
            <SelectTrigger id="outputType" className="w-full">
              <SelectValue placeholder="Select output type" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="Text">
                <div className="flex items-center">
                  <Type className="w-4 h-4 mr-2" />
                  Text
                </div>
              </SelectItem>
              <SelectItem value="File">
                <div className="flex items-center">
                  <File className="w-4 h-4 mr-2" />
                  File
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>

      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 rounded-full !bg-primary transition-all duration-200 ease-in-out hover:scale-110"
        id={`${id}-value`}
      />
    </Card>
  );
}
