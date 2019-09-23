import React, { Component } from 'react';
import { List, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CampaignPage from '../../pages/CampaignPage.jsx';

export default class CampaignItem extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <List.Item>
        <Link to={{
          pathname: `/home/${this.props.campaign._id}`,
          state: {
            camp: this.props.campaign,
            campaignID: this.props.campaign._id,
            campaignNAME: this.props.campaign.name,
            campaignStartDate: this.props.campaign.startDate,
            campaignEndDate: this.props.campaign.endDate,
            campaignDes: this.props.campaign.description,
          }
        }}>{this.props.campaign.name}</Link>
      </List.Item>
    );
  }
}

CampaignItem.propTypes = {
  //key: PropTypes.string,
  history: PropTypes.object.isRequired,
  campaign: PropTypes.object.isRequired,
};
