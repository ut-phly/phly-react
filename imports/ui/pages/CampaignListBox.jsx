import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withHistory, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import CampaignPage from '../pages/CampaignPage.jsx';
import Profile from '../pages/Profile.jsx';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import CampaignList from '../pages/CampaignList.jsx';
import List from 'material-ui/List';
import { withTracker } from 'meteor/react-meteor-data';

import { Campaigns1 } from '../../api/campaigns1.js';
import { Meteor } from 'meteor/meteor';

class CampaignListBox extends Component {
  constructor(props) {
    super(props);
      this.state = {
        campaigns: [],
      };
  }

  // getCampaigns() {
  //   return [
  //     {
  //       _id: 1,
  //       name: "trial1",
  //     },
  //     {
  //       _id: 2,
  //       name: "trial2",
  //     },
  //     {
  //       _id: 3,
  //       name: "trial3",
  //     },
  //   ]
  // }

  renderCampaigns() {
    return this.props.campaigns.map((campaign) => (
      <CampaignList key={campaign._id} campaign={campaign}/>
    ));
  }

  getCampaignList(){
    return (
        <div>
          <List>
            {this.renderCampaigns()}
          </List>
        </div>
    );
  }

  render(){
    // return (
    //   <div>
    //     <List>
    //       {this.renderCampaigns()}
    //     </List>
    //   </div>
    // );
    return this.getCampaignList();
  }
}


CampaignListBox.propTypes = {
  campaigns: PropTypes.array.isRequired,
};

export default withTracker(() => {
  Meteor.subscribe('campaigns');

  return {
    campaigns: Campaigns1.find({}).fetch(),
  };

  console.log(this.props.campaigns.name);

})(CampaignListBox);
