import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withHistory, Link } from 'react-router-dom';


export default class Landing extends Component {
    render() {
        return(
            <div>
                <h1>Welcome to Phly</h1>
                <p>Login <Link to="login">here</Link></p>
            </div>
        )
    }
}
