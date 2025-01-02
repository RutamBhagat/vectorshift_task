import { ArrowRight, Bug, FileText, Filter, Globe, Layers, LogIn, Menu, MessageSquare, Wand2 } from "lucide-react";
import { DraggableNode } from "./draggableNode";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { SubmitButton } from "./submit";

const nodes = [
  { type: "customInput", label: "Input", icon: LogIn },
  { type: "llm", label: "LLM", icon: MessageSquare},
  { type: "customOutput", label: "Output", icon: ArrowRight },
  { type: "text", label: "Text", icon: FileText },
  { type: "aggeregate", label: "AggregateNode", icon: Layers },
  { type: "debug", label: "DebugNode", icon: Bug },
  { type: "filter", label: "FilterNode", icon: Filter },
  { type: "http", label: "HttpNode", icon: Globe },
  { type: "transform", label: "TransformNode", icon: Wand2 },
];

export const PipelineToolbar = () => {
  return (
    <Card className="bg-card rounded-none py-3 px-4 border-0 flex items-center justify-between gap-6">
      <div className="text-primary cursor-pointer rounded-full">
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="50"
          className="rounded-lg"
        >
          <path
            d="M0 0 C16.5 0 33 0 50 0 C50 16.5 50 33 50 50 C33.5 50 17 50 0 50 C0 33.5 0 17 0 0 Z "
            fill="#6165EE"
            transform="translate(0,0)"
          />
          <path
            d="M0 0 C1.32 0 2.64 0 4 0 C5.98 5.61 7.96 11.22 10 17 C11.81222494 11.78548129 11.81222494 11.78548129 13.58886719 6.55883789 C14.27469303 4.6591003 15.13580183 2.82551953 16 1 C18.10644531 0.27514648 18.10644531 0.27514648 20 0 C17.92957946 7.60837466 15.14169523 14.7728592 12 22 C10.68 22 9.36 22 8 22 C6.66108439 18.71057634 5.32982297 15.41810891 4 12.125 C3.6184375 11.18785156 3.236875 10.25070313 2.84375 9.28515625 C2.4828125 8.38925781 2.121875 7.49335938 1.75 6.5703125 C1.41484375 5.74289551 1.0796875 4.91547852 0.734375 4.06298828 C0 2 0 2 0 0 Z "
            fill="#F1EFFC"
            transform="translate(7,14)"
          />
          <path
            d="M0 0 C1.21236328 0.04060547 1.21236328 0.04060547 2.44921875 0.08203125 C3.06410156 0.11683594 3.67898437 0.15164063 4.3125 0.1875 C4.3125 1.1775 4.3125 2.1675 4.3125 3.1875 C1.6725 3.5175 -0.9675 3.8475 -3.6875 4.1875 C-3.49449819 6.1457834 -3.49449819 6.1457834 -2.6875 8.1875 C-0.86285037 9.27903462 -0.86285037 9.27903462 1.3125 10 C3.48828125 10.984375 3.48828125 10.984375 5.3125 12.1875 C6.5 15.75 6.5 15.75 6.3125 19.1875 C5.1171875 20.8828125 5.1171875 20.8828125 3.3125 22.1875 C0.90234375 22.55078125 0.90234375 22.55078125 -1.75 22.5 C-2.62785156 22.49613281 -3.50570312 22.49226563 -4.41015625 22.48828125 C-6.6875 22.1875 -6.6875 22.1875 -8.6875 20.1875 C-5.0666799 19.17367037 -1.40938582 18.68852309 2.3125 18.1875 C2.11608387 16.24579615 2.11608387 16.24579615 1.3125 14.1875 C-0.49473973 12.87985956 -0.49473973 12.87985956 -2.6875 12 C-6.65190129 10.22309871 -6.65190129 10.22309871 -7.6875 9.1875 C-8.15344715 3.82910774 -8.15344715 3.82910774 -6.46484375 1.50390625 C-4.16603506 -0.19872788 -2.82767258 -0.12294229 0 0 Z "
            fill="#F4F3FD"
            transform="translate(36.6875,13.8125)"
          />
          <path
            d="M0 0 C2.31 0 4.62 0 7 0 C7 0.99 7 1.98 7 3 C4.36 3 1.72 3 -1 3 C-0.67 2.01 -0.34 1.02 0 0 Z "
            fill="#E8E8FD"
            transform="translate(34,14)"
          />
        </svg>
      </div>

      <div className="grid grid-flow-col auto-cols-[minmax(100px,1fr)] gap-2 items-center overflow-x-auto">
        {nodes.map((node) => (
          <DraggableNode
            key={node.type}
            className="w-full"
            type={node.type}
            label={node.label}
            icon={node.icon}
          />
        ))}
        <SubmitButton className="w-full aspect-square" />
      </div>
    </Card>
  );
};
