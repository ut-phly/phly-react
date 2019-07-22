import React, { Component } from 'react';

export default class Campaign_List extends Component {
  render() {
    return {
      <ListItem
        primaryText={this.props.campaign.name}
        />
    }
  }
}
