import React, { Component } from 'react';
import { List, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import CampaignPage from '../../pages/CampaignPage.jsx';

export default class CampaignItem extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    console.log(this.props.campaign._id);
    return (
      <List.Item>
        <Route
          path={`/home/${this.props.campaign._id}`}
          render={(props) => <CampaignPage {...props} campaigns={this.props.campaigns}/>}
        />
        <Header>{this.props.campaign.name}</Header>
      </List.Item>
    )
  }
}

CampaignItem.propTypes = {
  //key: PropTypes.string,
  campaign: PropTypes.object.isRequired,
};
