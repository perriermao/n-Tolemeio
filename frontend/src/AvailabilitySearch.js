import { connect } from "react-redux";
import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import {
  DateRangePicker,
  SingleDatePicker,
  DayPickerRangeController
} from "react-dates";
import "react-dates/lib/css/_datepicker.css";

class AvailabilitySearch extends Component {
  constructor(props) {
    super(props);
    this.state = { listings: [], city: "", startDate: "", endDate: "" };
    this.handleAvailabilitySearch = this.handleAvailabilitySearch.bind(this);
  }
  handleAvailabilitySearch(e) {
    e.preventDefault();
    let enteredCity = this.state.city;
    let enteredStartDate = this.state.startDate;
    let enteredEndDate = this.state.endDate;
    let AvailabilitySearchInput = {
      city: enteredCity,
      startDate: enteredStartDate.unix(),
      endDate: enteredEndDate.unix()
    };
    console.log("AvailabilitySearchInput:", AvailabilitySearchInput);

    fetch("http://localhost:4000/search/", {
      method: "POST",
      body: JSON.stringify(AvailabilitySearchInput)
    })
      .then(function(x) {
        return x.text();
      })
      .then(x => {
        let parsedResponse = JSON.parse(x);
        console.log("bacon", parsedResponse);
        if (parsedResponse.success) {
          this.props.dispatch({
            type: "search-results",
            results: parsedResponse.result
          });
          this.props.close();
          this.props.history.push("/listings/:availabilitySearch");
        }
      });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleAvailabilitySearch}>
          <input
            type="text"
            placeholder="City"
            value={this.state.city}
            onChange={e => this.setState({ city: e.target.value })}
          />
          <DateRangePicker
            displayFormat="LLLL"
            startDate={this.state.startDate} // momentPropTypes.momentObj or null,
            startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
            endDate={this.state.endDate} // momentPropTypes.momentObj or null,
            endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
            onDatesChange={({ startDate, endDate }) => {
              console.log("startdate", startDate, endDate, endDate);
              this.setState({ startDate, endDate });
            }} // PropTypes.func.isRequired,
            focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
            onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
          />
          <button type="submit" className="search-button">
            <i class="fa fa-search" />
          </button>
        </form>
      </div>
    );
  }
}
export default withRouter(connect()(AvailabilitySearch));
