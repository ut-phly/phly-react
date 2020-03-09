import React, { Component } from 'react';
import { withHistory, Link, Redirect } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import classnames from 'classnames';

import Navigation from '../components/Navigation.jsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faUserCircle,
  faEnvelope,
  faLock,
  faUsers,
  faPlus,
  faArrowRight
} from '@fortawesome/free-solid-svg-icons';

import {
  Container,
  Col, Row,
  Card,
  CardImg,
  CardBody,
  CardHeader,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Button,
  NavItem,
  NavLink,
  Nav
} from 'reactstrap';

export default class RegisterPage extends Component {
    constructor(props) {
      super(props);
      this.state = {
        first: "",
        last: "",
        email: "",
        password: "",
        password2: "",
        error: "",
        success: false,
        mode: "",
        org: "",
        join: ""
      }
    }

    onChange = e => {
      this.setState({ [e.target.id]: e.target.value });
    };

    handleSubmit = (e) => {
      e.preventDefault();

      if (this.state.password === this.state.password2) {
        const user = {
          profile: {
            first: this.state.first,
            last: this.state.last
          },
          email: this.state.email,
          password: this.state.password
        }

        Accounts.createUser(user, (err) => {
            if (err) {
                this.setState({
                    error: err.reason
                });
                console.log(err.reason);
            } else {
                this.setState({ success: true });
            }
        });
      } else {
        this.setState({ error: "Passwords do not match"});
      }
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
            this.props.history.push("/home");
          }
        });
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
            this.props.history.push("/home");
          }
        });
    }

    toggleNavs = (e, index) => {
      e.preventDefault();
      this.setState({
        mode: index
      });
    };

    render() {
        const error = this.state.error;

        return (
          <div>
            <Navigation transparent/>
            <main>
              <section className="section bg-gradient-primary section-shaped section-lg section-bg">
                <Container className="py-lg-md">
                  <Row className="justify-content-center row-grid">
                    <Col lg="6">
                      <Card className="bg-white shadow border-0">
                        { !this.state.success ?
                          <CardBody className="px-lg-5 py-lg-5">
                            <p className="display-3 text-center">Sign up</p>
                            <div className="text-center mb-3">
                              <small>Already have an account? Login <Link to="/login">here</Link>.</small>
                            </div>
                            <div className="text-center text-error mb-3">
                              {
                                error ?
                                  <small>{error}</small>
                                : ""
                              }
                            </div>
                            <Form role="form" onSubmit={this.handleSubmit}>
                              <Row>
                                <Col lg="6">
                                  <FormGroup>
                                    <InputGroup className="input-group-alternative mb-3">
                                      <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                          <FontAwesomeIcon icon={faUserCircle}/>
                                        </InputGroupText>
                                      </InputGroupAddon>
                                      <Input id="first" placeholder="First Name" type="text" onChange={this.onChange}/>
                                    </InputGroup>
                                  </FormGroup>
                                </Col>
                                <Col lg="6">
                                  <FormGroup>
                                    <InputGroup className="input-group-alternative mb-3">
                                      <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                          <FontAwesomeIcon icon={faUserCircle}/>
                                        </InputGroupText>
                                      </InputGroupAddon>
                                      <Input id="last" placeholder="Last Name" type="text" onChange={this.onChange}/>
                                    </InputGroup>
                                  </FormGroup>
                                </Col>
                              </Row>
                              <FormGroup>
                                <InputGroup className="input-group-alternative mb-3">
                                  <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                      <FontAwesomeIcon icon={faEnvelope}/>
                                    </InputGroupText>
                                  </InputGroupAddon>
                                  <Input id="email" placeholder="Email" type="email" onChange={this.onChange}/>
                                </InputGroup>
                              </FormGroup>
                              <FormGroup>
                                <InputGroup className="input-group-alternative mb-3">
                                  <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                      <FontAwesomeIcon icon={faLock}/>
                                    </InputGroupText>
                                  </InputGroupAddon>
                                  <Input id="password" placeholder="Password" type="password" onChange={this.onChange}/>
                                </InputGroup>
                              </FormGroup>
                              <FormGroup>
                                <InputGroup className="input-group-alternative mb-3">
                                  <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                      <FontAwesomeIcon icon={faLock}/>
                                    </InputGroupText>
                                  </InputGroupAddon>
                                  <Input id="password2" placeholder="Re-type Password" type="password" onChange={this.onChange}/>
                                </InputGroup>
                              </FormGroup>
                              <div className="text-center">
                                <Button
                                  className="mt-4"
                                  color="default"
                                  type="submit"
                                >
                                  Create account
                                </Button>
                              </div>
                              <div className="text-center mt-3">
                                <small>By signing up you agree to Phly's <Link to="/tos">Terms and Conditions</Link>.</small>
                              </div>
                            </Form>
                          </CardBody> :

                          //Add or join new org
                          <CardBody className="px-lg-5 py-lg-5">
                            <p className="display-3 text-center">Create or Join an Org</p>
                            <div className="text-center text-error mb-3">
                              {
                                error ?
                                  <small>{error}</small>
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
                                      <span className="btn-inner--text">Get Started</span>
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
                                      <span className="btn-inner--text">Get Started</span>
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
                        }
                      </Card>
                    </Col>
                  </Row>
                </Container>
              </section>
            </main>
          </div>

        );
    }
}
