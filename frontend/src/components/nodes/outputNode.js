import { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };

  return (
    <div className="w-[200px] p-4 rounded-lg border border-indigo-200 bg-white shadow-sm">
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-value`}
        className="w-3 h-3 bg-indigo-400 border-2 border-indigo-600"
      />
      <div className="mb-2 text-sm font-medium text-gray-700">Output Node</div>
      <div className="space-y-2">
        <Input 
          type="text" 
          value={currName} 
          onChange={handleNameChange}
          className="w-full"
          placeholder="Output name..."
        />
        <Select value={outputType} onValueChange={setOutputType}>
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Text">Text</SelectItem>
            <SelectItem value="File">Image</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
