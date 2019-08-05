import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withHistory, Link } from 'react-router-dom';

//import Campaigns from '../../api/campaigns.js';

export default class CampaignPage extends Component {
  constructor(props) {
    super(props);
  }

// add link to public campaign page here
//figure out how to pass props for specific campaign to Campaign Page
  render() {
    return (
        <div>
          <div className="card mb-3">
            <h2 className="card-header">Campaign Page</h2>
          </div>
        </div>
    );
  }
}
