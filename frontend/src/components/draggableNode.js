import { cn } from "../lib/utils";
import { Button } from "./ui/button";

export const DraggableNode = ({ type, label, icon: Icon, className }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = "grabbing";
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(appData)
    );
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <Button
      variant="secondary"
      className={cn(
        className,
        "flex flex-col items-center h-20 justify-center gap-2 aspect-square p-2 border hover:bg-secondary/80"
      )}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = "grab")}
      draggable
    >
      <Icon className="h-6 w-6" />
      <span className="text-xs">{label}</span>
    </Button>
  );
};

