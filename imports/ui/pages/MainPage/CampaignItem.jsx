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
    // return (
    //   <List.Item href={`/home/${this.props.campaign._id}`}>
    //     {this.props.campaign.name}
    //   </List.Item>
    // );
    console.log(this.props.campaign._id);
    return (
      <List.Item>
        <Link to={{
          pathname: `/home/${this.props.campaign._id}`,
          state: {
            campaignID: this.props.campaign._id
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
