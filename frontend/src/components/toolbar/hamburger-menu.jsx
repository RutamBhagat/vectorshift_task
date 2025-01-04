"use client";

import { shallow } from "zustand/shallow";
import { useStore } from '../store';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { SubmitButton } from '../submit';
import { DraggableNode } from '../draggable-node';
import { nodes } from './nodes-nav';

export const HamburgerMenu = () => {
  const { isCustomEdge, isAnimated, toggleEdgeType, toggleAnimation } = useStore(
    (state) => ({ 
      isCustomEdge: state.isCustomEdge,
      isAnimated: state.isAnimated,
      toggleEdgeType: state.toggleEdgeType,
      toggleAnimation: state.toggleAnimation,
      toggleMenu: state.toggleMenu
    }),
    shallow
  );

  return (
    <div className="absolute top-0 right-0 bottom-0 w-80 bg-background border-l border-t lg:hidden z-10">
      <div className="p-6 flex flex-col h-full">
        <div className="mb-6 flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">Pipeline Toolbar</h3>
            <p className="text-sm text-muted-foreground">Customize your pipeline here.</p>
          </div>
        </div>
        
        <div className="flex-1 grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-4 overflow-y-auto p-1">
          {nodes.map((node) => (
            <DraggableNode
              key={node.type}
              className="!w-full !h-full !min-w-[100px]"
              type={node.type}
              label={node.label}
              icon={node.icon}
            />
          ))}
        </div>

        <div className="space-y-6 pt-8 border-t">
          <div className="flex items-center justify-between">
            <Label htmlFor="edge-type-mobile">Deletable Edges</Label>
            <Switch
              id="edge-type-mobile"
              checked={isCustomEdge}
              onCheckedChange={toggleEdgeType}
              className="data-[state=checked]:bg-indigo-800"
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="edge-animation-mobile">Animated Edges</Label>
            <Switch
              id="edge-animation-mobile"
              checked={isAnimated}
              onCheckedChange={toggleAnimation}
              className="data-[state=checked]:bg-indigo-800"
            />
          </div>
          
          <SubmitButton className="w-full h-16 mt-4" />
        </div>
      </div>
    </div>
  );
};
