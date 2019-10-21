import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import {
    Header,
    Responsive,
    Segment
} from 'semantic-ui-react';

export default class Profile extends Component {
    render() {
        return(
            <Responsive>
                <Segment style={{ backgroundColor: '#F9FFFF'}} vertical clearing>
                    <Header as='h1'
                            floated='left'
                            color='orange'
                            style={{
                                  fontSize: '2em',
                                  letterSpacing: '1.5px' }}>
                      Profile
                    </Header>
                </Segment>
            </Responsive>
        )
    }
}
