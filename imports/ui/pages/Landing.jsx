import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withHistory, Link } from 'react-router-dom';

import {
    Responsive,
    Menu,
    Container,
    Button,
    Segment,
    Grid,
    Header,
    Icon
} from 'semantic-ui-react';


export default class Landing extends Component {
    render() {
        let loggedIn = (Meteor.user() === null) ? false : true;
        if (loggedIn) this.props.history.push('/home');

        return(
            <div>

                <Menu fixed='top' inverted color='blue'>
                    <Container>
                        <Menu.Item header
                                    style={{
                                        fontFamily: 'Nunito',
                                        fontSize: '1.2em',
                                        letterSpacing: '2px'}}>
                                PHLY</Menu.Item>
                        <Menu.Item position='right'>
                            <Button inverted>Login</Button>
                            <Button style={{ marginLeft: '1.5em' }}>Sign Up</Button>
                        </Menu.Item>
                    </Container>
                </Menu>

                <Responsive>
                    <Segment style={{ padding: '7.5em'}} vertical>
                        <Grid container stackable verticalAlign='middle'>
                            <Grid.Row>
                                <Grid.Column width={12}>
                                    <Header as='h1'
                                            color='orange'
                                            style={{
                                                fontSize: '3.5em',
                                                letterSpacing: '1.5px' }}>
                                        Fundraise the right way
                                    </Header>
                                    <p style={{
                                            fontSize: '1.66em',
                                            color: '#2E5266',
                                            letterSpacing: '.5px'}}>
                                        Phly makes fundraising easier and safer
                                        for student organizations
                                    </p>
                                    <Button size='big' color='orange'>
                                        Get Started
                                        <Icon name='right arrow'/>
                                    </Button>

                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Segment>

                    <Segment inverted vertical
                            color='blue'
                            style={{ padding: '7.5em' }}>
                        <Grid container stackable verticalAlign='middle' columns='equal'>
                            <Grid.Row>
                            <Header as='h1'
                                    color='orange'
                                    style={{
                                        fontSize: '3.5em',
                                        letterSpacing: '1.5px' }}>
                                How we can help you
                            </Header>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column textAlign='center'>
                                    <Icon name='circle' style={{ paddingBottom: '1.5em' }} size='massive'/>
                                    <p style={{ fontSize:'1.33em' }}>
                                        Easily collect donations from students through
                                        our integrations with Venmo, Cashapp, Paypal + More
                                    </p>
                                </Grid.Column>
                                <Grid.Column textAlign='center'>
                                    <Icon name='circle' style={{ paddingBottom: '1.5em' }} size='massive'/>
                                    <p style={{ fontSize:'1.33em' }}>
                                        Phly sends all donations directly to your nonprofit
                                        partner, automatically and hassle free
                                    </p>
                                </Grid.Column>
                                <Grid.Column textAlign='center'>
                                    <Icon name='circle' style={{ paddingBottom: '1.5em' }} size='massive'/>
                                    <p style={{ fontSize:'1.33em' }}>
                                        The Phly Dashboard helps you track all of your
                                        fundraising campaigns, all the time
                                    </p>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Segment>
                </Responsive>
            </div>
        )
    }
}
