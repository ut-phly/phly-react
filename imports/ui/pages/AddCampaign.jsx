import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { Button, Form } from 'semantic-ui-react';

import { Campaigns } from '../../api/campaigns.js';

export default class AddCampaign extends Component {
    constructor(props) {
      super(props);
      // this.state = { campaignName: '' };
      // this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    // handleChange(event) {
    //   this.setState({ value: event.target.value });
    // }

    handleSubmit(event) {
      alert('The campaign is: ' + this.input.value);
      event.preventDefault();
      const name = this.input.value;
      const username = Meteor.user().username;
      const date = new Date();
      const owner= Meteor.userId();
      const campaign = {
        name: name,
        owner: owner,
        username: username,
      };
      Meteor.call('campaigns.insert', campaign);
    }

    render() {
      // return (
      //   <form onSubmit={this.handleSubmit}>
      //     <input
      //       type="text"
      //       value={this.state.campaignname}
      //       onChange={this.handleChange}
      //     />
      //     <input type="submit" value="Submit" />
      //   </form>
      // );
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" ref={(input) => this.input = input} />
          </label>
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
