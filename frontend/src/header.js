import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavLink from "./NavLink";
import Modal from "react-bootstrap/Modal";
import Signup from "./Signup";
import logo from "./sampleimages/Logo.JPG";
import AvailabilitySearch from "./AvailabilitySearch";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      modalType: null
    };
    this.handleclose = this.handleclose.bind(this);
    this.handleshow = this.handleshow.bind(this);
  }

  handleclose() {
    this.setState({ show: false });
  }
  handleshow(modalType) {
    this.setState({ show: true, modalType });
  }
  render() {
    const isAuthenticated = this.props.sessionId !== "";
    return (
      <div className="nav-container">
        <Navbar
          bg="light"
          variant="light"
          style={{
            display: "flex",
            justifyContent: "space-between",
            position: "fixed",
            width: "100%"
          }}
        >
          <div>
            <Navbar.Brand onClick={() => this.props.history.push("/")}>
              <img style={{ width: 250 }} src={logo} />
            </Navbar.Brand>
          </div>
          <div>
            <Nav className="mr-auto">
              <NavLink to="/">Home</NavLink>
              <NavLink
                text="Fancy Destination"
                to="#"
                onClick={() => this.handleshow("availabilities")}
              >
                Availability
              </NavLink>
              {isAuthenticated ? (
                <NavLink to="/addListing">Add listing</NavLink>
              ) : (
                <>
                  <NavLink to="/login">Log In</NavLink>
                  <NavLink to="#" onClick={() => this.handleshow("signup")}>
                    Sign Up
                  </NavLink>
                </>
              )}
              <NavLink
                to=""
                onClick={() => this.props.history.push("/contact-us")}
              >
                Contact Us
              </NavLink>
            </Nav>
          </div>
        </Navbar>
        <Modal show={this.state.show} onHide={this.handleclose}>
          <Modal.Header>
            <Modal.Body>
              {this.state.modalType === "signup" ? (
                <Signup setSessionId={this.props.setSessionId} />
              ) : (
                <AvailabilitySearch
                  setListings={this.props.setListings}
                  close={this.handleclose}
                />
              )}
            </Modal.Body>
          </Modal.Header>
        </Modal>
      </div>
    );
  }
}
export default withRouter(Header);
