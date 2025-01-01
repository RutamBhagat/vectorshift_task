import { Handle, Position } from 'reactflow';

export const LLMNode = ({ id, data }) => {
  return (
    <div className="w-[200px] p-4 rounded-lg border border-indigo-200 bg-white shadow-sm">
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-system`}
        className="w-3 h-3 bg-indigo-400 border-2 border-indigo-600"
        style={{top: '33%'}}
      />
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-prompt`}
        className="w-3 h-3 bg-indigo-400 border-2 border-indigo-600"
        style={{top: '66%'}}
      />
      <div className="mb-2 text-sm font-medium text-gray-700">LLM Node</div>
      <div className="text-sm text-gray-500">
        Large Language Model
      </div>
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-response`}
        className="w-3 h-3 bg-indigo-400 border-2 border-indigo-600"
      />
    </div>
  );
}
