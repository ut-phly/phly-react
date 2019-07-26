import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withHistory, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import CampaignPage from '../pages/CampaignPage.jsx';
import Profile from '../pages/Profile.jsx';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import AddCampaign from './AddCampaign.jsx';
import CampaignListBox from './CampaignListBox.jsx';
import CampaignList from '../pages/campaignlist.jsx';
import List from 'material-ui/List';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { createContainer } from 'meteor/react-meteor-data';

export default class MainPage extends Component {
    constructor(props) {
        super(props);
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
                        render={(props) => <AddCampaign {...props} history={history}/>}
                      />
                  </Switch>
              </div>
              <div className="card-body">
                <CampaignListBox/>
              </div>
          </div>
      );
    }
}

MainPage.propTypes = {
    username: PropTypes.string
}
