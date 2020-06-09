import React, { Component } from 'react';
import { withHistory, Link, Redirect } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import classnames from 'classnames';

import Navigation from '../components/Navigation.jsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faUserCircle,
  faEnvelope,
  faUniversity,
  faUsers,
  faPlus,
  faArrowRight,
  faCheckCircle
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

export default class GetStarted extends Component {
    constructor(props) {
      super(props);
      this.state = {
        first: "",
        last: "",
        email: "",
        org: "",
        university: "",
        success: false,
        error: ""
      }
    }

    onChange = e => {
      this.setState({ [e.target.id]: e.target.value });
    };

    handleSubmit = (e) => {
      e.preventDefault();

      let user = {
        first: this.state.first,
        last: this.state.last,
        email: this.state.email,
        org: this.state.org,
        university: this.state.university
      }
      Meteor.call('potentials.insert', user);
      this.setState({ success: true });
    }

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
                                      <FontAwesomeIcon icon={faUsers}/>
                                    </InputGroupText>
                                  </InputGroupAddon>
                                  <Input id="org" placeholder="Organization" type="text" onChange={this.onChange}/>
                                </InputGroup>
                              </FormGroup>
                              <FormGroup>
                                <InputGroup className="input-group-alternative mb-3">
                                  <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                      <FontAwesomeIcon icon={faUniversity}/>
                                    </InputGroupText>
                                  </InputGroupAddon>
                                  <Input id="university" placeholder="University (optional)" type="text" onChange={this.onChange}/>
                                </InputGroup>
                              </FormGroup>
                              <div className="text-center">
                                <Button
                                  className="mt-4"
                                  color="default"
                                  type="submit"
                                >
                                  Sign Up
                                </Button>
                              </div>
                              <div className="text-center mt-3">
                                <small>By signing up you agree to Phly's <Link to="/tos">Terms and Conditions</Link>.</small>
                              </div>
                            </Form>
                          </CardBody>
                          :
                          <CardBody className="px-lg-5 py-lg-5">
                            <p className="display-3 text-center">Sign up</p>
                            <div className="text-center mb-3">
                              <div className="icon icon-lg icon-shape icon-shape-secondary shadow rounded-circle mb-4">
                                <FontAwesomeIcon icon={faCheckCircle}/>
                              </div>
                              <p>Welcome to Phly! Check your email to login.</p>
                            </div>
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
