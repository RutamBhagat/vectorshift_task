import { PipelineToolbar } from './components/toolbar';
import { PipelineUI } from './components/ui';
import { Card } from './components/ui/card';

function App() {
  return (
    <div className='h-dvh'>
      <Card className="h-full flex flex-col m-2 rounded-xl">
        <PipelineToolbar />
        <PipelineUI />
      </Card>
    </div>
  );
}

export default App;
