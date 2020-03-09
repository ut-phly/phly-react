import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withHistory, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
    Container,
    Row, Col,
    Card,
    CardBody,
    Nav,
    NavItem,
    NavLink,
    Form,
    FormGroup,
    Input,
    InputGroup,
    InputGroupText,
    InputGroupAddon,
    Button
} from 'reactstrap';

import {
  faUsers,
  faPlus,
  faArrowRight
} from '@fortawesome/free-solid-svg-icons';

export default class AddOrg extends Component {
    constructor(props) {
        super(props);
        this.state = {
            created: false,
            join: '',
            org: '',
            mode: ''
        };
    }

    handleNewOrg = (e) => {
        e.preventDefault();
        let owner = Meteor.userId();
        let org = {
            name: this.state.org,
            owner: owner
        };
        Meteor.call('organizations.insert', org, (err) => {
          if (err) {
            this.setState({
              error: err
            });
          } else {
            this.setState({ created: true });
          }
        });
    }

    handleJoin = (e) => {
        e.preventDefault();
        let user = Meteor.userId();
        Meteor.call('organizations.join', this.state.join, user, (err) => {
          if (err) {
            this.setState({
              error: err
            });
          } else {
            this.setState({ created: true });
          }
        });
    }

    toggleNavs = (e, index) => {
      e.preventDefault();
      this.setState({
        mode: index
      });
    };

    onChange = e => {
      this.setState({ [e.target.id]: e.target.value });
    };

    render() {
        if (this.state.created === true) return <Redirect to="/home"/>

        return (
          <div>
            <div className="header bg-gradient-primary py-8">
              <Container fluid>
                <div className="header-body">
                </div>
              </Container>
            </div>
            <Container className="mt--7" fluid>
              <Row className="justify-content-center row-grid">
                <Col lg="6">
                  <Card className="bg-white shadow border-0">
                    <CardBody className="px-lg-5 py-lg-5">
                      <p className="display-3 text-center">Create or Join an Org</p>
                      <div className="text-center text-error mb-3">
                        {
                          this.state.error ?
                            <small>{this.state.error}</small>
                          : ""
                        }
                      </div>
                      <Nav
                        className="nav-fill flex-column flex-sm-row py-4"
                        id="tabs-text"
                        pills
                        role="tablist"
                      >
                        <NavItem>
                          <NavLink
                            aria-selected={this.state.mode === "create"}
                            className={classnames("mb-sm-3 mb-md-0", {
                              active: this.state.mode === "create"
                            })}
                            onClick={e => this.toggleNavs(e, "create")}
                            href="#pablo"
                            role="tab"
                          >
                            Create
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            aria-selected={this.state.mode === "join"}
                            className={classnames("mb-sm-3 mb-md-0", {
                              active: this.state.mode === "join"
                            })}
                            onClick={e => this.toggleNavs(e, "join")}
                            href="#pablo"
                            role="tab"
                          >
                            Join
                          </NavLink>
                        </NavItem>
                      </Nav>
                      { this.state.mode === "create" ?
                        <div>
                          <div className="text-center my-3">
                            <p>Registering your org with us for the first time? Create an org below.</p>
                          </div>
                          <Form role="form" onSubmit={this.handleNewOrg}>
                            <FormGroup>
                              <InputGroup className="input-group-alternative mb-3">
                                <InputGroupAddon addonType="prepend">
                                  <InputGroupText>
                                    <FontAwesomeIcon icon={faUsers}/>
                                  </InputGroupText>
                                </InputGroupAddon>
                                <Input id="org" placeholder="Name" type="text" onChange={this.onChange}/>
                              </InputGroup>
                            </FormGroup>
                            <div className="text-center">
                              <Button
                                className="mt-4 btn-icon"
                                color="default"
                                type="submit"
                              >
                                <span className="btn-inner--text">Create</span>
                                <span className="btn-inner--icon mr-1">
                                  <FontAwesomeIcon icon={faArrowRight}/>
                                </span>
                              </Button>
                            </div>
                          </Form>
                        </div>
                        : ""
                      }
                      {
                        this.state.mode === "join" ?
                        <div>
                          <div className="text-center my-3">
                            <p>Your org already has an account and you were given a join code? Join below.</p>
                          </div>
                          <Form role="form" onSubmit={this.handleJoin}>
                            <FormGroup>
                              <InputGroup className="input-group-alternative mb-3">
                                <InputGroupAddon addonType="prepend">
                                  <InputGroupText>
                                    <FontAwesomeIcon icon={faPlus}/>
                                  </InputGroupText>
                                </InputGroupAddon>
                                <Input id="join" placeholder="Join Code" type="text" onChange={this.onChange}/>
                              </InputGroup>
                            </FormGroup>
                            <div className="text-center">
                              <Button
                                className="mt-4 btn-icon"
                                color="default"
                                type="submit"
                              >
                                <span className="btn-inner--text">Join</span>
                                <span className="btn-inner--icon mr-1">
                                  <FontAwesomeIcon icon={faArrowRight}/>
                                </span>
                              </Button>
                            </div>
                          </Form>
                        </div>
                        : ""
                      }
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
          </div>
        )
    }
}
