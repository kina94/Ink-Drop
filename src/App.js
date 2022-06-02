import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/login/Login';
import '@fortawesome/fontawesome-free/js/all.js'
import MainContainer from './views/MainContainer';

function App({ userRepository, authService, bookRepository}) {
  // let vh = window.innerHeight*0.01;
  // document.documentElement.style.setProperty('--vh', `${vh}px`)
  // window.addEventListener('resize', ()=>{
  //   let vh = window.innerHeight * 0.01;
  //   document.documentElement.style.setProperty('--vh', `${vh}px`)
  // })
  return (
    <div className='app'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login authService={authService}/>}/>
          <Route path="/home/*" element={<MainContainer
          authService={authService}
          userRepository={userRepository}
          bookRepository={bookRepository}
          />}>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
