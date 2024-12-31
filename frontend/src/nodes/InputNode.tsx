import { useState } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import { type InputNode } from "./types";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { FileInputIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

export function InputNode({ id, data }: NodeProps<InputNode>) {
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace("customInput-", "input_")
  );
  const [inputType, setInputType] = useState(data.inputType || "Text");

  return (
    <Card className="px-6 py-4 border-indigo-700 bg-white">
      <div className="flex items-center gap-2">
        <div className="rounded-full w-8 h-8 flex justify-center items-center bg-indigo-100">
          <FileInputIcon className="h-4 w-4 text-indigo-600" />
        </div>
        <div className="text-base font-semibold text-indigo-700">
          {data.label}
        </div>
      </div>

      <div className="mt-4 space-y-1.5">
        <div className="grid grid-cols-[50px_1fr] items-center gap-2">
          <Label className="text-xs text-left font-medium text-gray-600">
            Name
          </Label>
          <Input
            value={currName}
            onChange={(e) => setCurrName(e.target.value)}
            className="nodrag text-xs w-[180px] h-6"
            placeholder="Enter name..."
          />
        </div>

        <div className="grid grid-cols-[50px_1fr] items-center gap-2">
          <Label className="text-xs text-left font-medium text-gray-600">
            Type
          </Label>
          <Select
            value={inputType}
            onValueChange={(value) => setInputType(value as "Text" | "File")}
          >
            <SelectTrigger className="nodrag text-xs w-[180px] h-6">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="Text" className="">
                Text
              </SelectItem>
              <SelectItem value="File" className="">
                File
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        className="w-2 h-2 !bg-indigo-500"
        id={`${id}-value`}
      />
    </Card>
  );
}
