import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
    debugger;
    e.preventDefault();
    console.log(this.name._getText());
    console.log(this.refs.startDate);
    console.log(this.refs.endDate);
    console.log(this.refs.description);
    console.log(this.props.currentUser);

    let testStartDate = new Date(2019, 11, 13);
    let testEndDate = new Date(2019, 12, 13);

    Campaigns.insert({

      name: 'trialName',
      startDate: 'testStartDate',
      endDate: 'testEndDate',
      description: 'testDescription',
      userId: 'testCurrentUser',
    });

    console.log("Success, campaign submitted!");

    //this.props.history.push('/');
  }



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
                    placeholder="Name"
                    ref={(name) => { this.name = name }}
                    required
                />
                <div class="valid-feedback">Valid.</div>
                <div class="invalid-feedback">Please fill out this field.</div>
            </div>
            <div className="container">
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label>Select Date: </label>
                  <DatePicker
                    selected={this.state.startDate}
                    onChange={this.handleChange}
                    name="startDate"
                    dateFormat="MM/DD/YYYY"
                  />
                </div>
                <div className="form-group">
                  <button className="btn btn-success">Add Date</button>
                </div>
              </form>
            </div>
            <div class="col-md-4 mb-3">
              <label for="endDate">End Date</label>
                <input
                    className="form-control"
                    type="date"
                    id="endDate"
                    placeholder=""
                    required
                />
                <div class="valid-feedback">Valid.</div>
                <div class="invalid-feedback">Please fill out this field</div>
            </div>
            <div class="col-md-4 mb-3">
              <label for="validationDescription">Description:</label>
              <input
                className="form-control"
                type="text"
                id="validationDescription"
                placeholder="Description"
                required
            />
            <div class="valid-feedback">Valid.</div>
            <div class="invalid-feedback">Please fill out this field.</div>
        </div>
            </div>
            <Link to="/home">Homepage</Link>
            <Button onClick={this.handleFormSubmit.bind(this)}>Submit</Button>
            </form>
          </div>

      )
  }


    // AddCampaign.propTypes = {
    //     username: PropTypes.string
    // }
}

//export default withRouter(New);
