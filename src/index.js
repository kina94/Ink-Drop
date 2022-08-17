import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import UserService from './service/user_service'
import BookService from './service/book_service';
import { createStore } from 'redux';
import reducers from './modules/reducers/';
import { Provider } from 'react-redux';

const store = createStore(reducers)
const userRepository = new UserService();
const bookRepository = new BookService();
const rootNode = document.getElementById('root');

ReactDOM.createRoot(rootNode).render(
  <React.StrictMode>
    <Provider store={store}>
    <App
      userRepository={userRepository}
      bookRepository={bookRepository}
    />
    </Provider>
  </React.StrictMode>,
);