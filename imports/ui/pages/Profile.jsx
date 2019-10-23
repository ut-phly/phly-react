import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router-dom';
import { Organizations } from '../../api/organizations.js';

import {
    Header,
    Responsive,
    Segment,
    Button,
    Icon,
    Label
} from 'semantic-ui-react';

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            new: false,
            deleted: false
        };
    }

    handleNew = () => {
        this.setState(() => ({
            new: true
        }))
    }

    handleDelete = () => {
        Meteor.call('organizations.delete', this.props.org);
        this.setState({ deleted: true });
    }

    render() {
        if (this.state.new === true) return <Redirect to='/home/neworg'/>
        if (this.state.deleted === true) return <Redirect to='/home'/>

        let user = this.props.currentUser;
        let org = Organizations.findOne({ _id: this.props.org });
        console.log(org);
        let shareId = '';
        let name = '';
        let admin = false;
        if (org) {
            shareId = org.share;
            name = org.name;
            if (org.owner === user._id) admin = true;
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
                    { admin ?
                        <Label icon='star' content='admin' size='mini' horizontal/>
                        : '' }
                    <Button onClick={this.handleNew} color='orange' floated='right'>
                        <Icon name='plus'/>
                        New
                    </Button>
                    { admin ? <Button icon='trash alternate outline' onClick={this.handleDelete} floated='right' color='blue'/> : '' }
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
