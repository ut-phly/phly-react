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
import React from "react";
import { Link } from "react-router-dom";

import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import {
  faPlus
} from '@fortawesome/free-solid-svg-icons';
// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Form,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,
  Navbar,
  Nav,
  NavItem,
  Container,
  Media,
  Button
} from "reactstrap";

class AdminNavbar extends React.Component {

  getOrgs = () => {
    return this.props.orgs.map((org) => {
      return (
        <DropdownItem key={org.key} onClick={() => this.props.handleChange(org.key)}>
          <span>{org.text}</span>
        </DropdownItem>
      );
    });
  };

  render() {

    return (
      <div>
        <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
          <Container fluid>
            <Link
              className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
              to="/"
            >
              Phly
            </Link>

            <Nav className="align-items-center ml-auto" navbar>
              <NavItem>
                <Button
                  className="btn-secondary"
                  color="secondary"
                  tag={Link} to="/home/new"
                >
                  <span className="nav-link-inner--text ml-1">
                    New Campaign
                  </span>
                </Button>
              </NavItem>
            </Nav>

            <Nav className="align-items-center" navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle className="pr-0" nav>
                  <span className="mb-0 text-md font-weight-bold">
                    {this.props.current}
                  </span>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-arrow" right>
                  <DropdownItem className="noti-title" header tag="div">
                    <h6 className="text-overflow m-0">My Organizations</h6>
                  </DropdownItem>
                  {this.getOrgs()}
                  <DropdownItem divider />
                  <DropdownItem tag={Link} to="/home/neworg">
                    <span>Add New Org</span>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Container>
        </Navbar>
      </div>
    );
  }
}

export default AdminNavbar;
