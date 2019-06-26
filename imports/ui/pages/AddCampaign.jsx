import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withHistory, Link } from 'react-router-dom';

import Campaigns from '../../api/campaigns.js';

export default class AddCampaign extends Component {

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
              <label class="col-sm-3 control-label">Start Date</label>
                <div class="col-sm-3">
                  <input
                      className="form-control"
                      type="date"
                      ref="nameInput"
                      placeholder=""
                      required
                  />
                  </div>
                  <div class="valid-feedback">Valid.</div>
                  <div class="invalid-feedback">Please fill out this field</div>
              </div>
                <div className="form-group">
                  <label class="col-sm-3 control-label">End Date</label>
                  <div class="col-sm-3">
                    <input
                      className="form-control"
                      type="date"
                      ref="nameInput"
                      placeholder=""
                      required
                    />
                    </div>
                    <div class="valid-feedback">Valid.</div>
                    <div class="invalid-feedback">Please fill out this field</div>
                </div>
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
              <button type="submit" class="btn btn-primary">Submit</button>
              </form>
            </div>
        )
    }
}
