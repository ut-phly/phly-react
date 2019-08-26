import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withHistory, Link } from 'react-router-dom';
import { Campaigns } from '../../api/campaigns.js';

//import Campaigns from '../../api/campaigns.js';

export default class CampaignPage extends Component {
  constructor(props) {
    super(props);
  }

  //function to find specific campaign

// add link to public campaign page here
//figure out how to pass props for specific campaign to Campaign Page

  renderObj () {
    return (
      <div>
      {this.props.location.state.campaignStartDate}
      </div>
    )
  }

  render() {
    // console.log("props " + this.props);
    var userIDname = this.props.location.state.campaignID;
    // console.log(userIDname);
    console.log("id");
    console.log(this.props.location.state.campaignID);
    console.log("name");
    console.log(this.props.location.state.campaignNAME);
    console.log("camp");
    console.log(this.props.location.state.camp);
    console.log("startDate HERE");
    console.log(this.props.location.state.campaignStartDate);
    console.log("des");
    console.log(this.props.location.state.campaignDes);
    // Campaigns.findById(userIDname, function(err, campaigns) {});

    // console.log("collection");
    // console.log(Campaigns.find().fetch());
    return (
        <div>
          <div className="card mb-3">
            <h2 className="card-header">{this.props.location.state.campaignNAME}</h2>
            <h3> Description: {this.props.location.state.campaignDes}</h3>
            <Link to={{
              pathname: `/public/${this.props.location.state.campaignID}`,
              state: {
                campaignID: this.props.location.state.campaignID
              }
            }}>Public Campaign Link</Link>
          </div>
          <Link to="/home/addCampaign">Edit</Link>
        </div>
    );
  }
}
