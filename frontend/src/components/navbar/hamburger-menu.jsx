"use client";

import { Menu, X } from "lucide-react";
import { DraggableNode } from "../draggable-node";
import { SubmitButton } from "../submit";
import { nodes } from "./nodes-nav";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { useStore } from "../store";
import { shallow } from "zustand/shallow";

export const HamburgerMenu = ({
  isCustomEdge,
  isAnimated,
  toggleEdgeType,
  toggleAnimation,
}) => {
  const { isMenuOpen, toggleMenu } = useStore(
    (state) => ({ 
      isMenuOpen: state.isMenuOpen, 
      toggleMenu: state.toggleMenu 
    }),
    shallow
  );

  return (
    <>
      <Button 
        variant="outline" 
        size="icon" 
        className="lg:hidden"
        onClick={toggleMenu}
      >
        <Menu className="h-4 w-4" />
      </Button>

      {isMenuOpen && (
        <div className="absolute top-0 right-0 bottom-0 w-80 bg-background border-l lg:hidden">
          <div className="p-6 flex flex-col h-full">
            <div className="mb-6 flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">Pipeline Toolbar</h3>
                <p className="text-sm text-muted-foreground">Customize your pipeline here.</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 -mr-2"
                onClick={toggleMenu}
              >
                <X className="h-4 w-4" />
              </Button>
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
      )}
    </>
  );
};
