import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router-dom';
import { Organizations } from '../../api/organizations.js';

import {
    Header,
    Responsive,
    Segment,
    Button,
    Icon
} from 'semantic-ui-react';

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            new: false
        };
    }

    handleNew = () => {
        this.setState(() => ({
            new: true
        }))
    }

    render() {
        if (this.state.new === true) return <Redirect to='/home/neworg'/>

        let org = Organizations.findOne({ _id: this.props.org });
        console.log(org);
        let shareId = '';
        let name = '';
        if (org) {
            shareId = org.share;
            name = org.name;
        }

        return(
            <Responsive>
                <Segment style={{ backgroundColor: '#F9FFFF', margin: 0 }} basic clearing>
                    <Header as='h1'
                            floated='left'
                            color='orange'
                            style={{
                                  fontSize: '2em',
                                  letterSpacing: '1.5px' }}>
                      {name}
                    </Header>
                    <Button onClick={this.handleNew} color='orange' floated='right'>
                        <Icon name='plus'/>
                        New
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
