import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withHistory, Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Campaigns } from '../../../api/campaigns.js';


import CampaignPage from '../../pages/CampaignPage.jsx';
import Profile from '../../pages/Profile.jsx';
import AddCampaign from '../AddCampaign.jsx';
import AddOrg from '../AddOrg.jsx'
import CampaignList from './CampaignList.jsx';
import MyOrganizations from '../../pages/Organizations.jsx';

import {
    Header,
    Container,
    Menu,
    Segment,
    Button,
    Icon,
    Dropdown,
    Image
} from 'semantic-ui-react'

export default class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logout: false,
            page: ''
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

    handlePageClick = (e, { name }) => this.setState({ page: name })

    handleChangeOrg = (e, { value }) => {
        Meteor.call('organizations.save', value, this.props.currentUser._id);
    }

    render() {
        let user = this.props.currentUser;
        let org = (user) ? user.org : '';

        let organizations = [];
        this.props.organizations.forEach(function(org) {
            organizations.push({ text: org.name, value: org._id, key: org._id });
        });

        let campaigns = [];
        if (org) {
            this.props.campaigns.filter(camp => camp.owner == org).forEach(camp => campaigns.push(camp));
        }

        if (this.state.logout === true) return <Redirect to="/login"/>

        return (
            <div>
                <Menu fixed='left' vertical inverted secondary color='blue'>
                    <Container style={{ paddingTop: '1em' }}>
                        <Image style={{ height: '4em', width: '4em', marginBottom: '1em', marginTop: '1em' }} centered src='/images/logo.png'/>
                        <Menu.Item>
                            <Dropdown
                                as='h3'
                                style={{ color: '#FF8E56', letterSpacing: '1px' }}
                                id='dropdown'
                                pointing='left'
                                fluid
                                icon='angle down'
                                value={org}
                                options={organizations}
                                onChange={this.handleChangeOrg}
                            />
                        </Menu.Item>
                        <Menu.Item as={ Link } name='campaigns' to="/home" active={this.state.page === 'campaigns'} onClick={this.handlePageClick}>
                            <Icon name="handshake outline"/>
                            Campaigns
                        </Menu.Item>
                        <Menu.Item as={ Link } to="/home/orgs" name='organizations' style={{ marginTop: '.5em' }} active={this.state.page === 'organizations'}
                            onClick={this.handlePageClick}>
                            <Icon name ="users"/>
                            Organizations
                        </Menu.Item>
                        <Menu.Item as={ Link } name='profile' to="/home/profile" active={this.state.page === 'profile'}
                            style={{ marginTop: '.5em' }} onClick={this.handlePageClick}>
                            <Icon name="user circle"/>
                            Profile
                        </Menu.Item>
                        <Menu.Item>
                            <Button onClick={this.handleLogout}>Logout</Button>
                        </Menu.Item>
                    </Container>
                </Menu>
                <Segment style={{ padding: '3em', paddingLeft: '18em', backgroundColor: '#F9FFFF'}} vertical>
                    { user ?
                        <Switch>
                            <Route
                                exact path="/home"
                                render={(props) => <CampaignList {...props} campaigns={campaigns}/>}
                            />
                            <Route
                                path="/home/profile"
                                render={(props) => <Profile {...props} currentUser={this.props.currentUser}/>}
                            />
                            <Route
                                path="/home/orgs"
                                render={(props) => <MyOrganizations  {...props} orgs={this.props.organizations} currentUser={this.props.currentUser}/>}
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
                                render={(props) => <CampaignPage {...props} campaigns={this.props.campaigns} donations={this.props.donations}/>}
                            />
                        </Switch>
                        : ''
                    }
                </Segment>
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
