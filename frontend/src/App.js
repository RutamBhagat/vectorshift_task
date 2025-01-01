import { PipelineToolbar } from './components/toolbar';
import { PipelineUI } from './components/ui';

function App() {
  return (
    <div className="h-dvh flex flex-col">
      <PipelineToolbar />
      <PipelineUI />
    </div>
  );
}

export default App;
