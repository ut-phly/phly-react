import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withHistory, Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import routes from './routes.js';

import Sidebar from '../../components/Sidebar.jsx';
import AdminNavbar from '../../components/AdminNavbar.jsx';
import CampaignPage from '../../pages/CampaignPage.jsx';
import Profile from '../../pages/Profile.jsx';
import AddCampaign from '../AddCampaign.jsx';
import AddOrg from '../AddOrg.jsx'
import Campaigns from '../Campaigns.jsx';
import MyOrganizations from '../../pages/Organizations.jsx';


export default class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logout: false,
        };
    }

    handleLogout = () => {
        Meteor.logout( (err) => {
            if (err) {
                console.log( err.reason );
            } else {
                this.setState(() => ({
                    logout: true
                }));
            }
        });
    }

    handleChangeOrg = (key) => {
      console.log(key);
      Meteor.call('organizations.save', key, this.props.currentUser._id);
    }

    render() {
        let user = this.props.currentUser;
        let org = (user) ? user.org : '';

        let organizations = [];
        this.props.organizations.forEach(function(org) {
            organizations.push({ text: org.name, value: org._id, key: org._id });
        });

        let current = (org) ? organizations.find(o => o.key === org).text : '';

        let campaigns = [];
        let donations = [];
        if (org) {
            this.props.campaigns.filter(camp => camp.owner == org).forEach(camp => campaigns.push(camp));
            this.props.donations.filter((don) => campaigns.some(camp => camp._id == don.campaign)).forEach(don => donations.push(don));
        }

        if (this.state.logout === true) return <Redirect to="/login"/>

        return (
            <div>
              <Sidebar
                routes={routes}
                logo={{
                  innerLink: "/home",
                  imgSrc: "/images/phly-color.png",
                  imgAlt: "..."
                }}
              />

              <div className="main-content" ref="mainContent">
                <AdminNavbar
                  current={current}
                  orgs={organizations}
                  handleChange={this.handleChangeOrg}
                />
                { user ?
                    <Switch>
                        <Route
                            exact path="/home"
                            render={(props) => <Campaigns {...props} campaigns={campaigns} donations={donations}/>}
                        />
                        <Route
                            path="/home/profile"
                            render={(props) => <Profile {...props} currentUser={this.props.currentUser}/>}
                        />
                        <Route
                            path="/home/orgs"
                            render={(props) => <MyOrganizations  {...props} orgs={this.props.organizations} user={this.props.currentUser}/>}
                        />
                        <Route
                          path="/home/new"
                          render={(props) => <AddCampaign {...props} history={this.history} currentUser={this.props.currentUser} org={org}/>}
                        />
                        <Route
                            path="/home/neworg"
                            render={(props) => <AddOrg {...props} history={this.history}/>}
                        />
                        <Route
                            path="/home/:id"
                            render={(props) => <CampaignPage {...props} campaigns={campaigns} donations={donations}/>}
                        />
                    </Switch>
                    : ''
                }
              </div>
            </div>
        );
    }
}

MainPage.propTypes = {
    currentUser: PropTypes.object,
    campaigns: PropTypes.array.isRequired,
    organizations: PropTypes.array.isRequired,
    donations: PropTypes.array.isRequired
}
