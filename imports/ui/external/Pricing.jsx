import React from 'react';
import Navigation from '../components/Navigation.jsx';

import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  Container,
  Row, Col,
  Nav,
  NavItem,
  NavLink,
  Card,
  CardBody
} from 'reactstrap';

import {
  faLightbulb,
  faRoute,
  faSun,
  faHandHoldingHeart
} from '@fortawesome/free-solid-svg-icons';

export default class Pricing extends React.Component {

  render() {

    return (
      <div>
        <Navigation mobile transparent/>
        <main>
          <div className="position-relative">
            <section className="section bg-gradient-primary section-lg section-shaped">
              <Container className="pt-lg-md d-flex">
                <div className="col px-0">
                  <h1 className="text-white display-1">Pricing</h1>
                </div>
              </Container>
              <Container>
                <Row className="mt-3">
                  <Col md="4">
                    <h2 className="text-white font-weight-bold">Free to get started</h2>
                    <p className="text-white">Phly’s platform fee is applied as funds are withdrawn from the platform</p>
                    <p className="text-white-50 mt-3">*All incoming payments and donations are securely processed by <a className="text-white" href="https://www.braintreepayments.com">Braintree</a> and are subject to <a className="text-white" href="https://www.braintreepayments.com/braintree-pricing">standard transaction fees</a></p>
                  </Col>
                  <Col md="5">
                    <h3 className="text-white text-center">Subscription Fee</h3>
                    <Card className="shadow border-0">
                      <CardBody className="text-center">
                        <Row>
                          <Col>
                            <h1 className="display-1">$0/Month</h1>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col md="3">
                    <h3 className="text-white text-center">Platform Fee*</h3>
                    <Card className="shadow border-0">
                      <CardBody className="text-center">
                        <Row>
                          <Col>
                            <h1 className="display-1">3.7%</h1>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </Container>
            </section>
            <footer className="footer bg-white">
              <Container>
                <hr />
                <Row className=" align-items-center justify-content-md-between">
                  <Col md="6">
                    <div className=" copyright">
                      Call us at <a href="tel:+15125222764">(512) 522-2764</a>
                    </div>
                    <div className=" copyright mt-2">
                      Email us at <a href="mailto:hello@phly.co">hello@phly.co</a>
                    </div>
                    <div className=" copyright mt-2">

                      © {new Date().getFullYear()}{" "}
                      <a
                        href="https://www.phly.co"
                      >
                        Phly
                      </a>
                      .
                    </div>
                  </Col>
                  <Col md="6">
                    <Nav className=" nav-footer justify-content-end">
                    <NavItem>
                      <NavLink
                        href="https://www.phly.co"
                      >
                        Phly
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        href="https://www.phly.co/aboutus"
                      >
                        About Us
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        href="https://www.phly.co/tos"
                      >
                        Terms of Service
                      </NavLink>
                    </NavItem>
                  </Nav>
                  </Col>
                </Row>
              </Container>
            </footer>
          </div>
        </main>
      </div>
    )
  }
}
