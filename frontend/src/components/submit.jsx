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

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const url = `${process.env.REACT_APP_BACKEND_URL}/pipelines/parse`;
      const response = await axios.post(
        url,
        { nodes, edges }
      );

      const { num_nodes, num_edges, is_dag } = response.data;

      toast("Pipeline Validation Results", {
        description: `Nodes: ${num_nodes}, Edges: ${num_edges}, Is DAG: ${is_dag}`,
        duration: 5000
      });
    } catch (error) {
      toast.error("Pipeline Validation Failed", {
        description: error.message,
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      className={cn(className, "text-sm h-16 w-16")}
      onClick={handleSubmit}
      disabled={isLoading}
    >
      <Play />
    </Button>
  );
};
