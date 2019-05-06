import React, { Component } from 'react';
import { withHistory, Link } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';

export default class RegisterPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
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
                this.props.history.push('/home');
            }
        });
    }

    render() {
        const error = this.state.error;
        return (
            <div className="card mb-3">
                <div className="card-header">
                    <h1>Register</h1>
                </div>
                <div className="card-body">
                    { error.length > 0 ?
                        <div>{error}</div>
                        : '' }
                    <form id="login-form"
                        onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="text"
                                id="register-username"
                                placeholder="username"/>
                        </div>
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="email"
                                id="register-email"
                                placeholder="email"/>
                        </div>
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="password"
                                id="register-password"
                                placeholder="password"/>
                        </div>
                        <div className="form-group">
                            <input
                                className="btn btn-primary"
                                type="submit"
                                id="login-button"
                                value="Login"/>
                            <small className="form-text text-muted">
                                Already have an account? Login <Link to="/login">here</Link>
                            </small>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
