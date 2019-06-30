import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withHistory, Link } from 'react-router-dom';


export default class Landing extends Component {
    render() {
        //let loggedIn = Meteor.user();
        //if (loggedIn !== '') this.props.history.push('/home');

        return(
            <div className="card mb-3">
                <h1 className="card-header">Welcome to Phly</h1>
                <div className="card-body">
                    <p>Login <Link to="login">here</Link></p>
                </div>
            </div>
        )
    }
}
