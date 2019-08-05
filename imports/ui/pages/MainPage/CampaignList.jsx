import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withHistory, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { List } from 'semantic-ui-react';

import CampaignItem from './CampaignItem.jsx';

export default class CampaignList extends Component {
  constructor(props) {
    super(props);
  }

  renderCampaigns() {
    return this.props.campaigns.map((campaign) => (
      <CampaignItem key={campaign._id} history={this.props.history} campaign={campaign}/>
    ));
  }

  render() {
    return (
      <div>
        <List>
          {this.renderCampaigns()}
        </List>
      </div>
    );
  }
}

CampaignList.propTypes = {
  history: PropTypes.object.isRequired,
  campaigns: PropTypes.array.isRequired,
};
