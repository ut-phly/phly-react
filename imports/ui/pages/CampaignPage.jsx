import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

import { withHistory, Link } from 'react-router-dom';

import { Campaigns } from '../../api/campaigns.js';

export default class CampaignPage extends Component {
  constructor(props) {
    super(props);
  }

  //function to find specific campaign

// add link to public campaign page here
//figure out how to pass props for specific campaign to Campaign Page
  render() {
    console.log(this.props);
    console.log(this.props.match.params.id);

    return (
        <div>
          <div className="card mb-3">
            <h2 className="card-header">{this.props.match.params.id}</h2>
            <Link to={{
              pathname: `/public/${this.props.match.params.id}`,
              state: {
                campaignID: this.props.match.params.id
              }
            }}>Public Campaign Link</Link>
          </div>
        </div>
    );
  }
}
