import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withHistory, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import CampaignList from '../pages/CampaignList.jsx';
import CampaignPage from '../pages/CampaignPage.jsx';
import Profile from '../pages/Profile.jsx';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


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
                        <Route
                            exact path="/home"
                            render={(props) => <CampaignList {...props} campaigns={this.props.campaigns}/>}
                        />
                        <Route path="/home/profile" component={Profile}/>
                        <Route
                            path="/home/:id"
                            render={(props) => <CampaignPage {...props} campaigns={this.props.campaigns}/>}
                        />
                    </Switch>
                </div>
            </div>
        );
    }
}

MainPage.propTypes = {
    username: PropTypes.string
}
