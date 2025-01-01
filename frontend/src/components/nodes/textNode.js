import { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { Input } from '../ui/input';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  return (
    <div className="w-[200px] p-4 rounded-lg border border-indigo-200 bg-white shadow-sm">
      <div className="mb-2 text-sm font-medium text-gray-700">Text Node</div>
      <div className="space-y-2">
        <Input 
          type="text" 
          value={currText} 
          onChange={handleTextChange}
          className="w-full"
          placeholder="Enter text..."
        />
      </div>
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        className="w-3 h-3 bg-indigo-400 border-2 border-indigo-600"
      />
    </div>
  );
}
