import { cn } from "../lib/utils";
import { Button } from "./ui/button";

export const SubmitButton = ({className}) => {
  return (
    <Button className={cn(className, "w-full text-sm")} type="submit">
      Submit
    </Button>
  );
};
