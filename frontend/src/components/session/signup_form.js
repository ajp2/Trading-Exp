import React, { Component } from "react";
import "./signup_form.css";

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
    this.props.signup(user).then(() => {
      if (this.props.authoriseSignIn) {
        this.props
          .login({
            username: this.state.username,
            password: this.state.password
          })
          .then(() => this.props.history.push("/summary"));
      }
    });
  }

  render() {
    return (
      <div className="signup-page">
        <img src={require("../../images/signup-image.jpg")} alt="Photo" />
        <div className="signup-container">
          {this.props.errors ? (
            <ul>
              {Object.values(this.props.errors).map((err, idx) => (
                <li key={idx}>{err}</li>
              ))}
            </ul>
          ) : (
            false
          )}

          <form onSubmit={this.handleSubmit} className="signup-form">
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
      </div>
    );
  }
}

export default SignupForm;
