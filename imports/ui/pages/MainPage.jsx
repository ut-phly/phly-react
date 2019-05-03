import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withHistory, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import CampaignList from '../pages/CampaignList.jsx';
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
                <div className="container">
                    <h1>
                        { loggedIn ? 'Welcome ' + currentUser.username : '' }
                    </h1>

                    <Switch>
                        <Route
                            exact path="/home"
                            render={(props) => <CampaignList {...props} campaigns={this.props.campaigns}/>}
                        />
                        <Route path="/home/profile" component={Profile}/>
                    </Switch>
                </div>
            </div>
        );
    }
}

MainPage.propTypes = {
    username: PropTypes.string
}
