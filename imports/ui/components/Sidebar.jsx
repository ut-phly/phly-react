/*!

=========================================================
* Argon Dashboard React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
/*eslint-disable*/
import React from "react";
import { Meteor } from "meteor/meteor";
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
// nodejs library to set properties for components
import { PropTypes } from "prop-types";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import IntroModal from './IntroModal.jsx';

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Media,
  Modal,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col
} from "reactstrap";

import {
  faEnvelope,
  faUser,
  faCheckCircle,
  faInfoCircle,
  faQuestionCircle
} from '@fortawesome/free-solid-svg-icons';

var ps;

class Sidebar extends React.Component {
  state = {
    collapseOpen: false,
    contact: false,
    form: {
      name: "",
      email: "",
      message: ""
    },
    submitted: false
  };
  
  constructor(props) {
    super(props);
    this.activeRoute.bind(this);
    this.openIntroModal = React.createRef()
  }
  // verifies if routeName is the one active (in browser input)
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }
  // toggles collapse between opened and closed (true/false)
  toggleCollapse = () => {
    this.setState({
      collapseOpen: !this.state.collapseOpen
    });
  };
  // closes the collapse
  closeCollapse = () => {
    this.setState({
      collapseOpen: false
    });
  };

  toggleModal = () => {
    this.setState({ contact: !this.state.contact });
  }

  handleLogout = () => {
      Meteor.logout( (err) => {
          if (err) {
              console.log( err.reason );
          } else {

          }
      });
  }

  handleContact = () => {
    this.setState({ contact: true })
  }

  handleIntro = () => {
    this.openIntroModal.current.toggle();
  }

  onChange = e => {
    this.setState({ form: { ...this.state.form, [e.target.id]: e.target.value }});
  }

  handleContactSubmit = () => {
    Meteor.call('contactUsEmail', this.state.form);
    this.setState({ submitted: true })
  }

  // creates the links that appear in the left menu / Sidebar
  createLinks = routes => {
    return routes.map((prop, key) => {
      return (
        <NavItem key={key}>
          <NavLink
            to={prop.layout + prop.path}
            tag={NavLinkRRD}
            exact
            onClick={this.closeCollapse}
            activeClassName="active"
            className="nav-link-icon px-5 py-3"
          >
            <FontAwesomeIcon icon={prop.icon} className="text-primary"/>
            <span className="nav-link-inner--text ml-3">{prop.name}</span>
          </NavLink>
        </NavItem>
      );
    });
  };

  render() {
    const { bgColor, routes, logo } = this.props;
    let navbarBrandProps;
    if (logo && logo.innerLink) {
      navbarBrandProps = {
        to: logo.innerLink,
        tag: Link
      };
    } else if (logo && logo.outterLink) {
      navbarBrandProps = {
        href: logo.outterLink,
        target: "_blank"
      };
    }
    return (
      <Navbar
        className="navbar-vertical fixed-left navbar-light bg-white shadow"
        expand="md"
        id="sidenav-main"
      >
        <Container fluid>
          {/* Toggler */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={this.toggleCollapse}
          >
            <span className="navbar-toggler-icon" />
          </button>
          {/* Brand */}
          {logo ? (
            <NavbarBrand className="pt-0" {...navbarBrandProps}>
              <img
                alt={logo.imgAlt}
                className="navbar-brand-img"
                src={logo.imgSrc}
              />
            </NavbarBrand>
          ) : null}


          {/* Collapse */}
          <Collapse navbar isOpen={this.state.collapseOpen}>
            {/* Collapse header */}
            <div className="navbar-collapse-header d-md-none">
              <Row>
                {logo ? (
                  <Col className="collapse-brand" xs="6">
                    {logo.innerLink ? (
                      <Link to={logo.innerLink}>
                        <img alt={logo.imgAlt} src={logo.imgSrc} />
                      </Link>
                    ) : (
                      <a href={logo.outterLink}>
                        <img alt={logo.imgAlt} src={logo.imgSrc} />
                      </a>
                    )}
                  </Col>
                ) : null}
                <Col className="collapse-close" xs="6">
                  <button
                    className="navbar-toggler"
                    type="button"
                    onClick={this.toggleCollapse}
                  >
                    <span />
                    <span />
                  </button>
                </Col>
              </Row>
            </div>
            {/* Navigation */}
            <Nav navbar className="mb-auto">{this.createLinks(routes)}</Nav>
            <Nav className="mb-md-3" navbar>
              <NavItem className="active-pro active">
                <Link className="nav-link" to="/login" onClick={this.handleLogout}>
                  Logout
                </Link>
              </NavItem>
              <NavItem className="active-pro active ml-4 my-2" float="right">
                <Button color="primary" size="sm" className="btn-icon btn-2" onClick={this.handleContact}>
                  <span className="btn-inner--icon">
                    <FontAwesomeIcon icon={faInfoCircle}/>
                  </span>
                  <span className="btn-inner--text">Support</span>
                </Button>
              </NavItem>
              <NavItem className="active-pro active ml-4 my-2" float="right">
                <Button color="primary" size="sm" className="btn-icon btn-2"
                  onClick={this.handleIntro}
                >
                  <span className="btn-inner--icon">
                    <FontAwesomeIcon icon={faQuestionCircle}/>
                  </span>
                  <span className="btn-inner--text">Walkthrough</span>
                </Button>
              </NavItem>
            </Nav>
          </Collapse>
          <IntroModal ref={this.openIntroModal}/>
          <Modal
            className="modal-dialog-centered"
            isOpen={this.state.contact}
            toggle={() => this.toggleModal()}
          >
            <div className="modal-header">
              <h4 className="modal-title m-3" id="shareModalLabel">
                How can we help?
              </h4>
              <button
                aria-label="Close"
                className="close"
                data-dismiss="modal"
                type="button"
                onClick={() => this.toggleModal()}
              >
                <span aria-hidden={true}>×</span>
              </button>
            </div>
            <div className="modal-body">
              <Container fluid>
                <Row>
                  <Col className="text-center">
                    <div className="py-2 text-center">
                      { !this.state.submitted ?
                        <Form role="form">
                          <FormGroup>
                            <InputGroup className="input-group-alternative">
                              <Input id="name" placeholder="Full Name" type="text" onChange={this.onChange}/>
                            </InputGroup>
                          </FormGroup>
                          <FormGroup className="mb-3">
                            <InputGroup className="input-group-alternative">
                              <Input id="email" placeholder="Email" type="email" onChange={this.onChange}/>
                            </InputGroup>
                          </FormGroup>
                          <FormGroup>
                            <InputGroup className="input-group-alternative">
                              <Input
                                id="message"
                                placeholder="Message"
                                rows="5"
                                type="textarea"
                                onChange={this.onChange}
                              />
                            </InputGroup>
                          </FormGroup>
                          <div className="text-center">
                            <Button
                              className="my-4"
                              color="primary"
                              type="button"
                              onClick={this.handleContactSubmit}
                            >
                              Submit
                            </Button>
                          </div>
                        </Form>
                        :
                        <div>
                          <p className="display-3 text-center">Thanks!</p>
                          <div className="text-center mb-3">
                            <div className="icon icon-lg icon-shape icon-shape-secondary shadow rounded-circle mb-4">
                              <FontAwesomeIcon icon={faCheckCircle}/>
                            </div>
                            <p>We will get back to you as soon as possible!</p>
                          </div>
                        </div>
                      }
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
          </Modal>
        </Container>
      </Navbar>
    );
  }
}

Sidebar.defaultProps = {
  routes: [{}]
};

Sidebar.propTypes = {
  // links that will be displayed inside the component
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the image src of the logo
    imgSrc: PropTypes.string.isRequired,
    // the alt for the img
    imgAlt: PropTypes.string.isRequired
  })
};

export default Sidebar;
