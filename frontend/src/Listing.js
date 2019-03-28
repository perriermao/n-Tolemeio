import React, { Component } from "react";
import { Link } from "react-router-dom";

class Listing extends Component {
  constructor() {
    super();
    this.state = { listing: null };
  }
  componentDidMount() {
    fetch("http://localhost:4000/listing/" + this.props.listingId)
      .then(function(x) {
        return x.text();
      })
      .then(x => {
        let parsedResponse = JSON.parse(x);
        console.log(parsedResponse);
        if (parsedResponse.success) {
          this.setState({ listing: parsedResponse.listing[0] });
        }
      });
  }
  render() {
    const listing = this.state.listing;
    return listing ? (
      <>
        <div
          className="main"
          style={{
            backgroundImage: `url(http://localhost:4000/${
              listing.pictureFiles[0]
            })`
          }}
        />
        <div className="show-listing">
          <div>
            {listing.pictureFiles.length > 1 ? (
              <img src={listing.pictureFiles[1]} />
            ) : null}
          </div>
          <div className="amenities">
            <ul>
              {listing.amenities.map(amenity => (
                <li key={amenity}>
                  <img src={`/sampleimages/${amenity}.svg`} />
                  <span>{amenity}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          {listing.pictureFiles.map(
            (picture, idx) =>
              idx !== 0 && (
                <div className="listing-container" key={listing.name}>
                  <div
                    className="main-listing"
                    style={{
                      backgroundImage: `url('http://localhost:4000/${picture}')`
                    }}
                  />
                </div>
              )
          )}
        </div>
      </>
    ) : (
      <div>Loading...</div>
    );
  }
}

export default Listing;
