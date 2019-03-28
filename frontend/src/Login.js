import React, { Component } from "react";

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailAddress: "",
      password: ""
    };

    this.handleEmailaddressChange = this.handleEmailaddressChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
  }
  handleEmailaddressChange(event) {
    this.setState({ emailAddress: event.target.value });
  }
  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }
  handleLoginSubmit(event) {
    event.preventDefault();
    let b = {};
    b.emailAddress = this.state.emailAddress;
    b.password = this.state.password;
    console.log("b: ", b);
    fetch("http://localhost:4000/login", {
      method: "POST",
      body: JSON.stringify(b)
    })
      .then(function(x) {
        console.log("im in then x");
        return x.text();
      })
      .then(x => {
        console.log(" im in then response");
        console.log("res: ", x);
        let parsedResponse = JSON.parse(x);
        console.log(parsedResponse);
        this.props.setSessionId(parsedResponse.sid);
      });
  }

  render() {
    return (
      <div className="container">
        <div className="left-child" />
        <div className="Login right-child">
          <form onSubmit={this.handleLoginSubmit}>
            <h1 className="Member">Member Login</h1>
            <label htmlFor="email">Email address</label>
            <input
              type="text"
              placeholder="Enter email"
              name="email"
              onChange={this.handleEmailaddressChange}
              required
            />
            <label htmlFor="psw">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              name="psw"
              onChange={this.handlePasswordChange}
              required
            />
            <button className="button-login" type="submit">
              LOGIN
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default LogIn;
