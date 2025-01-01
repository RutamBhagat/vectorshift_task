import { PipelineToolbar } from './components/toolbar';
import { PipelineUI } from './components/ui';
import { SubmitButton } from './components/submit';

function App() {
  return (
    <div>
      <PipelineToolbar />
      <PipelineUI />
      <SubmitButton />
    </div>
  );
}

export default App;
