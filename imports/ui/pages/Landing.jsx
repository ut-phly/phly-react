import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withHistory, Link } from 'react-router-dom';

import {
    Menu,
    Container,
    Button,
    Segment,
    Grid,
    Header
} from 'semantic-ui-react';


export default class Landing extends Component {
    render() {
        let loggedIn = (Meteor.user() === null) ? false : true;
        if (loggedIn) this.props.history.push('/home');

        return(
            <div className="card mb-3">

                <Menu fixed='top' inverted>
                    <Container>
                        <Menu.Item header>PHLY</Menu.Item>
                        <Menu.Item position='right'>
                            <Button inverted>Login</Button>
                            <Button style={{ marginLeft: '1.5em' }}>Sign Up</Button>
                        </Menu.Item>
                    </Container>
                </Menu>

                <Segment style={{ padding: '7em'}}>
                    <Grid container stackable verticalAlign='middle'>
                        <Grid.Row>
                            <Grid.Column width={8}>
                                <Header as='h3' style={{ fontSize: '2em' }}>
                                    Fundraise the right way
                                </Header>
                                <p style={{ fontSize: '1.33em' }}>
                                    Phly makes fundraising easier and safer
                                    for student organizations
                                </p>
                                <Button size='huge'>Get Started</Button>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>

            </div>
        )
    }
}
