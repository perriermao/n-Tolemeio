import { connect } from "react-redux";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { throws } from "assert";

class DisplayAvailabilitySearch extends Component {
  constructor(props) {
    console.log("working??");
    super(props);
    this.state = { listing: null };
  }
  //init render undefined.
  render() {
    console.log("props", this.props);
    if (this.props.searchResults === undefined) {
      return <div />;
    } else {
      return (
        <div className="main-listings">
          {this.props.searchResults.map(listing => (
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
}
let mapStateToProps = state => {
  return {
    listings: state.listings,
    city: "",
    startDate: "",
    endDate: "",
    searchResults: state.search
  };
};
export default connect(mapStateToProps)(DisplayAvailabilitySearch);
