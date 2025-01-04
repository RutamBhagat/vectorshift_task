import PipelineStats from './components/pipeline/pipeline-stats';
import { PipelineToolbar } from './components/toolbar';
import { PipelineUI } from './components/ui';
import { Card } from './components/ui/card';
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <div className="h-dvh">
      <Card className="h-full flex flex-col m-2 rounded-xl">
        <PipelineToolbar />
        <PipelineUI />
      </Card>
      <Toaster />
      <PipelineStats/>
    </div>
  );
}

export default App;
