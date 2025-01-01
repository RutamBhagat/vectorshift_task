import { Button } from "./ui/button";

export const DraggableNode = ({ type, label }) => {
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
      className={`${type} min-w-[80px] h-[50px] flex items-center justify-center text-white hover:bg-gray-700 flex-col rounded-lg bg-[#1C2536] cursor-grab`}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = "grab")}
      draggable
    >
      {label}
    </Button>
  );
};
