import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withHistory, Link, Redirect } from 'react-router-dom';

import {
    Responsive,
    Menu,
    Container,
    Button,
    Segment,
    Grid,
    Header,
    Icon,
    Form,
    Image,
    Message,
    List
} from 'semantic-ui-react';

export default class Landing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            register: false,
            login: false,
            success: false
        };
    }

    handleLogin = () => {
        this.setState(() => ({
            login: true
        }))
    }

    handleRegister = () => {
        this.setState(() => ({
            register: true
        }))
    }

    handleSubmit = () => {
        let first = document.getElementById('first').value;
        let last = document.getElementById('last').value;
        let university = document.getElementById('university').value;
        let org = document.getElementById('org').value;
        let email = document.getElementById('email').value;

        Meteor.call('potentials.insert', {
            first: first,
            last: last,
            university: university,
            org: org,
            email: email,
        });

        this.setState({ success: true });
    }

    render() {
        let loggedIn = (Meteor.user() === null) ? false : true;
        if (loggedIn) this.props.history.push('/home');

        if (this.state.register === true) return <Redirect to='/register'/>
        if (this.state.login === true) return <Redirect to='/login'/>

        return(
            <div>
                <Menu fixed='top' inverted secondary color='blue'>
                    <Container>
                        <Menu.Item>
                                <Image style={{ height: '1.5em', width: '1.5em' }} src='/images/logo.png'/>
                                 <p style={{
                                     fontFamily: 'Nunito',
                                     fontWeight: 'bold',
                                     fontSize: '1.5em',
                                     marginLeft: '.5em',
                                     letterSpacing: '2px'}}>PHLY</p>
                        </Menu.Item>
                        <Menu.Item position='right'>
                            <Button color='blue' onClick={this.handleLogin}>Login</Button>
                            <Button onClick={this.handleRegister} style={{ marginLeft: '1em' }}>Sign Up</Button>
                        </Menu.Item>
                    </Container>
                </Menu>

                <Responsive>
                    <Segment style={{ padding: '8em',
                                      paddingTop: '12em'}}
                            vertical>
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
                                    <Button as={Link} to='/register' size='big' color='orange'>
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
                            <Grid.Row centered>
                                <Grid.Column textAlign='center' width='5'>
                                    <Icon name='money' style={{ paddingBottom: '1.5em' }} size='massive'/>
                                    <p style={{ fontSize:'1.33em' }}>
                                        Easily collect donations from students through
                                        our integrations with Venmo, Cashapp, Paypal + More
                                    </p>
                                </Grid.Column>
                                <Grid.Column textAlign='center' width='5'>
                                    <Icon name='send' style={{ paddingBottom: '1.5em' }} size='massive'/>
                                    <p style={{ fontSize:'1.33em' }}>
                                        Phly sends all donations directly to your nonprofit
                                        partner, automatically and hassle free
                                    </p>
                                </Grid.Column>
                                <Grid.Column textAlign='center' width='5'>
                                    <Icon name='line graph' style={{ paddingBottom: '1.5em' }} size='massive'/>
                                    <p style={{ fontSize:'1.33em' }}>
                                        The Phly Dashboard helps you track all of your
                                        fundraising campaigns, all the time
                                    </p>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row centered>
                                <Grid.Column textAlign='center' width='5'>
                                    <Icon name='share alternate square' style={{ paddingBottom: '1.5em' }} size='massive'/>
                                    <p style={{ fontSize:'1.33em' }}>
                                        Share your fundraising campaigns wide
                                        and far with just a few clicks
                                    </p>
                                </Grid.Column>
                                <Grid.Column textAlign='center' width='5'>
                                    <Icon name='group' style={{ paddingBottom: '1.5em' }} size='massive'/>
                                    <p style={{ fontSize:'1.33em' }}>
                                        See which members of your organization raise
                                        the most through sub campaigns
                                    </p>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Segment>

                    <Segment id='form' vertical style={{ padding: '7.5em', backgroundColor: '#F9FFFF' }}>
                        <Grid container stackable verticalAlign='middle' columns='equal'>
                            <Grid.Column>
                                <Header as='h1'
                                        color='orange'
                                        style={{
                                            fontSize: '3.5em',
                                            letterSpacing: '1.5px' }}>
                                    Want to fundraise with Phly?
                                </Header>
                                <p style={{
                                        fontSize: '1.66em',
                                        color: '#2E5266',
                                        letterSpacing: '.5px'}}>
                                    Send us your information and we will
                                    reach out to you shortly about how
                                    you can get involved in the beta product.
                                </p>
                            </Grid.Column>
                            <Grid.Column>
                                <Form onSubmit={this.handleSubmit} success>
                                    <Form.Group widths='equal'>
                                        <Form.Input fluid id='first' placeholder='First name' />
                                        <Form.Input fluid id='last' placeholder='Last name' />
                                    </Form.Group>
                                    <Form.Input placeholder='University' id='university'/>
                                    <Form.Input placeholder='Student Organization' id='org'/>
                                    <Form.Input placeholder='Email' id='email'/>
                                    <Button color='orange' type='submit'>Submit</Button>
                                    { this.state.success ?
                                        <Message
                                            success
                                            header='Form Completed'
                                            content="Thank you for your interest!"
                                        />
                                        : '' }
                                </Form>
                            </Grid.Column>
                        </Grid>
                    </Segment>

                    <Segment inverted color="blue" vertical
                                style={{ padding: '5em 0em' }}>
                        <Container textAlign='center'>
                            <Image centered size='mini' src='/images/logo.png' />
                            <List horizontal inverted divided link size='small'>
                              <List.Item as={Link} to="/policies">
                                Privacy Policy
                              </List.Item>
                              <List.Item as='a' href='#'>
                                Non-Profits
                              </List.Item>
                              <List.Item as={Link} to='/tos'>
                                Terms and Conditions
                              </List.Item>
                            </List>
                        </Container>
                    </Segment>
                </Responsive>
            </div>
        )
    }
}

// <Menu.Item position='right'>
//    <Button onClick={this.handleLogin} inverted>Login</Button>
//    <Button onClick={this.handleRegister} style={{ marginLeft: '1.5em' }}>Sign Up</Button>
//</Menu.Item>
