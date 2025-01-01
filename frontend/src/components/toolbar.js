import { DraggableNode } from "./draggableNode";

export const PipelineToolbar = () => {
  return (
    <div className="p-2.5">
      <div className="flex flex-wrap gap-2.5">
        <DraggableNode type="customInput" label="Input" />
        <DraggableNode type="llm" label="LLM" />
        <DraggableNode type="customOutput" label="Output" />
        <DraggableNode type="text" label="Text" />
        <DraggableNode type="aggeregate" label="AggregateNode" />
        <DraggableNode type="debug" label="DebugNode" />
        <DraggableNode type="filter" label="FilterNode" />
        <DraggableNode type="http" label="HttpNode" />
        <DraggableNode type="transform" label="TransformNode" />
      </div>
    </div>
  );
};
