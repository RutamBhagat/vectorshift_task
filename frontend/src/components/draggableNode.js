import { cn } from "../lib/utils";
import { Button } from "./ui/button";

export const DraggableNode = ({ type, label, icon: Icon, className }) => {
  const onDragStart = (event, nodeType) => {
    event.stopPropagation();
    event.dataTransfer.setData("application/reactflow", JSON.stringify({ nodeType }));
    event.dataTransfer.effectAllowed = "move";
    
    // Add dragging cursor to body to maintain during drag
    document.body.style.cursor = "grabbing";
  };

  const onDragEnd = () => {
    document.body.style.cursor = "default";
  };

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, type)}
      onDragEnd={onDragEnd}
      className={cn(
        "cursor-grab active:cursor-grabbing",
        className
      )}
    >
      <Button
        variant="secondary"
        className="flex flex-col items-center h-16 w-16 justify-center gap-2 aspect-square p-2 border bg-white pointer-events-none"
      >
        <Icon className="h-6 w-6" />
        <span className="text-xs">{label}</span>
      </Button>
    </div>
  );
};

