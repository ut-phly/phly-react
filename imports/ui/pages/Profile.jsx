import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router-dom';
import { Organizations } from '../../api/organizations.js';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import {
    Container,
    Row, Col,
    Card,
    CardHeader,
    Button
} from 'reactstrap';

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            new: false,
            logout: false
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

    handleLogout = () => {
        this.setState(() => ({
            logout: true
        }));
        Meteor.logout( (err) => {
            if (err) {
                console.log( err.reason );
            } else {

            }
        });
    }

    render() {
        if (this.state.new === true) return <Redirect to='/home/neworg'/>
        if (this.state.logout === true) return <Redirect to='/login'/>

        let user = this.props.currentUser;
        let username = '';
        if (user) {
          if (user.profile) username = user.profile.first;
          else username = user.username;
        }
        let self = this;

        return(
          <div>
            <div className="header bg-gradient-primary py-8">
              <Container fluid>
                <div className="header-body">
                  <Row>
                    <Col>
                      <Card className="card-stats mb-4 mb-xl-0 shadow">
                        <CardHeader>
                          <Row className="align-items-center">
                            <Col xs="8">
                              <div className="col">
                                <h2 className="mb-0 font-weight-bold">Hello {username}!</h2>
                              </div>
                            </Col>
                            <Col className="text-right" xs="4">
                              <Button
                                color="primary"
                                onClick={this.handleLogout}
                              >
                                Logout
                              </Button>
                            </Col>
                          </Row>
                        </CardHeader>
                      </Card>
                    </Col>
                  </Row>
                </div>
              </Container>
            </div>
          </div>
        )
    }
}
