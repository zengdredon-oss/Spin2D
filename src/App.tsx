import { Sidebar } from './components/Sidebar/Sidebar';
import { Viewer } from './components/Viewer/Viewer';

function App() {
  return (
    <div className="flex w-full h-screen overflow-hidden font-sans">
      <Sidebar />
      <Viewer />
    </div>
  );
}

export default App;
