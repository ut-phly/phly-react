import React from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

import {
  Nav,
  Navbar,
  NavbarBrand,
  NavItem,
  NavLink,
  Button,
  Container
} from 'reactstrap';

export default class Navigation extends React.Component {

  render() {
    const { transparent, mobile, secondary } = this.props;

    return (
      <div>
        <header className="header-global">
          <Navbar
            className={classnames("navbar-main navbar-nav headroom", {
              'navbar-transparent': transparent,
              'px-4': mobile
            })}
            expand="lg"
            id="navbar-main"
          >
            <Container>
              <NavbarBrand className="mr-lg-5" tag={Link} to="/">
                <img
                  alt="..."
                  src={`/images/phly-${transparent ? 'white' : 'color'}.png`}
                  className="mr-2"
                />
                phly.co
              </NavbarBrand>
              <Nav className="navbar-nav-hover align-items-lg-center" navbar>
                <NavItem>
                  <NavLink tag={Link} to="/campaigns">
                    <span className="nav-link-inner--text">Campaigns</span>
                  </NavLink>
                </NavItem>
              </Nav>
              <Nav className="align-items-lg-center ml-lg-auto" navbar>
                <NavItem>
                  <NavLink tag={Link} to="/login">
                    <span className="nav-link-inner--text">Login</span>
                  </NavLink>
                </NavItem>
                <NavItem className="d-none d-lg-block ml-lg-4">
                  <Button
                    color={ secondary ? "white" : "secondary"}
                    tag={Link} to="/getstarted"
                  >
                    <span className="nav-link-inner--text ml-1">
                      Sign up
                    </span>
                  </Button>
                </NavItem>
              </Nav>
            </Container>
          </Navbar>
        </header>
      </div>
    );
  }
}
