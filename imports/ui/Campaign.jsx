import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withHistory, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Campaigns } from '../api/campaigns.js';

import { List } from 'semantic-ui-react';

export default class Campaign extends Component {
    constructor(props) {
      super(props);
    }

    render() {
        return (
            <List.Item className="list-group-item">
                <Link to={`/home/${this.props.campaign._id}`}>{this.props.campaign.name}</Link>
            </List.Item>
        )
    }
}


Campaign.propTypes = {
  //key: PropTypes.string,
  campaign: PropTypes.object.isRequired,
};
