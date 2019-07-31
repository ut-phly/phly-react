import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withHistory, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Campaigns } from '../../../api/campaigns.js';


import CampaignPage from '../../pages/CampaignPage.jsx';
import Profile from '../../pages/Profile.jsx';
import AddCampaign from '../../pages/AddCampaign.jsx';
import CampaignList from './CampaignList.jsx';


export default class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: ''
        };
    }

    render() {
        let currentUser = this.props.currentUser;
        let userDataAvailable = (currentUser !== undefined);
        let loggedIn = (currentUser && userDataAvailable);

        return (
            <div>
                <div className="card mb-3">
                    <h2 className="card-header">
                        { loggedIn ? 'Welcome ' + currentUser.username : '' }
                    </h2>
                    <Switch>
                        <Route path="/home/profile" component={Profile}/>
                        <Route
                          path="/home/addCampaign"
                          render={(props) => <AddCampaign {...props} history={history} currentUser={this.props.currentUser} />}
                        />
                        <Route
                            path="/home/:id"
                            render={(props) => <CampaignPage {...props} campaigns={this.props.campaigns}/>}
                        />
                    </Switch>
                </div>
                <CampaignList
                  campaigns={this.props.campaigns}
                />
            </div>
        );
    }
}

MainPage.propTypes = {
    currentUser: PropTypes.object,
    campaigns: PropTypes.array,
}
