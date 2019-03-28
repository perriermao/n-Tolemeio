import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import AddListing from "./AddListing";
import HomePage from "./HomePage";
import Login from "./Login";
import Header from "./header";
import Listings from "./Listings";
import Listing from "./Listing";
import DisplayAvailabilitySearch from "./DisplayAvailabilitySearch";
import { connect } from "react-redux";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionId: "",
      listings: []
    };

    this.setSessionId = this.setSessionId.bind(this);
    this.setListings = this.setListings.bind(this);
    this.renderAddListing = this.renderAddListing.bind(this);
    this.renderAvailabilitySearch = this.renderAvailabilitySearch.bind(this);
  }

  setListings(listings) {
    this.setState({ listings });
  }

  renderAddListing() {
    return <AddListing />;
  }
  renderListings = routeProps => {
    const city = routeProps.match.params.city;
    return (
      <Listings
        city={city}
        listings={this.state.listings}
        setListings={this.setListings}
      />
    );
  };
  renders;
  renderListing(routeProps) {
    const listingId = routeProps.match.params.listingId;
    return <Listing listingId={listingId} />;
  }
  renderHomepage() {
    return <HomePage />;
  }
  renderAvailabilitySearch() {
    console.log("sandwich");
    return <DisplayAvailabilitySearch />;
  }
  setSessionId(sessionId) {
    this.setState({ sessionId });
  }
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header
            setSessionId={this.setSessionId}
            sessionId={this.state.sessionId}
            setListings={this.setListings}
          />
          <Route path="/addListing" render={this.renderAddListing} />
          <Route path="/listings/:city" render={this.renderListings} />
          <Route path="/listing/:listingId" render={this.renderListing} />
          <Route exact path="/" component={HomePage} />
          <Route
            path="/listings/:availabilitySearch"
            render={this.renderAvailabilitySearch}
          />
          <Route
            path="/login"
            render={() => <Login setSessionId={this.setSessionId} />}
          />
        </div>
      </BrowserRouter>
    );
  }
}

//   divify = () => {
//     return sampleData.map((item, index) => {
//       return (
//         <div key={"item" + index}>
//           <h2>{item.propertyName}</h2>
//           <img src={item.picture} />
//           <h3>{item.description}</h3>
//           <div>{item.price}</div>
//         </div>
//       );
//     });
//   };

//   render() {
//     return <div className="App">{this.divify()}</div>;
//   }
// }
let mapStateToProps = state => {
  return { listings: state.listings, city: "", startDate: "", endDate: "" };
};
export default connect(mapStateToProps)(App);
