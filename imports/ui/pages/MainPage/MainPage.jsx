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

import {
  Modal,
  Pagination,
  PaginationItem,
  PaginationLink
} from 'reactstrap';


export default class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logout: false,
            intro: false
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

    toggle = () => {
      this.setState({ intro: !this.state.intro });
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

              <Modal
                className="modal-dialog-centered"
                isOpen={this.state.intro}
                toggle={() => this.toggle()}
                size="lg"
              >
                <div className="modal-header">
                  <h2 className="modal-title ml-3 mt-3" id="modal-title-notification">
                    Phly Basics
                  </h2>
                  <button
                    aria-label="Close"
                    className="close"
                    data-dismiss="modal"
                    type="button"
                    onClick={() => this.toggle()}
                  >
                    <span aria-hidden={true}>×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="pb-3 text-center">
                    <p className="lead">Dashboard Analytics</p>
                    <img
                      alt="..."
                      className="img-fluid"
                      src="/images/custom/analytics.gif"
                    />
                  <Pagination
                    className="pagination justify-content-center mt-3"
                    listClassName="justify-content-center"
                  >
                      <PaginationItem className="active">
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          1
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#pablo" onClick={e => e.preventDefault()}>
                          2
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#pablo" onClick={e => e.preventDefault()}>
                          3
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#pablo" onClick={e => e.preventDefault()}>
                          4
                        </PaginationLink>
                      </PaginationItem>
                    </Pagination>
                  </div>
                </div>
              </Modal>

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
