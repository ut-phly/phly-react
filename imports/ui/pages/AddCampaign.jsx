import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withHistory, Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Campaigns from '../../api/campaigns.js';

export default class AddCampaign extends Component {

  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     startDate: moment()
  //   };
  //   this.handleChange = this.handleChange.bind(this);
  //   this.handleSubmit = this.handleSubmit.bind(this);
  // }
  //
  // handleChange(date) {
  //   this.setState({
  //     startDate: date
  //   })
  // }
  //
  // handleSubmit(e) {
  //   e.preventDefault();
  //   let main = this.state.startDate
  //   console.log(main.format('L'));
  // }

    render() {

        return (

            <div className="card-body">
              <h1>Create your new Campaign!</h1>
              <form class="needs-validation" novalidate>
                <div class="form-group">
                  <div class="col-md-4 mb-3">
                    <label for="validationCustom01">Name:</label>
                    <input
                      className="form-control"
                      type="text"
                      id="validationCustom01"
                      placeholder="Write your campaign name here"
                      required
                  />
                  <div class="valid-feedback">Valid.</div>
                  <div class="invalid-feedback">Please fill out this field.</div>
              </div>
              <div class="form-group">
                <div class="col-md-4 mb-3">
                  <label for="validationCustom01">Start Date:</label>
                  <input
                    className="form-control"
                    type="date"
                    id="startDate"
                    placeholder=""
                    required
                />
                <div class="valid-feedback">Valid.</div>
                <div class="invalid-feedback">Please fill out this field.</div>
            </div>
            <div class="form-group">
              <div class="col-md-4 mb-3">
                <label for="validationCustom01">End Date:</label>
                <input
                  className="form-control"
                  type="date"
                  id="endDate"
                  placeholder=""
                  required
              />
              <div class="valid-feedback">Valid.</div>
              <div class="invalid-feedback">Please fill out this field.</div>
          </div>
          <div class="form-group">
            <div class="col-md-4 mb-3">
              <label for="validationCustom01">Description:</label>
              <input
                className="form-control"
                type="text"
                id="description"
                placeholder="Write your campaign description here"
                required
            />
            <div class="valid-feedback">Valid.</div>
            <div class="invalid-feedback">Please fill out this field.</div>
        </div>
        </div>
          </div>
            </div>
              </div>
              <button class="btn btn-primary btn-sm" type="submit" link to="/home">Submit</button>
              </form>
            </div>

        )
    }
}
