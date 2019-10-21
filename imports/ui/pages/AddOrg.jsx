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
    Header
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
        let owner= Meteor.userId();
        this.state.org = {
            name: name,
            owner: owner
        };
        Meteor.call('organizations.insert', this.state.org);
        this.setState(() => ({
          created: true
        }));
    }

    render() {
        if (this.state.created === true) return <Redirect to="/home"/>

        return (
            <Responsive>
                <Segment style={{ backgroundColor: '#F9FFFF'}} vertical>
                    <Grid container stackable>
                        <Grid.Column width={8}>
                            <Header as='h1'
                                    color='orange'
                                    style={{
                                        fontSize: '2em',
                                        letterSpacing: '1.5px' }}>
                                Add New Organization
                            </Header>
                            <Form>
                                <Form.Field>
                                    <input
                                        type="text"
                                        id="org-name"
                                        placeholder="Name"/>
                                </Form.Field>
                                <Button onClick={this.handleSubmit} color='orange' type='submit'>Submit</Button>
                            </Form>
                        </Grid.Column>
                    </Grid>
                </Segment>
            </Responsive>
        )
    }
}
