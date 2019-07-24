import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withHistory, Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { withRouter } from 'react-router-dom';

import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Campaigns1 } from '../../api/campaigns1.js';
//import { CampaignList } from '../campaignlist.jsx';

 class AddCampaign extends Component {

  submitCampaign(event) {
    event.preventDefault();
    //inserts current user info in db
    Campaigns1.insert({
      name: this.refs.name.value,
      startDate: this.refs.startDate.value,
      endDate: this.refs.endDate.value,
      description: this.refs.description.value,
      user : 'Tara',
      // createdAt: new Date(),
    })

    this.props.history.push('/');
  }

    render() {

        return (

            <div className="card-body">
              <h1>Create your new Campaign!</h1>
              <form className="needs-validation" novalidate onSubmit={this.submitCampaign.bind(this)}>
                <div className="form-group">
                  <div className="col-md-4 mb-3">
                    <label htmlFor="validationCustom01">Name:</label>
                    <input
                      className="form-control"
                      ref="name"
                      type="text"
                      id="validationCustom01"
                      placeholder="Write your campaign name here"
                      required
                  />
                  <div className="valid-feedback">Valid.</div>
                  <div className="invalid-feedback">Please fill out this field.</div>
              </div>
              <div className="form-group">
                <div className="col-md-4 mb-3">
                  <label htmlFor="validationCustom01">Start Date:</label>
                  <input
                    className="form-control"
                    ref="startDate"
                    type="date"
                    id="startDate"
                    placeholder=""
                    required
                />
                <div className="valid-feedback">Valid.</div>
                <div className="invalid-feedback">Please fill out this field.</div>
            </div>
            <div className="form-group">
              <div className="col-md-4 mb-3">
                <label htmlFor="validationCustom01">End Date:</label>
                <input
                  className="form-control"
                  ref="endDate"
                  type="date"
                  id="endDate"
                  placeholder=""
                  required
              />
              <div className="valid-feedback">Valid.</div>
              <div className="invalid-feedback">Please fill out this field.</div>
          </div>
          <div className="form-group">
            <div className="col-md-4 mb-3">
              <label htmlFor="validationCustom01">Description:</label>
              <input
                className="form-control"
                ref="description"
                type="text"
                id="description"
                placeholder="Write your campaign description here"
                required
            />
            <div className="valid-feedback">Valid.</div>
            <div className="invalid-feedback">Please fill out this field.</div>
        </div>
        </div>
          </div>
            </div>
              </div>
              <button className="btn btn-primary btn-sm" type="submit" name="action">Submit</button>
              </form>
            </div>

        )
    }
}

export default withRouter(AddCampaign);
