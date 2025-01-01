import type { NodeTypes } from '@xyflow/react';

import { PositionLoggerNode } from './PositionLoggerNode';
import { InputNode } from './InputNode';
import { LLMNode } from './LLMNode';
import { OutputNode } from './OutputNode';
import { AppNode } from './types';

export const initialNodes: AppNode[] = [
  { id: 'a', type: 'input', position: { x: 0, y: 0 }, data: { label: 'Input Node' } },
  {
    id: 'b',
    type: 'position-logger',
    position: { x: -350, y: 350 },
    data: { label: 'drag me!' },
  },
  { id: 'c', type: "llm", position: { x: 350, y: 350 }, data: { label: 'LLM' } },
  {
    id: 'd',
    type: 'output',
    position: { x: 0, y: 600 },
    data: { label: 'Output' },
  },
];

export const nodeTypes = {
  'position-logger': PositionLoggerNode,
  'input': InputNode,
  'llm': LLMNode,
  'output': OutputNode,
} satisfies NodeTypes;
