import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import { Mongo } from 'meteor/mongo';

import { withHistory, Link, Redirect } from 'react-router-dom';
import DayPickerInput from 'react-day-picker/DayPickerInput';

import { Campaigns } from '../../api/campaigns.js';
import {
    Button
} from 'semantic-ui-react';

export default class CampaignPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        deleted: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const date = new Date();
    var campaign = {
      name: this.state.name,
      owner: Meteor.userId(),
      username: Meteor.user().username,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      description: this.state.description,
    }
    Meteor.call('campaigns.edit', campaign, this.props.location.state.campaignID);
  }

  handleDelete = () => {
      Meteor.call('campaigns.delete', this.props.match.params.id);
      this.setState({ deleted: true });
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
      if (this.state.deleted === true) return <Redirect to='/home'/>
      var obj = Campaigns.findOne({ _id: this.props.match.params.id });
      if(obj != null) {
          var campName = obj.name;
          var campDes = obj.description;
          var campStartDate = obj.startDate;
          var startString = campStartDate.toLocaleDateString();
          var campEndDate = obj.endDate;
          var endString = campEndDate.toLocaleDateString();
      }
    return (
        <div>
          <div className="card mb-3">
            <h2 className="card-header">{campName}</h2>
            <Button floated='right' color='orange' onClick={this.handleDelete}>Delete</Button>
            <h3> Description: {campDes}</h3>
            <h3> Start Date: {startString}</h3>
            <h3> End Date: {endString}</h3>
            <Link to={{
              pathname: `/public/${this.props.location.state.campaignID}`,
              state: {
                campaignID: this.props.location.state.campaignID
              }
            }}>Public Campaign Link</Link>
          </div>
          <form className = "needs-validation" novalidate onSubmit={this.handleSubmit}>
            <label>
              EDIT name: <br />
              <input type="text" defaultValue = {campName} onChange={this.handleChange('name')}/>
              <br /> EDIT Description: <br />
              <input type="text" defaultValue = {campDes} onChange={this.handleChange('description')}/>
              <br /> EDIT Start Date: <br />
              <DayPickerInput placeholder = {campStartDate} onDayChange={this.handleStartDayChange.bind(this)}/>
              <br /> EDIT End Date: <br />
              <DayPickerInput placeholder = {campEndDate} onDayChange={this.handleEndDayChange.bind(this)}/>
              <input type="submit" value="Submit" />
            </label>
          </form>
        </div>
    );
  }
}
