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

import { Campaigns } from '../../api/campaigns.js';

export default class AddCampaign extends Component {
    constructor(props) {
        super(props);
        this.state = {
            created: false,
            campaign: null
        };

    }

    // handleChange(event) {
    //   this.setState({ value: event.target.value });
    // }

    handleSubmit = (e) => {
        e.preventDefault();
        let name = document.getElementById('campaign-name').value;
        let username = Meteor.user().username;
        let date = new Date();
        let owner= Meteor.userId();
        this.state.campaign = {
            name: name,
            owner: owner,
            username: username,
            date: date
        };
        Meteor.call('campaigns.insert', this.state.campaign);
        this.setState(() => ({
          created: true
        }));
    }

    render() {

        if (this.state.created === true) return <Redirect to={`/home/${this.state.campaign._id}`}/>

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
                                Add New Campaign
                            </Header>
                            <Form>
                                <Form.Field>
                                    <input
                                        type="text"
                                        id="campaign-name"
                                        placeholder="Name"/>
                                </Form.Field>
                                <Button onClick={this.handleSubmit} color='orange' type='submit'>Submit</Button>
                            </Form>
                        </Grid.Column>
                    </Grid>
                </Segment>
            </Responsive>
        );
    }
}

//export default withRouter(AddCampaign);
AddCampaign.propTypes = {
    history: PropTypes.object,
    currentUser: PropTypes.object,
}
