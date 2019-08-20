import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withHistory, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { List, Header } from 'semantic-ui-react';

import Campaign from '../../Campaign.jsx';

export default class CampaignList extends Component {
  constructor(props) {
    super(props);
  }

  renderCampaigns() {
    return this.props.campaigns.map((campaign) => (
      <Campaign key={campaign._id} campaign={campaign}/>
    ));
  }

  render() {

    return (
        <div>
            <Header as='h1'
                  color='orange'
                  style={{
                      fontSize: '2em',
                      letterSpacing: '1.5px' }}>
              CAMPAIGNS
            </Header>
            <List>
              {this.renderCampaigns()}
            </List>
      </div>
    );
  }
}

CampaignList.propTypes = {
  campaigns: PropTypes.array.isRequired,
};
