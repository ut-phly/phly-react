import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withHistory, Link } from 'react-router-dom';
import Campaign from '../Campaign.jsx';

export default class CampaignList extends Component {
    renderCampaigns() {
        let myCampaigns = this.props.campaigns;

        return myCampaigns.map((campaign) => {
            return (
                <Campaign
                    key={campaign._id}
                    campaign={campaign}
                />
            );
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        const name = ReactDOM.findDOMNode(this.refs.nameInput).value.trim();
        Meteor.call('campaigns.insert', name);
        ReactDOM.findDOMNode(this.refs.nameInput).value = '';
    }

    render() {
        let currentUser = this.props.currentUser;
        let userDataAvailable = (currentUser !== undefined);

        return(
            <div>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <input
                        type="text"
                        ref="nameInput"
                        placeholder=" Add new campaign"
                    />
                </form>
                <ul className="campaigns">
                    {this.renderCampaigns()}
                </ul>
            </div>
        )
    }
}
