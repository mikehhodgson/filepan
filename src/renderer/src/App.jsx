import Versions from './components/Versions';
import electronLogo from './assets/electron.svg';
import { useEffect } from 'react';

function App() {
  const ipcHandle = () => window.electron.ipcRenderer.send('ping');

  useEffect(() => {
    const dragover = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const drop = async (event) => {
      event.preventDefault();
      event.stopPropagation();

      const files = Array.from(event.dataTransfer.files);
      const ret = await window.api.droppedFiles(files);
      console.log(ret);
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
