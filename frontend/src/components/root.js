import React, { Component } from "react";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import App from "./app";

class Root extends Component {
  render() {
    return (
      // <Provider>
      <HashRouter>
        <App />
      </HashRouter>
      // </Provider>
    );
  }
}

export default Root;
