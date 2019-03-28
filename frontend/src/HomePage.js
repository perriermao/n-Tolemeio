import React, { Component } from "react";
import { Link } from "react-router-dom";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import moment from "moment";
import "./homepage.css";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

import "react-dates/lib/css/_datepicker.css";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = { listings: [], startDate: "", endDate: "" };
  }
  componentDidMount() {
    fetch("http://localhost:4000/listings")
      .then(function(x) {
        return x.text();
      })
      .then(x => {
        let parsedResponse = JSON.parse(x);
        console.log(parsedResponse);
        if (parsedResponse.success) {
          this.setState({ listings: parsedResponse.listings });
        }
      });
  }
  render() {
    console.log("state", this.state);
    const selectionRange = {
      startDate: this.state.startDate,
      endDate: this.state.startDate,
      key: "selection"
    };
    return (
      <div>
        <div className="main" />
        <div className="main-listings">
          {this.state.listings.map(listing => (
            <div className="listing-container" key={listing._id}>
              <Link
                to={`/listings/${listing.city}`}
                className="main-listing"
                style={{
                  backgroundImage: `url('http://localhost:4000/${
                    listing.pictureFiles[0]
                  }')`
                }}
              >
                <span className="listing-city">{listing.city}</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default HomePage;

// export default [
//   {
//     propertyName: "Les Anges",
//     Location: "",
//     price: "",
//     picture: "/sampleimages/Les Anges.jpeg"
//   },
//   { propertyName: "Grace", Location: "", price: "", picture: "" },
//   { propertyName: "Maurice", Location: "", price: "", picture: "" },
//   { propertyName: "", Location: "", price: "", picture: "" },
//   { propertyName: "", Location: "", price: "", picture: "" },
//   { propertyName: "", Location: "", price: "", picture: "" }
// ];
