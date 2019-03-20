import React, { Component } from "react";

export class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.clearErrors();
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = { ...this.state };
    this.props.login(user).then(() => {
      if (this.props.loggedIn) {
        this.props.history.push("/summary");
      }
    });
  }

  render() {
    return (
      <div>
        {this.props.errors ? (
          <ul>
            {Object.values(this.props.errors).map((err, idx) => (
              <li key={idx}>{err}</li>
            ))}
          </ul>
        ) : (
          false
        )}

        <form onSubmit={this.handleSubmit}>
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

export default LoginForm;
