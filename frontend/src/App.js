import { PipelineToolbar } from './components/toolbar';
import { PipelineUI } from './components/ui';
import { Card } from './components/ui/card';

function App() {
  return (
    <Card className="h-dvh flex flex-col m-2 rounded-xl">
      <PipelineToolbar />
      <PipelineUI />
    </Card>
  );
}

export default App;
