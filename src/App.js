import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/login/Login';
import '@fortawesome/fontawesome-free/js/all.js'
import MainContainer from './components/contents/MainContainer';

function App({ userRepository, authService}) {
  return (
    <div className='app'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login authService={authService}/>}/>
          <Route path="/home/*" element={<MainContainer
          authService={authService}
          userRepository={userRepository}
          />}>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
