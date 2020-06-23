import { Meteor } from 'meteor/meteor';

import React, { Component } from 'react';
import { withHistory, Link } from 'react-router-dom';
import MainContainer from './MainContainer.jsx';
import MainPage from '../pages/MainPage/MainPage.jsx';

import {
    Menu,
    Container,
    Button,
    Grid,
    Header
} from 'semantic-ui-react';

export default class AppContainer extends Component {
    constructor(props) {
        super(props);
        const user = Meteor.user();
        const auth =  Meteor.userId() !== null;

        this.state = {
            isAuthenticated: auth,
            currentUser: user
        };
    }

    componentDidMount(){
        if (!this.state.isAuthenticated) {
            this.props.history.push('/login');
        }
    }

    componentDidUpdate(prevProps, prevState){
        if (!this.state.isAuthenticated) {
            this.props.history.push('/login');
        }
    }

    render(){

        return (
            <div>
                <MainContainer history={this.props.history}/>
            </div>
        );
    }
}
