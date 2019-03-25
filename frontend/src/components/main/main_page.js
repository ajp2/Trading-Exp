import React, { Component } from "react";

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.guestLogin = this.guestLogin.bind(this);
  }

  guestLogin(e) {
    const user = {
      username: "guest"
    };
    this.props.login(user).then(() => this.props.history.push("/summary"));
  }

  render() {
    return (
      <div>
        <h2>main page</h2>
        <button onClick={this.guestLogin}>Login as a Guest</button>
      </div>
    );
  }
}

export default MainPage;
