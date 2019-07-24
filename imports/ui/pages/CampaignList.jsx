import React, { Component } from 'react';
import { ListItem } from 'material-ui/List';

export default class CampaignList extends Component {
  render () {
    return (
      <ListItem
        primaryText = {this.props.player.name}
        />
    )
  }
}
