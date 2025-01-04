import PipelineStats from "./components/pipeline/pipeline-stats";
import { PipelineToolbar } from "./components/navbar/toolbar";
import { PipelineUI } from "./components/ui";
import { Card } from "./components/ui/card";
import { Toaster } from "./components/ui/sonner";
import { useStore } from "./components/store";
import { cn } from "./lib/utils";

function App() {
  const isMenuOpen = useStore((state) => state.isMenuOpen);

  return (
    <div className="h-dvh">
      <Card className="h-full flex flex-col m-2 rounded-xl relative overflow-hidden">
        <PipelineToolbar />
        <div className="flex-1 flex min-h-0">
          <div
            className={cn("flex-1 relative min-h-0", {
              "w-[calc(100%-20rem)]": isMenuOpen,
            })}
          >
            <PipelineUI />
          </div>
        </div>
      </Card>
      <Toaster />
      <PipelineStats />
    </div>
  );
}

export default App;
