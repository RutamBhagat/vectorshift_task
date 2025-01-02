import { Play } from "lucide-react";
import { cn } from "../lib/utils";
import { Button } from "./ui/button";

export const SubmitButton = ({className}) => {
  return (
    <Button className={cn(className, "text-sm h-16 w-16")} type="submit">
      <Play/>
    </Button>
  );
};
