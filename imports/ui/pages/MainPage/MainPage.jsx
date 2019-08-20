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

import {
    Header,
    Container,
    Menu,
    Segment
} from 'semantic-ui-react'

export default class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logout: false
        };
    }

    handleLogout = () => {
        this.setState(() => ({
            register: true
        }))
    }

    render() {
        let user = this.props.currentUser;
        let username = '';

        if (user) {
            username = this.props.currentUser.username;
        }
        if (this.state.logout === true) return <Redirect to='/home'/>

        return (
            <div>
                <Menu fixed='left' pointing vertical inverted color='blue'>
                    <Container style={{ paddingTop: '4em' }}>
                        <Menu.Item>
                            <Header as='h1' color='orange'
                                    style={{
                                        fontSize: '2em',
                                        letterSpacing: '1.5px' }}>
                                Welcome {username}
                            </Header>
                        </Menu.Item>
                        <Menu.Item>
                            <Link to="/home">CAMPAIGNS</Link>
                        </Menu.Item>
                        <Menu.Item>
                            <Link to="/home/profile">PROFILE</Link>
                        </Menu.Item>
                    </Container>
                </Menu>
                <Segment style={{ padding: '7em', paddingLeft: '20em', backgroundColor: '#F9FFFF'}} vertical>
                    { user ?
                        <Switch>
                            <Route
                                exact path="/home"
                                render={(props) => <CampaignList {...props} campaigns={this.props.campaigns}/>}
                            />
                            <Route path="/home/profile" component={Profile}/>
                            <Route
                              path="/home/new"
                              render={(props) => <AddCampaign {...props} history={history} currentUser={this.props.currentUser} />}
                            />
                            <Route
                                path="/home/:id"
                                render={(props) => <CampaignPage {...props} campaigns={campaigns}/>}
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
    campaigns: PropTypes.array,
}
