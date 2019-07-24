import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withHistory, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import CampaignPage from '../pages/CampaignPage.jsx';
import Profile from '../pages/Profile.jsx';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { CampaignList } from '../pages/campaignlist.jsx';
import { List } from 'material-ui/List';


export default class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: ''
        };
    }

    getCampaigns() {
      return [
        {
          _id: 1,
          name: trial1,
        },
        {
          _id: 2,
          name: trial2,
        },
        {
          _id: 3,
          name: trial3,
        },
      ]
    }

    renderCampaigns() {
      return this.getCampaigns().map((campaign) => (
        <CampaignList key={campaign._id} name={campaign}/>
      ))
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
                          path="/home/:id"
                          render={(props) => <CampaignPage {...props} campaigns={this.props.campaigns}/>}
                      />
                  </Switch>
              </div>
              <div className="card-body">
                <List>
                  {this.renderCampaigns()}
                </List>
              </div>
          </div>
      );
    }
}

MainPage.propTypes = {
    username: PropTypes.string
}
