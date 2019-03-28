import React, { Component } from "react";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      password: "",
      emailAddress: ""
    };
    this.handlefirstNameChange = this.handlefirstNameChange.bind(this);
    this.handlelastNameChange = this.handlelastNameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleEmailAddressChange = this.handleEmailAddressChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handlefirstNameChange(event) {
    this.setState({ firstName: event.target.value });
  }
  handlelastNameChange(event) {
    this.setState({ lastName: event.target.value });
  }
  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }
  handleEmailAddressChange(event) {
    this.setState({ emailAddress: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { firstName, lastName, emailAddress, password } = this.state;
    let b = {
      firstName,
      lastName,
      emailAddress,
      password
    };
    console.log("b: ", b);
    fetch("http://localhost:4000/signup", {
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
      <form onSubmit={this.handleSubmit}>
        <h2>Sign Up</h2>
        <input
          type="text"
          placeholder="Email address"
          value={this.state.emailAddress}
          onChange={this.handleEmailAddressChange}
          required
        />
        <input
          type="text"
          placeholder="First name"
          value={this.state.firstName}
          onChange={this.handlefirstNameChange}
          required
        />
        <input
          type="text"
          placeholder="Last name"
          value={this.state.lastName}
          onChange={this.handlelastNameChange}
          required
        />
        <input
          type="text"
          placeholder="Create a Password"
          value={this.state.password}
          onChange={this.handlePasswordChange}
          required
        />
        <input type="submit" />
      </form>
    );
  }
}

export default Signup;
