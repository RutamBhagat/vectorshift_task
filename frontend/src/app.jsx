import PipelineStats from "./components/pipeline/pipeline-stats";
import { PipelineToolbar } from "./components/toolbar/toolbar";
import { PipelineUI } from "./components/ui";
import { Card } from "./components/ui/card";
import { Toaster } from "./components/ui/sonner";
import { useStore } from "./components/store";
import { HamburgerMenu } from "./components/toolbar/hamburger-menu";

function App() {
  const isMenuOpen = useStore((state) => state.isMenuOpen);

  return (
    <div className="h-dvh">
      <Card className="h-full flex flex-col m-2 rounded-xl relative overflow-hidden">
        <PipelineToolbar />
        <div className="flex-1 flex min-h-0 relative">
          <PipelineUI />
          {isMenuOpen && <HamburgerMenu />}
        </div>
      </Card>
      <Toaster />
      <PipelineStats />
    </div>
  );
}

export default App;
