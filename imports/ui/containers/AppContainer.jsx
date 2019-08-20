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
        this.logout = this.logout.bind(this);
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
                <MainContainer />
                <Menu fixed='top' inverted color='blue'>
                    <Container>
                        <Menu.Item header
                                    style={{
                                        fontFamily: 'Nunito',
                                        fontSize: '1.2em',
                                        letterSpacing: '2px'}}>
                                PHLY</Menu.Item>
                        <Menu.Item position='right'>
                            <Button onClick={this.logout} style={{ marginLeft: '1.5em' }}>Logout</Button>
                        </Menu.Item>
                    </Container>
                </Menu>
            </div>
        );
    }
}
