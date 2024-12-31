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

export function InputNode({ id, data }: NodeProps<InputNode>) {
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace("customInput-", "input_")
  );
  const [inputType, setInputType] = useState(data.inputType || "Text");

  return (
    <div className="react-flow__node-default p-4 shadow-lg rounded-lg bg-white border border-indigo-200 w-60">
      <div className="flex items-center justify-between mb-4">
        <div className="rounded-full w-10 h-10 flex justify-center items-center bg-indigo-100">
          <FileInputIcon name="input" size={20} color="indigo-600" />
        </div>
        <div className="text-base font-semibold text-indigo-700">
            {data.label}
        </div>
      </div>

      <div className="grid gap-3">
        <div>
          <Label className="text-xs font-medium text-gray-700">Name</Label>
          <Input
            value={currName}
            onChange={(e) => setCurrName(e.target.value)}
            className="nodrag text-sm px-3 border-indigo-300 focus:ring-indigo-400"
            placeholder="Enter name..."
          />
        </div>

        <div>
          <Label className="text-xs font-medium text-gray-700">Type</Label>
          <Select
            value={inputType}
            onValueChange={(value) => setInputType(value as "Text" | "File")}
          >
            <SelectTrigger className="nodrag text-sm px-3 border-indigo-300 focus:ring-indigo-400">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent className="bg-white shadow-md border-indigo-200">
              <SelectItem value="Text">Text</SelectItem>
              <SelectItem value="File">File</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 bg-indigo-500"
        id={`${id}-value`}
      />
    </div>
  );
}
