import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withHistory, Link } from 'react-router-dom';

import Campaigns from '../../api/campaigns.js';

export default class CampaignPage extends Component {

    render() {
        let myCampaigns = this.props.campaigns;
        let check = myCampaigns.some(c => c._id === this.props.match.params.id);
        let campaign = myCampaigns.find(c => c._id === this.props.match.params.id);

        return (
            <div className="card-body">
                <h3>
                    { check ? campaign.name : "" }
                </h3>
            </div>
        )
    }
}
