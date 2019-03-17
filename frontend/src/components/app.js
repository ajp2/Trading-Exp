import React, { Component } from "react";
import MainPage from "./main/main_page";
import NavBarContainer from "./nav/navbar_container";

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBarContainer />
        <MainPage />
      </div>
    );
  }
}

export default App;
