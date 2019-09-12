import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import { withRouter } from 'react-router-dom';

import { Button, Form } from 'semantic-ui-react';

import { Campaigns } from '../../api/campaigns.js';

export default class AddCampaign extends Component {
    constructor(props) {
      super(props);
      this.state = {
        name: '',
        description: '',
        startDate: new Date(),
        endDate: new Date(),
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
      event.preventDefault();
      const date = new Date();
      var campaign = {
        name: this.state.name,
        createdAt: new Date(),
        owner: Meteor.userId(),
        username: Meteor.user().username,
        startDate: this.state.startDate,
        endDate: this.state.endDate,
        description: this.state.description,
      }
      Meteor.call('campaigns.insert', campaign);
    }

    handleChange(key){
      return function(e){
        var state = {};
        state[key] = e.target.value;
        this.setState(state);
      }.bind(this);
    }

    handleStartDayChange(day){
      this.setState({startDate: day});
    }

    handleEndDayChange(day){
      this.setState({endDate: day});
    }


    render() {
      return (
        <form className = "needs-validation" novalidate onSubmit={this.handleSubmit}>
          <label>
            Name: <br />
            <input type="text" value = {this.state.name} onChange={this.handleChange('name')} />
          </label>
          <label>
          <br />
            Description: <br />
            <input type="text" value = {this.state.description} onChange = {this.handleChange('description')} />
          </label>
          <br />
          <label for="startDate"> Start Date <br /> </label>
          <DayPickerInput onDayChange={this.handleStartDayChange.bind(this)}/>
          <br />
          <label for="startDate"> End Date <br /> </label>
          <DayPickerInput onDayChange={this.handleEndDayChange.bind(this)}/>
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }

//export default withRouter(AddCampaign);
AddCampaign.propTypes = {
    history: PropTypes.object,
    currentUser: PropTypes.object,
}
