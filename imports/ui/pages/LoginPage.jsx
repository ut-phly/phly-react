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
                this.props.history.push('/home');
            }
        });
    }

    render() {
        const error = this.state.error;
        return (
            <div className="card mb-3">
                <div className="card-header">
                    <h1>Login</h1>
                </div>
                <div className="card-body">
                    { error.length > 0 ?
                        <div>{error}</div>
                        : '' }
                    <form id="login-form" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="email"
                                id="login-email"
                                placeholder="email"/>
                        </div>
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="password"
                                id="login-password"
                                placeholder="password"/>
                        </div>
                        <div className="form-group">
                            <input
                                className="btn btn-primary"
                                type="submit"
                                id="login-button"
                                value="Login"/>
                            <small className="form-text text-muted">
                                Don't have an account? Register <Link to="/register">here</Link>
                            </small>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
