import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AuthService from './service/auth_service';
import UserService from './service/user_service'
import BookService from './service/book_service';

const authService = new AuthService();
const userRepository = new UserService();
const bookRepository = new BookService();
const rootNode = document.getElementById('root');

ReactDOM.createRoot(rootNode).render(
  <React.StrictMode>
    <App
      authService={authService}
      userRepository={userRepository}
      bookRepository={bookRepository}
    />
  </React.StrictMode>,
);