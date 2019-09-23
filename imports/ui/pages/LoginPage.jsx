import React, { Component } from 'react';
import { withHistory, Link, Redirect } from 'react-router-dom';
import { createContainer } from 'meteor/react-meteor-data';

import {
    Menu,
    Container,
    Button,
    Grid,
    Header,
    Responsive,
    Segment,
    Form
} from 'semantic-ui-react';

export default class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            register: false
        };
    }

    handleRegister = () => {
        this.setState(() => ({
            register: true
        }))
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let email = document.getElementById('login-email').value;
        let password = document.getElementById('login-password').value;
        Meteor.loginWithPassword(email, password, (err) => {
            if (err) {
                this.setState({
                    error: err.reason
                });
            } else {
                this.props.history.push('/home');
            }
        });
    }

    render() {
        const error = this.state.error;

        if (this.state.register === true) return <Redirect to='/register'/>

        return (
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
                            <Button onClick={this.handleRegister} style={{ marginLeft: '1.5em' }}>Sign Up</Button>
                        </Menu.Item>
                    </Container>
                </Menu>

                <Responsive>
                    <Segment style={{ padding: '8em', paddingTop: '12em', backgroundColor: '#F9FFFF'}} vertical>
                        <Grid container stackable  centered verticalAlign='middle'>
                            <Grid.Column width={8}>
                                <Header as='h1'
                                        color='orange'
                                        style={{
                                            fontSize: '3.5em',
                                            letterSpacing: '1.5px' }}>
                                    Login
                                </Header>
                                <Form>
                                    <Form.Field>
                                        <input
                                            className="form-control"
                                            type="email"
                                            id="login-email"
                                            placeholder="Email"/>
                                    </Form.Field>
                                    <Form.Field>
                                        <input
                                            className="form-control"
                                            type="password"
                                            id="login-password"
                                            placeholder="Password"/>
                                    </Form.Field>
                                    <Button onClick={this.handleSubmit} color='orange' type='submit'>Submit</Button>
                                </Form>
                            </Grid.Column>
                        </Grid>
                    </Segment>
                </Responsive>
            </div>
        );
    }
}
