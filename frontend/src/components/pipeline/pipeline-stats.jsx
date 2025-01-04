import { useEffect } from "react";
import { useStore } from "../store";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { GitCommit, Link, X } from "lucide-react";
import { fireSuccessConfetti } from "./fire-success-confetti";
import { StatCard } from "./stat-card";
import { ValidationStatus } from "./validation-status";
import { ValidationMessages } from "./validation-messages";

export default function PipelineStats() {
  const pipelineStats = useStore((state) => state.pipelineStats);
  const isDialogOpen = useStore((state) => state.isStatsDialogOpen);
  const setDialogOpen = useStore((state) => state.setStatsDialogOpen);
  const showConfetti = useStore((state) => state.showConfetti);

  useEffect(() => {
    if (showConfetti && pipelineStats) {
      const isValid = pipelineStats.is_dag && pipelineStats.is_pipeline;
      if (isValid) {
        fireSuccessConfetti();
      }
      useStore.setState({ showConfetti: false });
    }
  }, [showConfetti, pipelineStats]);

  if (!pipelineStats) return null;

  const {
    num_nodes,
    num_edges,
    is_dag,
    is_pipeline,
    dag_validation_messages,
    pipeline_validation_messages,
  } = pipelineStats;

  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setDialogOpen}>
      <AlertDialogContent className="max-w-3xl alertDialog">
        <AlertDialogHeader className="relative">
          <AlertDialogTitle className="text-2xl font-bold text-indigo-700">
            Pipeline Validation Results
          </AlertDialogTitle>
          <Button
            onClick={() => setDialogOpen(false)}
            className="absolute right-0 top-0 rounded-full p-2 text-gray-500 hover:text-gray-700 border border-gray-300"
            size="icon"
            variant="ghost"
          >
            <X className="h-4 w-4" />
          </Button>
        </AlertDialogHeader>
        <div className="space-y-6 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <StatCard title="Nodes" value={num_nodes} icon={GitCommit} />
            <StatCard title="Edges" value={num_edges} icon={Link} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <ValidationStatus title="DAG Structure" isValid={is_dag} />
            <ValidationStatus title="Pipeline" isValid={is_pipeline} />
          </div>
          <ValidationMessages
            title="DAG Validation"
            messages={dag_validation_messages}
          />
          <ValidationMessages
            title="Pipeline Validation"
            messages={pipeline_validation_messages}
          />
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
