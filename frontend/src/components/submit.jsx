import axios from "axios";
import { toast } from "sonner";
import { Play } from "lucide-react";
import { useState } from "react";
import { cn } from "../lib/utils";
import { Button } from "./ui/button";
import { useStore } from "./store";

export const SubmitButton = ({ className }) => {
  const [isLoading, setIsLoading] = useState(false);
  const nodes = useStore((state) => state.getNodes());
  const edges = useStore((state) => state.getEdges());
  const setPipelineStats = useStore((state) => state.setPipelineStats);
  const setStatsDialogOpen = useStore((state) => state.setStatsDialogOpen);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const url = `${process.env.REACT_APP_BACKEND_URL}/pipelines/parse`;
      const response = await axios.post(url, { nodes, edges });

      setPipelineStats(response.data);
      setStatsDialogOpen(true);
    } catch (error) {
      toast.error("Pipeline Validation Failed", {
        description: error.message,
        duration: 5000,
      });
      setPipelineStats(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      className={cn("text-sm h-16 w-16 bg-indigo-800", className)}
      onClick={handleSubmit}
      disabled={isLoading}
    >
      <Play />
    </Button>
  );
};
