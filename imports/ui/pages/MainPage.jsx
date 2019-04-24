import React, { Component } from 'react';
import ReactDOM from 'react-dom';
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

    handleSubmit(event) {
        event.preventDefault();

        const name = ReactDOM.findDOMNode(this.refs.nameInput).value.trim();
        Meteor.call('campaigns.insert', name);
        ReactDOM.findDOMNode(this.refs.nameInput).value = '';
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
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <input
                            type="text"
                            ref="nameInput"
                            placeholder="Add new campaign"
                        />
                    </form>
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
