"use client";

import { Menu } from "lucide-react";
import { DraggableNode } from "../draggable-node";
import { SubmitButton } from "../submit";
import { nodes } from "./nodes-nav";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";

export const HamburgerMenu = ({
  isCustomEdge,
  isAnimated,
  toggleEdgeType,
  toggleAnimation,
}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="lg:hidden">
          <Menu className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <div className="h-full flex flex-col">
          <SheetHeader className="flex-none">
            <SheetTitle>Pipeline Toolbar</SheetTitle>
            <SheetDescription>Customize your pipeline here.</SheetDescription>
          </SheetHeader>
          
          <div className="flex-1 flex flex-col mt-8 min-h-0">
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

            <div className="flex-none space-y-6 pt-8 border-t">
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
      </SheetContent>
    </Sheet>
  );
};
