import React, { Component } from "react";
import "./Link.css";
import { Link } from "react-router-dom";

class NavLink extends Component {
  render() {
    return (
      <Link
        to={this.props.to}
        onClick={this.props.onClick}
        className="Nav-Link"
      >
        {this.props.children}
      </Link>
    );
  }
}
export default NavLink;
