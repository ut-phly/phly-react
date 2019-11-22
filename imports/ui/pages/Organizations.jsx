import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router-dom';
import { Organizations } from '../../api/organizations.js';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import {
    Header,
    Responsive,
    Segment,
    Button,
    Icon,
    Label,
    Card,
    Modal
} from 'semantic-ui-react';

export default class MyOrganizations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            new: false,
        };
    }

    handleNew = () => {
        this.setState(() => ({
            new: true
        }))
    }

    handleDelete = () => {
        Meteor.call('organizations.delete', this.props.org, this.props.currentUser._id);
    }

    render() {
        if (this.state.new === true) return <Redirect to='/home/neworg'/>

        let user = this.props.currentUser;
        let username = '';
        if (user) username = user.username;
        let self = this;

        let orgs = [];
        this.props.orgs.forEach(function(org) {

            const ShareModal = () => (
              <Modal trigger={<Button floated='right'><Icon name='plus'/>Members</Button>} size='small'>
                <Header icon='plus' content='Add Members to your Org' />
                <Modal.Content>
                  <p>
                    Your share code is: {org.share}
                  </p>
                </Modal.Content>
                <Modal.Actions>
                  <CopyToClipboard text={org.share}>
                    <Button color='green' inverted>
                      <Icon name='copy'/> Copy
                    </Button>
                  </CopyToClipboard>
                </Modal.Actions>
              </Modal>
            )

            let admin = (user._id === org.owner) ? (
              <div>
                <Label floated='left' size='mini' style={{ margin: '.3em' }}><Icon name='star'/>admin</Label>
                <Button icon='trash' floated='right' onClick={self.handleDelete}/>
                <ShareModal/>
              </div>
            ) : (
              <Button icon='trash' floated='right' onClick={self.handleDelete}/>
            );
            let header = (
              <Header floated='left' color='blue' style={{ fontSize: '1.5em', margin: '.3em' }}>{org.name}</Header>
            );
            orgs.push({
                fluid: true,
                header: header,
                key: org._id,
                meta: admin
            });
        });

        return(
            <Responsive>
                <Segment style={{ backgroundColor: '#F9FFFF', margin: 0 }} basic clearing>
                    <Header as='h1'
                            floated='left'
                            color='orange'
                            style={{
                                  fontSize: '2em',
                                  letterSpacing: '1.5px' }}>
                      My Organizations
                    </Header>
                    <Button onClick={this.handleNew} color='orange' floated='right'>
                        <Icon name='plus'/>
                        New
                    </Button>
                </Segment>
                <Segment style={{ backgroundColor: '#F9FFFF', margin: 0 }} basic>
                    <p style={{ fontWeight: 'bold' }}>My Organizations</p>
                    <Card.Group items={orgs}/>
                </Segment>
            </Responsive>
        )
    }
}
