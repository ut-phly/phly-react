import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withHistory, Link } from 'react-router-dom';

//import Campaigns from '../../api/campaigns.js';

export default class CampaignPage extends Component {
  constructor(props) {
    super(props);
  }

  //function to find specific campaign

// add link to public campaign page here
//figure out how to pass props for specific campaign to Campaign Page
  render() {
    console.log(this.props);
    console.log(this.props.location.state.campaignID);
    return (
        <div>
          <div className="card mb-3">
            <h2 className="card-header">Campaign Page</h2>
            <Link to={{
              pathname: `/public/${this.props.location.state.campaignID}`,
              state: {
                campaignID: this.props.location.state.campaignID
              }
            }}>Public Campaign Link</Link>
          </div>
        </div>
    );
  }
}
