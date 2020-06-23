import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Redirect, Link } from 'react-router-dom';
import { Organizations } from '../../api/organizations.js';
import InviteModal from '../components/InviteModal.jsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  Container,
  Row, Col,
  Card,
  CardHeader,
  Table,
  Badge,
  Button,
  Modal,
  Input,
  InputGroup,
  Form,
  FormGroup
} from 'reactstrap';

import {
  faCopy,
  faCheckCircle
} from '@fortawesome/free-solid-svg-icons';

export default class MyOrganizations extends Component {

    constructor(props) {
      super(props);
      this.inviteRefs = {};
    }

    handleDelete = () => {
        Meteor.call('organizations.delete', this.props.org, this.props.currentUser._id);
    }

    handleInviteModal = (id) => {
      this.inviteRefs[id].toggleModal();
    }

    getOrganizations = (organizations, user) => {

      return organizations.map((org) => {
        let admin = (user._id === org.owner) ? true : false;
        let members = 1 + org.users.length;

        return (
          <tr key={org._id}>
            <th>{org.name}</th>
            <td>{
                admin ?
                <Badge color="" className="badge-dot mr-4">
                  <i className="bg-success" />
                  Admin
                </Badge> :
                <Badge color="" className="badge-dot mr-4">
                  <i className="bg-warning"/>
                  Member
                </Badge>
              }
            </td>
            <td>{members}</td>
            <td>{ admin ? org.share : "Contact admin"}</td>
            <td className="text-right">
              { admin && org.share ?
                <div>
                  <Button
                    color="primary"
                    type="button"
                    onClick={() => this.handleInviteModal(org._id)}
                  >
                    Invite
                  </Button>
                  <InviteModal org={org} ref={(ref) => this.inviteRefs[org._id] = ref}/>
                </div> :
                ""
              }

            </td>
          </tr>
        );
      });
    }

    render() {

        const { orgs, user } = this.props;

        let username = '';
        if (user) username = user.username;
        let self = this;

        return(
          <div>
            <div className="header bg-gradient-primary py-8">
              <Container fluid>
                <div className="header-body">
                </div>
              </Container>
            </div>
            <Container className="mt--7" fluid>
              {/* Table */}
              <Row>
                <div className="col">
                  <Card className="shadow">
                    <CardHeader className="border-0">
                      <Row className="align-items-center">
                        <Col xs="8">
                          <h2 className="mb-0 font-weight-bold">My Organizations</h2>
                        </Col>
                        <Col xs="4">
                          <Button
                            className="btn-secondary float-right"
                            color="secondary"
                            tag={Link} to="/home/neworg"
                          >
                            <span className="nav-link-inner--text ml-1">
                              New Org
                            </span>
                          </Button>
                        </Col>
                      </Row>
                    </CardHeader>
                    <Table className="align-items-center table-flush" responsive>
                      <thead className="thead-light">
                        <tr>
                          <th scope="col">Name</th>
                          <th scope="col">Status</th>
                          <th scope="col">Members</th>
                          <th scope="col">Join Code</th>
                          <th scope="col"/>
                        </tr>
                      </thead>
                      <tbody>
                        {this.getOrganizations(orgs, user)}
                      </tbody>
                    </Table>
                  </Card>
                </div>
              </Row>
            </Container>
          </div>
        )
    }
}
