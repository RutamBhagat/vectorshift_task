import type { Node, BuiltInNode } from '@xyflow/react';

export type PositionLoggerNode = Node<{ label: string }, 'position-logger'>;
export type InputNode = Node<
  {
    label: string;
    inputName: string;
    inputType: "Text" | "File";
  },
  "input"
>;

export type LLMNode = Node<{
  label: string;
  systemPrompt?: string;
  userPrompt?: string;
}, 'llm'>;

export type OutputNode = Node<{
  label: string;
  outputName: string;
  outputType: "Text" | "File";
}, 'output'>;

export type TextNode = Node<{
  label: string;
  text: string;
}, 'text'>;

export type AppNode = BuiltInNode | PositionLoggerNode | InputNode | LLMNode | OutputNode | TextNode;
