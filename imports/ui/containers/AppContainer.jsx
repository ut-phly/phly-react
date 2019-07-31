import React, { Component } from 'react';
import { withHistory, Link } from 'react-router-dom';
import MainContainer from './MainContainer.jsx';
import MainPage from '../pages/MainPage/MainPage.jsx';

export default class AppContainer extends Component {
    constructor(props) {
        super(props);
        this.state = this.getMeteorData();
        this.logout = this.logout.bind(this);
    }

    getMeteorData(){
        return { isAuthenticated: Meteor.userId() !== null };
    }

    componentWillMount(){
        if (!this.state.isAuthenticated) {
            this.props.history.push('/login');
        }
    }

    componentDidUpdate(prevProps, prevState){
        if (!this.state.isAuthenticated) {
            this.props.history.push('/login');
        }
    }

    logout(e){
        e.preventDefault();
        Meteor.logout( (err) => {
            if (err) {
                console.log( err.reason );
            } else {
                this.props.history.push('/login');
            }
        });
    }

    render(){
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <a className="navbar-brand" href="/home">Phly</a>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav">
                            <li className="navbar-item">
                                <a className="nav-link" href="#" onClick={this.logout}>Logout</a>
                            </li>
                            <li className="navbar-item"><Link className="nav-link" to="/home">Campaigns</Link></li>
                            <li className="navbar-item"><Link className="nav-link" to="/home/profile">Profile</Link></li>
                        </ul>
                    </div>
                </nav>
                <MainContainer />
            </div>
        );
    }
}
