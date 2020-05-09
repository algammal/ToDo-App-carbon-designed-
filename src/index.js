import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reminder from "./reducers/index";
import "./index.scss";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";

const store = createStore(reminder);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
serviceWorker.unregister();
