import React, { Component } from 'react';
import { withHistory, Link, Redirect } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';

import {
    Menu,
    Container,
    Button,
    Grid,
    Header,
    Responsive,
    Segment,
    Form,
    Image
} from 'semantic-ui-react';

export default class RegisterPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            login: false,
            return: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleLogin = () => {
        this.setState(() => ({
            login: true
        }))
    }

    handleReturn = () => {
        this.setState(() => ({
            return: true
        }))
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let username = document.getElementById('register-username').value;
        let email = document.getElementById('register-email').value;
        let password = document.getElementById('register-password').value;
        this.setState({ error: "test" });
        Accounts.createUser({email: email, username: username, password: password}, (err) => {
            if (err) {
                this.setState({
                    error: err.reason
                });
            } else {
                this.props.history.push('/home/neworg');
            }
        });
    }

    render() {
        const error = this.state.error;

        if (this.state.login === true) return <Redirect to='/login'/>
        if (this.state.return === true) return <Redirect to='/'/>

        return (
            <div>
                <Menu fixed='top' secondary inverted color='blue'>
                    <Container>
                        <Menu.Item as={Link} to='/'>
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
                                    Register
                                </Header>
                                <Form>
                                    <Form.Field>
                                        <input
                                            type="text"
                                            id="register-username"
                                            placeholder="Username"/>
                                    </Form.Field>
                                    <Form.Field>
                                        <input
                                            type="email"
                                            id="register-email"
                                            placeholder="Email"/>
                                    </Form.Field>
                                    <Form.Field>
                                        <input
                                            type="password"
                                            id="register-password"
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
