import React, { Component } from 'react';
import { List } from 'semantic-ui-react';
import PropTypes from 'prop-types';

export default class CampaignItem extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    console.log(this.props.campaign.name);
    return (
      <List.Item>{this.props.campaign.name}</List.Item>
    )
  }
}

CampaignItem.propTypes = {
  //key: PropTypes.string,
  campaign: PropTypes.object.isRequired,
};
