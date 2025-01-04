"use client";

import { useStore } from "../store";
import { shallow } from "zustand/shallow";
import { DraggableNode } from "../draggable-node";
import { SubmitButton } from "../submit";
import { nodes } from "./nodes-nav";
import { Card } from "../ui/card";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { HamburgerButton } from "./hamburger-button";

const selector = (state) => ({
  isCustomEdge: state.isCustomEdge,
  isAnimated: state.isAnimated,
  toggleEdgeType: state.toggleEdgeType,
  toggleAnimation: state.toggleAnimation,
});

export const PipelineToolbar = () => {
  const { isCustomEdge, isAnimated, toggleEdgeType, toggleAnimation } =
    useStore(selector, shallow);

  return (
    <Card className="bg-card rounded-b-none py-3 px-4 border-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex-shrink-0 w-16 h-16 text-white flex justify-center items-center font-semibold bg-indigo-800 text-4xl rounded-lg">
            <span>VS</span>
          </div>

          <div className="hidden lg:grid grid-flow-col auto-cols-[minmax(60px,1fr)] gap-2 items-center">
            {nodes.map((node) => (
              <DraggableNode
                key={node.type}
                className="w-full"
                type={node.type}
                label={node.label}
                icon={node.icon}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-6">
          <HamburgerButton />
          <div className="hidden lg:flex items-center gap-4">
            <div className="flex flex-col items-center space-y-2 w-16">
              <Switch
                id="edge-type"
                checked={isCustomEdge}
                onCheckedChange={toggleEdgeType}
                className="data-[state=checked]:bg-indigo-800"
              />
              <Label
                htmlFor="edge-type"
                className="text-xs text-gray-500 text-center w-full px-1"
              >
                Deletable Edges
              </Label>
            </div>
            <div className="flex flex-col items-center space-y-2 w-16">
              <Switch
                id="edge-animation"
                checked={isAnimated}
                onCheckedChange={toggleAnimation}
                className="data-[state=checked]:bg-indigo-800"
              />
              <Label
                htmlFor="edge-animation"
                className="text-xs text-gray-500 text-center w-full px-1"
              >
                Animated Edges
              </Label>
            </div>
            <SubmitButton className="w-full aspect-square" />
          </div>
        </div>
      </div>
    </Card>
  );
};
