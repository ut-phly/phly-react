import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import {
    Header,
    Responsive,
    Segment,
    Button
} from 'semantic-ui-react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

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
                    <Button onClick={this.handleNew} color='orange' floated='right'>
                        <FontAwesomeIcon icon={faPlus}/>
                        {'  New'}
                    </Button>
                </Segment>
                <Segment style={{ backgroundColor: '#F9FFFF', margin: 0 }} basic>
                    { this.props.org ?
                        <p>Share code: {shareId}</p>
                        : <p>Select an org</p>
                    }
                </Segment>
            </Responsive>
        )
    }
}
