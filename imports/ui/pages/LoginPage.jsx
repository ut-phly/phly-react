import React, { Component } from 'react';
import { withHistory, Link } from 'react-router-dom';
import { createContainer } from 'meteor/react-meteor-data';

export default class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        let email = document.getElementById('login-email').value;
        let password = document.getElementById('login-password').value;
        Meteor.loginWithPassword(email, password, (err) => {
            if (err) {
                this.setState({
                    error: err.reason
                });
            } else {
                this.props.history.push('/');
            }
        });
    }

    render() {
        const error = this.state.error;
        return (
            <div>
                <div>
                    <div>
                        <div>
                            <h1>Login</h1>
                        </div>
                        <div>
                            { error.length > 0 ?
                                <div>{error}</div>
                                : '' }
                            <form id="login-form"
                                onSubmit={this.handleSubmit}>
                                <div>
                                    <input type="email"
                                        id="login-email"
                                        placeholder="email"/>
                                </div>
                                <div>
                                    <input type="password"
                                        id="login-password"
                                        placeholder="password"/>
                                </div>
                                <div>
                                    <input type="submit"
                                        id="login-button"
                                        value="Login"/>
                                </div>
                                <div>
                                    <p>
                                        Don't have an account? Register <Link to="/register">here</Link>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
