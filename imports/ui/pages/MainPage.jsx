import React, { Component } from 'react';
import { withHistory, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Campaign from '../Campaign.jsx';

export default class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: ''
        };
    }

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

    render() {
        let currentUser = this.props.currentUser;
        let userDataAvailable = (currentUser !== undefined);
        let loggedIn = (currentUser && userDataAvailable);

        return (
            <div>
                <div className="container">
                    <h1>
                        { loggedIn ? 'Welcome ' + currentUser.username : '' }
                    </h1>
                    <ul className="campaigns">
                        {this.renderCampaigns()}
                    </ul>
                </div>
            </div>
        );
    }
}

MainPage.propTypes = {
    username: PropTypes.string
}
