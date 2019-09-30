import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withHistory, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import { withRouter } from 'react-router-dom';

import {
    Button,
    Form,
    Responsive,
    Segment,
    Grid,
    Header
} from 'semantic-ui-react';

import { Campaigns } from '../../api/campaigns.js';

export default class AddCampaign extends Component {
    constructor(props) {
      super(props);
      this.state = {
        name: '',
        description: '',
        startDate: new Date(),
        endDate: new Date(),
        created: false
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
            owner: this.props.org,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            description: this.state.description,
        }
        Meteor.call('campaigns.insert', campaign);
        this.setState(() => ({
            created: true
        }));

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

        if (this.state.created === true) return <Redirect to='/home'/>

      return (
        <form className = "needs-validation" noValidate onSubmit={this.handleSubmit}>
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
          <label htmlFor="startDate"> Start Date <br /> </label>
          <DayPickerInput onDayChange={this.handleStartDayChange.bind(this)}/>
          <br />
          <label htmlFor="endDate"> End Date <br /> </label>
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
