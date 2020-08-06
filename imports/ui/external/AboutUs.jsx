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

export default class AboutUs extends React.Component {

  render() {

    return (
      <div>
        <Navigation mobile transparent secondary/>
        <main>
          <div className="position-relative">
            <section className="section bg-gradient-secondary section-lg pb-9">
              <Container className="pt-lg-md d-flex">
                <div className="col px-0">
                  <h1 className="text-white display-1 mb-5">About Us</h1>
                </div>
              </Container>
            </section>
            <section className="section section-lg section-shaped pt-0">
              <Container className="d-flex mt--9">
                <Row>
                  <Col>
                    <img
                      alt="..."
                      className="img-fluid shadow"
                      src="/images/team.jpg"
                    />
                  </Col>
                </Row>
              </Container>
            </section>
            <section className="section section-lg">
              <Container className="py-lg-md d-flex">
                <div className="col px-0">
                  <Row>
                    <Col lg="6">
                      <h2 className="display-2">Our Story</h2>
                    </Col>
                  </Row>
                  <Row className="row-grid mt-5">
                    <Col lg="1">
                      <div className="icon icon-md icon-shape icon-shape-secondary shadow rounded-circle mb-4">
                        <FontAwesomeIcon icon={faLightbulb}/>
                      </div>
                    </Col>
                    <Col>
                      <h3>The Idea</h3>
                      <p>
                        {'Most startups start with a problem. Phly started with an unbridled passion. When our team came together in 2018, we didn’t have much in the way of a great idea, but we were obsessed with helping our peers raise money for the causes they cared about.'}
                      </p>
                    </Col>
                  </Row>
                  <Row className="row-grid mt-5">
                    <Col lg="1">
                      <div className="icon icon-md icon-shape icon-shape-secondary shadow rounded-circle mb-4">
                        <FontAwesomeIcon icon={faRoute}/>
                      </div>
                    </Col>
                    <Col>
                      <h3>The Journey</h3>
                      <p>
                        {'In the early days of Phly, our team tried to envision a product that aligned with our passion. It wasn’t until we looked at ourselves and our peers that we realized the most immediate way we could make a difference in the world. As three very involved college students, we realized that the way that our student organizations were collecting payments for dues and donations through Venmo and spreadsheets was painfully inefficient, inconvenient, and unsafe. Why wasn’t there a better way to manage such an integral function of these groups?'}
                      </p>
                    </Col>
                  </Row>
                  <Row className="row-grid mt-5">
                    <Col lg="1">
                      <div className="icon icon-md icon-shape icon-shape-secondary shadow rounded-circle mb-4">
                        <FontAwesomeIcon icon={faSun}/>
                      </div>
                    </Col>
                    <Col>
                      <h3>The Result</h3>
                      <p>
                        {'It turns out that there was a simple explanation. Payment technology is evolving so quickly that many communities are left behind to piece together their own makeshift solutions to keep up with the times.'}
                      </p>
                    </Col>
                  </Row>
                  <Row className="row-grid mt-5">
                    <Col lg="1">
                      <div className="icon icon-md icon-shape icon-shape-secondary shadow rounded-circle mb-4">
                        <FontAwesomeIcon icon={faHandHoldingHeart}/>
                      </div>
                    </Col>
                    <Col>
                      <h3>The Purpose</h3>
                      <p>
                        Our team started Phly to help a new generation of world changers and activists spend less time managing payments and more time making a difference in the world.
                      </p>
                      <p>
                        We believe that technology should empower movements, not hinder them.
                      </p>
                      <p>
                        We believe in building technology that is human-focused and accessible for all.
                      </p>
                      <p>
                        We believe that you will change the world for the better, and our team wants to support you as you do it.
                      </p>
                    </Col>
                  </Row>
                </div>
              </Container>
            </section>
            <section className="section section-lg bg-gradient-primary">
              <Container className="py-lg-md d-flex">
                <div className="col px-0">
                  <Row>
                    <Col lg="6">
                      <h2 className="text-white display-2">Our Team</h2>
                    </Col>
                  </Row>
                  <Row className="row-grid mt-5">
                    <Col md="4" sm="12">
                      <div className="px-4">
                        <img
                          alt="..."
                          className="img-fluid shadow rounded-circle img-center"
                          src="/images/lucious.jpeg"
                        />
                        <div className="pt-4 text-center">
                          <h5 className="title">
                            <span className="d-block text-white mb-1">Lucious McDaniel IV</span>
                          </h5>
                        </div>
                      </div>
                    </Col>
                    <Col md="4" sm="12">
                      <div className="px-4">
                        <img
                          alt="..."
                          className="img-fluid shadow rounded-circle img-center"
                          src="/images/tara.jpg"
                        />
                        <div className="pt-4 text-center">
                          <h5 className="title">
                            <span className="d-block text-white mb-1">Tara Kuruvilla</span>
                          </h5>
                        </div>
                      </div>
                    </Col>
                    <Col md="4" sm="12">
                      <div className="px-4">
                        <img
                          alt="..."
                          className="img-fluid shadow rounded-circle img-center"
                          src="/images/grace.jpg"
                        />
                        <div className="pt-4 text-center">
                          <h5 className="title">
                            <span className="d-block text-white mb-1">Grace Anconetani</span>
                          </h5>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Container>
            </section>
            <section className="section section-lg">
              <Container className="py-lg-md d-flex">
                <div className="col px-0">
                  <Row>
                    <Col lg="6">
                      <h2 className="display-2">Follow Us</h2>
                    </Col>
                  </Row>
                  <Row className="row-grid mt-3">
                    <Col lg="3" sm="12" className="mt-3">
                      <Card className="shadow border-0" color="facebook" tag={NavLink} target="_blank" href="https://www.facebook.com/getPhly/">
                        <CardBody className="px-lg-5 py-lg-5 text-center">
                          <h4 className="text-white">Facebook</h4>
                          <h4 className="text-white display-4 font-weight-bold">getPhly</h4>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col lg="3" sm="12" className="mt-3">
                      <Card className="shadow border-0" color="twitter" tag={NavLink} target="_blank" href="https://twitter.com/getphly">
                        <CardBody className="px-lg-5 py-lg-5 text-center">
                          <h4 className="text-white">Twitter</h4>
                          <h4 className="text-white display-4 font-weight-bold">@getphly</h4>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col lg="3" sm="12" className="mt-3">
                      <Card className="shadow border-0" color="github" tag={NavLink} target="_blank" href="https://www.linkedin.com/company/phly/">
                        <CardBody className="px-lg-5 py-lg-5 text-center">
                          <h4 className="text-white">LinkedIn</h4>
                          <h4 className="text-white display-4 font-weight-bold">/phly</h4>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col lg="3" sm="12" className="mt-3">
                      <Card className="shadow border-0" color="instagram" tag={NavLink} target="_blank" href="https://www.instagram.com/phly.co/">
                        <CardBody className="px-lg-5 py-lg-5 text-center">
                          <h4 className="text-white">Instagram</h4>
                          <h4 className="text-white display-4 font-weight-bold">@phly.co</h4>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </div>
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
