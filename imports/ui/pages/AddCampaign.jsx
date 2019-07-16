import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withHistory, withRouter, Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import { Campaigns } from '../../api/campaigns.js';

export default class AddCampaign extends Component {
  constructor(props){
    super(props);

    this.state = {
      newCampaign: {
        name: '',
        startDate: '',
        endDate: '',
        description: '',
        userId: '',
      }
    }

    // This binding is necessary to make `this` work in the callback
    this.handleName = this.handleName.bind(this);
    this.handleStartDate = this.handleStartDate.bind(this);
    this.handleEndDate = this.handleEndDate.bind(this);
    this.handleDescription = this.handleDescription.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleName(e){
    let value = e.target.value;
    this.setState( prevState => ({ newUser :
     {...prevState.newUser, name: value
     }
    }), () => console.log(this.state.newUser))
  }

  handleStartDate(e){
    let value = e.target.value;
    this.setState( prevState => ({ newUser :
     {...prevState.newUser, startDate: value
     }
    }), () => console.log(this.state.newUser))
  }

  handleEndDate(e){
    let value = e.target.value;
    this.setState( prevState => ({ newUser :
     {...prevState.newUser, endDate: value
     }
    }), () => console.log(this.state.newUser))
  }

  handleDescription(e){
    let value = e.target.value;
    this.setState( prevState => ({ newUser :
     {...prevState.newUser, description: value
     }
    }), () => console.log(this.state.newUser))
  }

  handleFormSubmit(e){
    e.preventDefault();
    Campaigns.insert({
      // name: this.state.newCampaign.name,
      // startDate: this.state.newCampaign.startDate,
      // endDate: this.state.newCampaign.endDate,
      // description: this.state.newCampaign.description,
      // userId: this.props.currentUser,
      name: this.refs.name,
      startDate: this.refs.startDate,
      endDate: this.refs.endDate,
      description: this.refs.description,
      userId: this.props.currentUser,
    });
    // const campaign = {
    //   name: this.refs.name,
    //   startDate: this.refs.startDate,
    //   endDate: this.refs.endDate,
    //   description: this.refs.description,
    //   userId: this.props.currentUser,
    // };
    //
    // Campaigns.schema.validate(campaign);
    // Campaigns.insert(campaign);

    console.log("Success, campaign submitted!");

    this.props.history.push('/');
  }

    render() {

        return (
            <div className="card-body">
              <h1>Create your new Campaign!</h1>
              <form action="/action_page.php" class="was-validated">
                <div class="form-group">
                  <label>Name:</label>
                  <input
                      className="form-control"
                      type="text"
                      ref="name"
                      placeholder="Name"
                      //onChange={this.handleName}
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
                      ref="startDate"
                      placeholder=""
                      //onChange={this.handleStartDate}
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
                    ref="endDate"
                    placeholder=""
                    //onChange={this.handleStartDate}
                    required
                    />
                </div>
                <div class="valid-feedback">Valid.</div>
                <div class="invalid-feedback">Please fill out this field</div>
              </div>
              <div className="form-group">
                <label>Description:</label>
                  <input
                      className="form-control"
                      type="text"
                      ref="description"
                      placeholder="Please describe your campaign"
                      //onChange={this.handleDescription}
                      required
                  />
                  <div class="valid-feedback">Valid.</div>
                  <div class="invalid-feedback">Please fill out this field</div>
              </div>
              <Link to="/home">Homepage</Link>
              <Button onClick={this.handleFormSubmit}>Submit</Button>
              </form>
            </div>
        )
    }
}
