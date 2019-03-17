import React, { Component } from "react";

export class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      username: "",
      password: ""
    };
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div>
        <form>
          <input
            type="text"
            name="first_name"
            placeholder="first name"
            value={this.state.first_name}
            onChange={this.handleChange}
          />

          <input
            type="text"
            name="last_name"
            placeholder="last name"
            value={this.state.last_name}
            onChange={this.handleChange}
          />

          <input
            type="text"
            name="email"
            placeholder="email"
            value={this.state.email}
            onChange={this.handleChange}
          />

          <input
            type="text"
            name="username"
            placeholder="username"
            value={this.state.username}
            onChange={this.handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="password"
            value={this.state.password}
            onChange={this.handleChange}
          />

          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default SignupForm;
