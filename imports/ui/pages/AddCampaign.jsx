import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withHistory, Link } from 'react-router-dom';

import Campaigns from '../../api/campaigns.js';

export default class AddCampaign extends Component {


  var DatePicker = require("react-bootstrap-date-picker");

  var App = React.createClass({
  getInitialState: function(){
    var value = new Date().toISOString();
    return {
      value: value
    }
  },
  handleChange: function(value, formattedValue) {
    this.setState({
      value: value, // ISO String, ex: "2016-11-19T12:00:00.000Z"
      formattedValue: formattedValue // Formatted String, ex: "11/19/2016"
    });
  },
  componentDidUpdate: function(){
    // Access ISO String and formatted values from the DOM.
    var hiddenInputElement = document.getElementById("example-datepicker");
    console.log(hiddenInputElement.value); // ISO String, ex: "2016-11-19T12:00:00.000Z"
    console.log(hiddenInputElement.getAttribute('data-formattedvalue')) // Formatted String, ex: "11/19/2016"
  },

    render() {

        return (
            <div className="card-body">
              <h1>Create your new Campaign!</h1>
              <form action="/action_page.php" class="was-validated">
                <div class="form-group">
                  <label for="name">Name:</label>
                  <input
                      className="form-control"
                      type="text"
                      ref="nameInput"
                      placeholder="Name"
                      required
                  />
                  <div class="valid-feedback">Valid.</div>
                  <div class="invalid-feedback">Please fill out this field.</div>
              </div>
              <div className="form-group">
                <label for="start-date">Start Date:</label>
                  <input
                      className="form-control"
                      type="text"
                      ref="nameInput"
                      placeholder="MM/DD/YYYY"
                      required
                  />
                  <div class="valid-feedback">Valid.</div>
                  <div class="invalid-feedback">Please fill out this field</div>
              </div>
              <FormGroup>
                <ControlLabel>Label</ControlLabel>
                <DatePicker id="example-datepicker" value={this.state.value} onChange={this.handleChange} />
                <HelpBlock>Help</HelpBlock>
              </FormGroup>;
              <form id="profileForm" class="form-horizontal">
                <div className="form-group">
                  <label class="col-sm-3 control-label">End Date</label>
                  <div class="col-sm-3">
                    <input
                        type="text"
                        class="form-control"
                        name="end-date"
                        placeholder="YYYY"
                        required
                    />
                    </div>
                    <div class="valid-feedback">Valid.</div>
                    <div class="invalid-feedback">Please fill out this field</div>
                </div>
              </form>
              <div className="form-group">
                <label for="descip">Description:</label>
                  <input
                      className="form-control"
                      type="text"
                      ref="nameInput"
                      placeholder="Please describe your campaign"
                      required
                  />
                  <div class="valid-feedback">Valid.</div>
                  <div class="invalid-feedback">Please fill out this field</div>
              </div>
              <Link to="/home">Submit</Link>
              </form>
            </div>
        )
    }
}
