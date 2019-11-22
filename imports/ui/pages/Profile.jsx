import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router-dom';
import { Organizations } from '../../api/organizations.js';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import {
    Header,
    Responsive,
    Segment,
    Button,
    Icon,
    Label,
    Card,
    Modal
} from 'semantic-ui-react';

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            new: false,
            logout: false
        };
    }

    handleNew = () => {
        this.setState(() => ({
            new: true
        }))
    }

    handleDelete = () => {
        Meteor.call('organizations.delete', this.props.org, this.props.currentUser._id);
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

    render() {
        if (this.state.new === true) return <Redirect to='/home/neworg'/>
        if (this.state.logout === true) return <Redirect to='/login'/>

        let user = this.props.currentUser;
        let username = '';
        if (user) {
          if (user.profile.name) username = user.profile.name;
          else username = user.username;
        }
        let self = this;

        return(
            <Responsive>
                <Segment style={{ backgroundColor: '#F9FFFF', margin: 0 }} basic clearing>
                    <Header as='h1'
                            floated='left'
                            color='orange'
                            style={{
                                  fontSize: '2em',
                                  letterSpacing: '1.5px' }}>
                      Profile
                    </Header>
                    <Button onClick={this.handleLogout} color='orange' floated='right'>
                        Logout
                    </Button>
                </Segment>

                <Segment style={{ backgroundColor: '#F9FFFF', margin: 0 }} basic>
                    <p style={{ fontWeight: 'bold' }}>Hello {username}!</p>
                </Segment>
            </Responsive>
        )
    }
}
