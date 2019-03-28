import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import { DateRangePicker } from "react-dates";
import moment from "moment";
// import { throws } from "assert";

const amenities = [
  "Wifi",
  "TV",
  "Heat",
  "Air Conditioning",
  "Fireplace",
  "Pool",
  "Jacuzzi"
];

class AddListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      address: "12 st catherine st",
      zipCode: "H3H 2K2",
      city: "Montreal",
      rate: "",
      rates: [],
      description: "Great!",
      amenities: ["wifi", "tv", "heat"],
      numberOfBedrooms: "1",
      numberOfBathrooms: "1",
      pictureFiles: [],
      ratesStartDate: null,
      ratesEndDate: null,
      ratesFocusedInput: null
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleZipCodeChange = this.handleZipCodeChange.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleRateChange = this.handleRateChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleAmenitiesChange = this.handleAmenitiesChange.bind(this);
    this.handleNumberOfBedroomsChange = this.handleNumberOfBedroomsChange.bind(
      this
    );
    this.handleNumberofBathroomsChange = this.handleNumberofBathroomsChange.bind(
      this
    );
    this.handlepictureFilesUpload = this.handlepictureFilesUpload.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.updateRates = this.updateRates.bind(this);
    this.clearRates = this.clearRates.bind(this);
  }
  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }
  handleAddressChange(event) {
    this.setState({ address: event.target.value });
  }
  handleZipCodeChange(event) {
    this.setState({ zipCode: event.target.value });
  }
  handleCityChange(event) {
    this.setState({ city: event.target.value });
  }
  handleDescriptionChange(event) {
    this.setState({ description: event.target.value });
  }
  handleNumberOfBedroomsChange(event) {
    this.setState({ numberOfBedrooms: event.target.value });
  }
  handleNumberofBathroomsChange(event) {
    this.setState({ numberOfBathrooms: event.target.value });
  }
  handleRateChange(event) {
    this.setState({ rate: event.target.value });
  }

  clearRates() {
    this.setState({ rates: [] });
  }
  updateRates() {
    const { rate, ratesStartDate, ratesEndDate } = this.state;
    console.log("bacon");
    console.log(
      "rate:",
      rate,
      "ratesStartDate",
      ratesStartDate,
      "ratesEndDate",
      ratesEndDate
    );

    if (rate && ratesStartDate && ratesEndDate) {
      const newRate = {
        price: rate,
        from: ratesStartDate.unix(),
        to: ratesEndDate.unix()
      };
      this.setState({
        rates: this.state.rates.concat(newRate),
        rate: "",
        ratesStartDate: null,
        ratesEndDate: null
      });
    }
  }
  handleAmenitiesChange(event) {
    const value = event.target.value;
    this.setState({
      amenities: this.state.amenities.includes(value)
        ? this.state.amenities.filter(amenity => amenity !== value)
        : this.state.amenities.concat(value)
    });
  }
  handlepictureFilesUpload(event) {
    let files = [];
    for (let i = 0; i < event.target.files.length; i++) {
      files.push(event.target.files[i]);
    }
    this.setState({ pictureFiles: files });
  }
  handleUpload(event) {
    event.preventDefault();
    let formData = new FormData();
    this.state.pictureFiles.forEach(file => {
      formData.append("productImage", file, file.name);
    });
    formData.append("name", this.state.name);
    formData.append("address", this.state.address);
    formData.append("zipCode", this.state.zipCode);
    formData.append("city", this.state.city);
    formData.append("rates", JSON.stringify(this.state.rates));
    formData.append("description", this.state.description);
    formData.append("amenities", JSON.stringify(this.state.amenities));
    formData.append("numberOfBedrooms", this.state.numberOfBedrooms);
    formData.append("numberOfBathrooms", this.state.numberOfBathrooms);
    console.log(
      "product-image",
      this.state.pictureFiles,
      "name",
      this.state.name,
      "description",
      this.state.description,
      "rate",
      this.state.rate
    );
    fetch("http://localhost:4000/addListing", {
      body: formData,
      method: "POST"
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
      });
  }

  render() {
    console.log(this.state.pictureFiles, "pictureFile");
    return (
      <Container>
        <form onSubmit={this.handleUpload}>
          <h3>Property Name</h3>
          <input
            type="text"
            value={this.state.name}
            onChange={this.handleNameChange}
            required
          />
          <h3>Address</h3>
          <input
            type="text"
            value={this.state.address}
            onChange={this.handleAddressChange}
            required
          />
          <h3>Zip code</h3>
          <input
            type="text"
            value={this.state.zipCode}
            onChange={this.handleZipCodeChange}
            required
          />
          <h3>City</h3>
          <input
            type="text"
            value={this.state.city}
            onChange={this.handleCityChange}
            required
          />
          <h3>Description</h3>
          <input
            type="text"
            value={this.state.description}
            onChange={this.handleDescriptionChange}
            required
          />
          <h3>Rates</h3>
          <div>
            {this.state.rates.map(rate => (
              <div>
                {rate.price}, {moment(rate.from * 1000).format("MMM Do YY")},{" "}
                {moment(rate.to * 1000).format("MMM Do YY")}
              </div>
            ))}
          </div>
          <input
            type="text"
            placeholder="100$"
            value={this.state.rate}
            onChange={this.handleRateChange}
          />
          <DateRangePicker
            startDate={this.state.ratesStartDate}
            startDateId="new_listing_start_date"
            endDate={this.state.ratesEndDate}
            endDateId="new_listing_end_date"
            onDatesChange={({ startDate, endDate }) => {
              console.log("startdate", startDate, endDate);
              this.setState({
                ratesStartDate: startDate,
                ratesEndDate: endDate
              });
            }}
            focusedInput={this.state.ratesFocusedInput}
            onFocusChange={ratesFocusedInput => {
              console.log(ratesFocusedInput);
              this.setState({ ratesFocusedInput });
            }}
          />

          <div>
            <button type="button" onClick={this.updateRates}>
              Update
            </button>
            <div>
              <button type="button" onClick={this.clearRates}>
                Clear All
              </button>
            </div>
          </div>
          <h3>Home Amenities</h3>
          <div className="form-amenities">
            {amenities.map(amenity => (
              <div key={amenity}>
                <label htmlFor={amenity}>{amenity}</label>
                <input
                  type="checkbox"
                  checked={this.state.amenities.includes(amenity.toLowerCase())}
                  value={amenity.toLowerCase()}
                  onChange={this.handleAmenitiesChange}
                  id={amenity}
                />
              </div>
            ))}
          </div>
          <h3>Number of Bedrooms</h3>
          <input
            type="text"
            value={this.state.numberOfBedrooms}
            onChange={this.handleNumberOfBedroomsChange}
            required
          />
          <h3>Number of Bathrooms</h3>
          <input
            type="text"
            value={this.state.numberOfBathrooms}
            onChange={this.handleNumberofBathroomsChange}
            required
          />
          <div>
            <input
              type="file"
              onChange={this.handlepictureFilesUpload}
              multiple
            />
            {this.state.pictureFiles.map(picture => (
              <img
                style={{ height: "100px" }}
                src={URL.createObjectURL(picture)}
              />
            ))}
            {/* <img style={{ height: "100px" }} src={this.state.pictureFiles} /> */}
          </div>

          <input className="submit-button" type="submit" />
        </form>
      </Container>
    );
  }
  //URL.createObjectURL(
}

export default AddListing;
