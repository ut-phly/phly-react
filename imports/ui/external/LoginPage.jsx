import React, { Component } from 'react';
import { withHistory, Link, Redirect } from 'react-router-dom';
import { createContainer } from 'meteor/react-meteor-data';

import Navigation from '../components/Navigation.jsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faEnvelope,
  faLock
} from '@fortawesome/free-solid-svg-icons';

import {
  Container,
  Col, Row,
  Card,
  CardBody,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Button
} from 'reactstrap';

export default class LoginPage extends Component {
    constructor(props) {
      super(props);
      this.state = {
          email: "",
          password: "",
          error: ""
      }
    }

    onChange = e => {
      this.setState({ [e.target.id]: e.target.value });
    };

    handleSubmit = e => {
      e.preventDefault();

      const user = {
        email: this.state.email,
        password: this.state.password
      }
      Meteor.loginWithPassword(user.email, user.password, (err) => {
          if (err) {
              this.setState({
                  error: err.reason
              });
              console.log(err.reason);
          } else {
              this.props.history.push('/home');
          }
      });
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
                        <CardBody className="px-lg-5 py-lg-5">
                          <p className="display-3 text-center">Login</p>
                          <div className="text-center mb-3">
                            <small>Don't have an account? Sign up <Link to="/register">here</Link>.</small>
                          </div>
                          <div className="text-center mb-3">
                            {
                              error ?
                                <small>{error}</small>
                              : ""
                            }
                          </div>
                          <Form role="form" onSubmit={this.handleSubmit}>
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
                            <div className="text-center">
                              <Button
                                className="mt-4"
                                color="default"
                                type="submit"
                              >
                                Login
                              </Button>
                            </div>
                          </Form>
                        </CardBody>
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
