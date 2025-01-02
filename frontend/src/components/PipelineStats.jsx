import { useStore } from "./store";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,    
  AlertDialogTitle,
} from "./ui/alert-dialog";

export default function PipelineStats() {
  const pipelineStats = useStore((state) => state.pipelineStats);
  const isDialogOpen = useStore((state) => state.isStatsDialogOpen);
  const setDialogOpen = useStore((state) => state.setStatsDialogOpen);

  if (!pipelineStats) return null;

  const { 
    num_nodes, 
    num_edges, 
    is_dag, 
    is_pipeline,
    dag_validation_messages,
    pipeline_validation_messages 
  } = pipelineStats;

  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Pipeline Validation Results</AlertDialogTitle>
          <AlertDialogDescription>
            <div className="space-y-2 mt-2">
              <div className="flex justify-between">
                <span>Number of Nodes:</span>
                <span className="font-medium">{num_nodes}</span>
              </div>
              <div className="flex justify-between">
                <span>Number of Edges:</span>
                <span className="font-medium">{num_edges}</span>
              </div>
              <div className="flex justify-between">
                <span>Valid DAG Structure:</span>
                <span className={`font-medium ${is_dag ? 'text-green-600' : 'text-red-600'}`}>
                  {is_dag ? '✓' : '✗'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Valid Pipeline:</span>
                <span className={`font-medium ${is_pipeline ? 'text-green-600' : 'text-red-600'}`}>
                  {is_pipeline ? '✓' : '✗'}
                </span>
              </div>
              {dag_validation_messages.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-medium mb-2">DAG Validation Messages:</h4>
                  <ul className="list-disc list-inside text-red-600">
                    {dag_validation_messages.map((msg, idx) => (
                      <li key={idx}>{msg}</li>
                    ))}
                  </ul>
                </div>
              )}
              {pipeline_validation_messages.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Pipeline Validation Messages:</h4>
                  <ul className="list-disc list-inside text-red-600">
                    {pipeline_validation_messages.map((msg, idx) => (
                      <li key={idx}>{msg}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>Close</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
