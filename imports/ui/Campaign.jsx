import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withHistory, Link } from 'react-router-dom';

import { Campaigns } from '../api/campaigns.js';

export default class Campaign extends Component {

    render() {
        return (
            <li className="list-group-item">
                <Link to={`/home/${this.props.campaign._id}`}>{this.props.campaign.name}</Link>
            </li>
        )
    }
}
