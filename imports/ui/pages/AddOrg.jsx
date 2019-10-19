import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withHistory, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import {
    Button,
    Form,
    Responsive,
    Segment,
    Grid,
    Header,
    Divider
} from 'semantic-ui-react';

export default class AddOrg extends Component {
    constructor(props) {
        super(props);
        this.state = {
            created: false,
            org: null
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let name = document.getElementById('org-name').value;
        let owner = Meteor.userId();
        this.state.org = {
            name: name,
            owner: owner
        };
        Meteor.call('organizations.insert', this.state.org);
        this.setState(() => ({
          created: true
        }));
    }

    handleJoin = (e) => {
        e.preventDefault();
        let code = document.getElementById('join-code').value;
        let user = Meteor.userId();
        Meteor.call('organizations.join', code, user);
        this.setState(() => ({
            created: true
        }));
    }

    render() {
        if (this.state.created === true) return <Redirect to="/home"/>

        return (
            <Responsive>
                <Segment style={{ backgroundColor: '#F9FFFF'}} basic>
                    <Header as='h1'
                            color='orange'
                            style={{
                                fontSize: '2em',
                                letterSpacing: '1.5px' }}>
                        Add New Organization
                    </Header>
                </Segment>
                <Segment style={{ backgroundColor: '#F9FFFF'}} basic>
                    <Grid columns={2} stackable>
                        <Grid.Column>
                            <Form noValidate style={{ padding: '2em' }}>
                                <Form.Field>
                                    <input
                                        type="text"
                                        id="org-name"
                                        placeholder="Name"/>
                                </Form.Field>
                                <Button onClick={this.handleSubmit} color='orange' type='submit'>Create</Button>
                            </Form>
                        </Grid.Column>
                        <Grid.Column>
                            <Form noValidate style={{ padding: '2em' }}>
                                <Form.Field>
                                    <input
                                        type="text"
                                        id="join-code"
                                        placeholder="Join Code"/>
                                </Form.Field>
                                <Button onClick={this.handleJoin} color='blue' type='submit'>Join</Button>
                            </Form>
                        </Grid.Column>
                    </Grid>
                    <Divider vertical>Or</Divider>
                </Segment>
            </Responsive>
        )
    }
}
