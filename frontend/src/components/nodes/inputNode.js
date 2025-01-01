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

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  return (
    <div className="w-[200px] p-4 rounded-lg border border-indigo-200 bg-white shadow-sm">
      <div className="mb-2 text-sm font-medium text-gray-700">Input Node</div>
      <div className="space-y-2">
        <Input 
          type="text" 
          value={currName} 
          onChange={handleNameChange}
          className="w-full"
          placeholder="Input name..."
        />
        <Select value={inputType} onValueChange={setInputType}>
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Text">Text</SelectItem>
            <SelectItem value="File">File</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-value`}
        className="w-3 h-3 bg-indigo-400 border-2 border-indigo-600"
      />
    </div>
  );
}
