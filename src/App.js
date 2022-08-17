import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/login/Login';
import '@fortawesome/fontawesome-free/js/all.js'
import MainContainer from './views/MainContainer';
import { useEffect, useState } from 'react';

function App({ userRepository, bookRepository }) {
  useEffect(() => {
    document.querySelector('.app').style.height = window.innerHeight + 'px';
  }, [])

  return (
    <div className='app'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/home/*" element={<MainContainer
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
