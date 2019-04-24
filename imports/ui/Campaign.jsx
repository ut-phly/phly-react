import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import { Campaigns } from '../api/campaigns.js';

export default class Campaign extends Component {

    render() {
        return (
            <li>
                <h3>{this.props.campaign.name}</h3>
            </li>
        )
    }
}
