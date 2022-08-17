import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import UserService from './service/user_service'
import { createStore } from 'redux';
import reducers from './modules/reducers/';
import { Provider } from 'react-redux';

const store = createStore(reducers)
const userRepository = new UserService();
const rootNode = document.getElementById('root');

ReactDOM.createRoot(rootNode).render(
    <Provider store={store}>
    <App
      userRepository={userRepository}
    />
    </Provider>
);