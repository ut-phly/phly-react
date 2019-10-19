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
            org: ''
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

    handleChangeOrg = (e, { value }) => {
        if (value === 'neworg') this.props.history.push('/home/neworg');
        this.setState({ org: value })
    }

    handleSetOrg = (id) => this.setState({ org: id })

    render() {
        let user = this.props.currentUser;
        let username = '';

        if (user) {
            username = this.props.currentUser.username;
        }

        let organizations = [];
        this.props.organizations.forEach(function(org) {
            organizations.push({ text: org.name, value: org._id, key: org._id });
        });

        let campaigns = [];
        if (this.state.org) {
            this.props.campaigns.filter(camp => camp.owner == this.state.org).forEach(camp => campaigns.push(camp));
        }

        if (this.state.logout === true) return <Redirect to="/login"/>

        return (
            <div>
                <Menu fixed='left' pointing vertical inverted color='blue'>
                    <Container style={{ paddingTop: '1em' }}>
                        <Image style={{ height: '4em', width: '4em', marginBottom: '1em', marginTop: '1em' }} centered src='/images/logo.png'/>
                        <Menu.Item>
                            <Dropdown
                                as='h3'
                                style={{ color: '#FF8E56', letterSpacing: '1px' }}
                                id='dropdown'
                                fluid
                                value={this.state.org}
                                options={organizations}
                                onChange={this.handleChangeOrg}
                            />
                        </Menu.Item>
                        <Menu.Item as={ Link } name='campaigns' to="/home">
                            <Icon name="handshake outline"/>
                            Campaigns
                        </Menu.Item>
                        <Menu.Item as={ Link } name='profile' to="/home/profile">
                            <Icon name="user circle outline"/>
                            Profile
                        </Menu.Item>
                        <Menu.Item position='right'>
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
                                render={(props) => <Profile {...props} org={this.state.org}/>}
                            />
                            <Route
                              path="/home/new"
                              render={(props) => <AddCampaign {...props} history={this.history} currentUser={this.props.currentUser} org={this.state.org}/>}
                            />
                            <Route
                                path="/home/neworg"
                                render={(props) => <AddOrg {...props} history={this.history} action={this.handleReset}/>}
                            />
                            <Route
                                path="/home/:id"
                                render={(props) => <CampaignPage {...props} campaigns={this.props.campaigns}/>}
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
    organizations: PropTypes.array.isRequired
}
