"use client";

import { shallow } from "zustand/shallow";
import { useStore } from "../store";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { SubmitButton } from "../submit";
import { DraggableNode } from "../draggable-node";
import { nodes } from "./nodes-nav";

export const HamburgerMenu = () => {
  const { isCustomEdge, isAnimated, toggleEdgeType, toggleAnimation } =
    useStore(
      (state) => ({
        isCustomEdge: state.isCustomEdge,
        isAnimated: state.isAnimated,
        toggleEdgeType: state.toggleEdgeType,
        toggleAnimation: state.toggleAnimation,
        toggleMenu: state.toggleMenu,
      }),
      shallow,
    );

  return (
    <div className="absolute top-0 right-0 bottom-0 w-48 md:w-80 bg-background border-l border-t lg:hidden z-10">
      <div className="p-4 md:p-6 flex flex-col h-full">
        <div className="mb-4 md:mb-6 flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">Pipeline</h3>
            <p className="text-xs md:text-sm text-muted-foreground">
              Customize your pipeline here.
            </p>
          </div>
        </div>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 overflow-y-auto p-1">
          {nodes.map((node) => (
            <DraggableNode
              key={node.type}
              className="!w-full !h-full !min-w-[90px] md:!min-w-[100px]"
              type={node.type}
              label={node.label}
              icon={node.icon}
            />
          ))}
        </div>

        <div className="space-y-4 md:space-y-6 pt-4 md:pt-8">
          <div className="flex items-center justify-between">
            <Label htmlFor="edge-type-mobile" className="text-xs md:text-base">
              Deletable Edges
            </Label>
            <Switch
              size={"sm"}
              id="edge-type-mobile"
              checked={isCustomEdge}
              onCheckedChange={toggleEdgeType}
              className="data-[state=checked]:bg-indigo-800"
            />
          </div>
          <div className="flex items-center justify-between">
            <Label
              htmlFor="edge-animation-mobile"
              className="text-xs md:text-base"
            >
              Animated Edges
            </Label>
            <Switch
              size={"sm"}
              id="edge-animation-mobile"
              checked={isAnimated}
              onCheckedChange={toggleAnimation}
              className="data-[state=checked]:bg-indigo-800"
            />
          </div>

          <SubmitButton className="w-full h-12 md:h-16 mt-2 md:mt-4" />
        </div>
      </div>
    </div>
  );
};
