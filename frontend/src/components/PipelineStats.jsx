import confetti from "canvas-confetti";
import { useEffect } from "react";
import { useStore } from "./store";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  CheckCircle,
  XCircle,
  AlertCircle,
  GitCommit,
  Link,
  X,
} from "lucide-react";

function fireSuccessConfetti() {
  const duration = 3000;
  const animationEnd = Date.now() + duration;

  const defaults = {
    startVelocity: 30,
    spread: 360,
    ticks: 60,
    zIndex: 100,
    useWorker: true,
  };

  const randomInRange = (min, max) => Math.random() * (max - min) + min;

  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);

    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 },
    });
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 },
    });
  }, 250);
}

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
    <>
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
    </>
  );
}

function StatCard({ title, value, icon: Icon }) {
  return (
    <Card className="bg-white border-indigo-100">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-indigo-500" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900">{value}</div>
      </CardContent>
    </Card>
  );
}

function ValidationStatus({ title, isValid }) {
  return (
    <Card
      className={`bg-white border ${
        isValid ? "border-green-200" : "border-red-200"
      }`}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {isValid ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <XCircle className="h-5 w-5 text-red-500" />
            )}
            <span className="font-medium text-gray-900">{title}</span>
          </div>
          <span
            className={`text-sm font-medium px-2 py-1 rounded-full ${
              isValid
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {isValid ? "Valid" : "Invalid"}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

function ValidationMessages({ title, messages }) {
  if (messages.length === 0) return null;

  return (
    <Card className="bg-white border-indigo-100">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {messages.map((msg, idx) => (
            <li key={idx} className="flex items-start">
              <AlertCircle className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">{msg}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
