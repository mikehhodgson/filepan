import Versions from './components/Versions';
import electronLogo from './assets/electron.svg';
import { useEffect, useState } from 'react';

function App() {
  const [state, setState] = useState({ path: '', content: [] });

  const ipcHandle = () => window.electron.ipcRenderer.send('ping');

  useEffect(() => {
    const handleUpdateFiles = (event, value) => console.log({ event, value });
    window.api.onUpdateFiles(handleUpdateFiles);
    return () => window.api.offUpdateFiles(handleUpdateFiles);
  });

  useEffect(() => {
    const dragover = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const drop = async (event) => {
      event.preventDefault();
      event.stopPropagation();

      const droppedFiles = Array.from(event.dataTransfer.files);
      window.api.droppedFiles(droppedFiles);
      //const path = await window.api.droppedFiles(droppedFiles);
      //console.log(path);
    };

    document.addEventListener('dragover', dragover);
    document.addEventListener('drop', drop);

    return () => {
      document.removeEventListener('dragover', dragover);
      document.removeEventListener('drop', drop);
    };
  });

  return (
    <>
      <img alt="logo" className="logo" src={electronLogo} />
      <div className="creator">Powered by electron-vite</div>
      <div className="text">
        Build an Electron app with <span className="react">React</span>
      </div>
      <p className="tip">
        Please try pressing <code>F12</code> to open the devTool
      </p>
      <div className="actions">
        <div className="action">
          <a href="https://electron-vite.org/" target="_blank" rel="noreferrer">
            Documentation
          </a>
        </div>
        <div className="action">
          <a target="_blank" rel="noreferrer" onClick={ipcHandle}>
            Send IPC
          </a>
        </div>
      </div>
      <Versions></Versions>
    </>
  );
}

export default App;
