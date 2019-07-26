import React, { Component } from 'react';
import { ListItem } from 'material-ui/List';

export default class CampaignList extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <ListItem
        primaryText = {this.props.campaign.name}
        //onClick={this.toInternalCampaignPage()}
        />
    )
  }
}
