import React, { Component } from "react";
import { Link } from "react-router-dom";

//Listing component
//componentDidMount -> fetch all listings for city using e.g. /listings/:city

class Listings extends Component {
  constructor() {
    super();
  }
  componentDidMount() {
    fetch("http://localhost:4000/listings/" + this.props.city)
      .then(function(x) {
        return x.text();
      })
      .then(x => {
        let parsedResponse = JSON.parse(x);
        console.log(parsedResponse);
        if (parsedResponse.success) {
          this.props.setListings(parsedResponse.listings);
        }
      });
  }
  render() {
    return (
      <div className="main-listings">
        {this.props.listings.map(listing => (
          <div className="listing-container" key={listing.name}>
            <Link
              to={`/listing/${listing._id}`}
              className="main-listing "
              style={{
                backgroundImage: `url('http://localhost:4000/${
                  listing.pictureFiles[0]
                }')`
              }}
            >
              <span className="listing-name">{listing.name}</span>
            </Link>
          </div>
        ))}
      </div>
    );
  }
}

export default Listings;
