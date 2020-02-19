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
    Header,
    TextArea,
    Input
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
        goalAmount: 0,
        nonprofit: '',
        created: false
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const date = new Date();
        const qrCode = "error.svg";
        var campaign = {
            name: this.state.name,
            createdAt: new Date(),
            owner: this.props.org,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            description: this.state.description,
            nonprofit: this.state.nonprofit,
            goalAmount: this.state.goalAmount,
            qrCode: qrCode
        }
        console.log(campaign);
        Meteor.call('campaigns.insert', campaign);
        this.setState(() => ({
            created: true
        }));

    }

    handleChange(key){
      return function(e) {
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
        <Responsive>
          <Segment style={{ backgroundColor: '#F9FFFF', margin: 0 }} basic clearing>
            <Header as='h1'
                    floated='left'
                    color='orange'
                    style={{
                          fontSize: '2em',
                          letterSpacing: '1.5px',
                          margin: 0,
                          paddingRight: '.5em' }}>
              New Campaign
            </Header>
          </Segment>
          <Segment style={{ backgroundColor: '#F9FFFF', margin: 0 }} basic clearing>
            <Form noValidate onSubmit={this.handleSubmit}>
              <Form.Group widths="equal">
                <Form.Input fluid type="text" label="Name" value={this.state.name} onChange={this.handleChange('name')} />
                <Form.Input fluid type="text" label="Non Profit" value={this.state.nonprofit} onChange={this.handleChange('nonprofit')} />
              </Form.Group>
              <Form.TextArea type="text" label="Description" value={this.state.description} onChange = {this.handleChange('description')} />
              <Form.Group widths="equal">
                <Form.Field>
                  <label htmlFor="startDate">Start Date</label>
                  <DayPickerInput onDayChange={this.handleStartDayChange.bind(this)}/>
                </Form.Field>
                <Form.Field>
                  <label htmlFor="endDate">End Date</label>
                  <DayPickerInput onDayChange={this.handleEndDayChange.bind(this)}/>
                </Form.Field>
                <Form.Field>
                  <label>Goal</label>
                  <Input type="number" label="$" value = {this.state.goalAmount} onChange = {this.handleChange('goalAmount')}/>
                </Form.Field>
              </Form.Group>
              <Button color='orange' type='submit'>Create</Button>
            </Form>
          </Segment>
        </Responsive>
      );
    }
}

//export default withRouter(AddCampaign);
AddCampaign.propTypes = {
    history: PropTypes.object,
    currentUser: PropTypes.object,
    org: PropTypes.string,
}
