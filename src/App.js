import './App.css';
import '@fortawesome/fontawesome-free/js/all.js'
import SetupRouter from './router/SetupRouter';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    document.querySelector('.app').style.height = window.innerHeight + 'px';
  }, [])

  return (
    <div className='app'>
      <SetupRouter/>
    </div>
  );
}

export default App;
