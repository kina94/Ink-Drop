import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AuthService from "./service/auth_service";
import UserService from "./service/user_service";
import BookService from "./service/book_service";
import { createStore } from "redux";
import reducers from "./modules/reducers/";
import { Provider } from "react-redux";
import Theme from "theme";

const store = createStore(reducers);
const authService = new AuthService();
const userRepository = new UserService();
const bookRepository = new BookService();
const rootNode = document.getElementById("root");

ReactDOM.createRoot(rootNode).render(
  <React.StrictMode>
    <Provider store={store}>
      <Theme.GlobalStyle />
      <App
        authService={authService}
        userRepository={userRepository}
        bookRepository={bookRepository}
      />
    </Provider>
  </React.StrictMode>
);
