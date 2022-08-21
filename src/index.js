import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createStore } from 'redux';
import reducers from './modules';
import { Provider } from 'react-redux';

const store = createStore(reducers)
const rootNode = document.getElementById('root');

ReactDOM.createRoot(rootNode).render(
    <Provider store={store}>
    <App/>
    </Provider>
);