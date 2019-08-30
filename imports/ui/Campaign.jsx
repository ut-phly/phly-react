import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withHistory, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Campaigns } from '../api/campaigns.js';

import { Segment } from 'semantic-ui-react';

export default class Campaign extends Component {
    constructor(props) {
      super(props);
    }

    render() {
        console.log(this.props.campaign._id);
        return (
            <Segment>
                <Link to={`/home/${this.props.campaign._id}`}>{this.props.campaign.name}</Link>
            </Segment>
        )
    }
}


Campaign.propTypes = {
  campaign: PropTypes.object.isRequired,
};
