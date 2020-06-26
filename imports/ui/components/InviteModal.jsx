import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faCopy,
  faCheckCircle
} from '@fortawesome/free-solid-svg-icons';

import {
  Modal,
  Button,
  Input,
  InputGroup,
  Form,
  FormGroup,
  UncontrolledTooltip,
  Container,
  Row, Col,
  Alert
} from 'reactstrap';

class InviteModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      email: "",
      copiedText: "",
      sent: false
    }
  }

  toggleModal = () => {
    this.setState({ open: !this.state.open, email: "", sent: false });
  }

  addEmail = (e) => {
    this.setState({ email: e.target.value });
  }

  handleInviteSubmit = () => {
    Meteor.call('organizations.invite', this.props.org, this.state.email);
    this.setState({ sent: true });
  }

  render() {

    const { org: { _id, name, share } } = this.props;

    return (
      <Modal
        className="modal-dialog-centered"
        isOpen={this.state.open}
        toggle={() => this.toggleModal()}
      >
        <div className="modal-header">
          <h4 className="modal-title m-3" id="shareModalLabel">
            Invite team members to {name}
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
            <Row className="mb-3">
              <Col className="text-center">
                <div className="py-2 text-center">
                  { !this.state.sent ?
                    <Form role="form">
                      <p>Invite members with their email</p>
                      <Row>
                        <Col>
                          <FormGroup className="mb-3">
                            <InputGroup className="input-group-alternative">
                              <Input id="email" placeholder="Email" type="email" onChange={this.addEmail}/>
                            </InputGroup>
                          </FormGroup>
                        </Col>
                        <Col xs="3">
                          <div className="text-center">
                            <Button
                              color="primary"
                              type="button"
                              onClick={this.handleInviteSubmit}
                            >
                              Send
                            </Button>
                          </div>
                        </Col>
                      </Row>
                    </Form>
                    :
                    <div>
                      <Alert color="success" className="mt-4">
                        <span className="alert-inner--icon">
                          <FontAwesomeIcon icon={faCheckCircle}/>
                        </span>{" "}
                        <span className="alert-inner--text">
                          <strong>Sent!</strong> They should be receiving an email from us shortly.
                        </span>
                      </Alert>
                    </div>
                  }
                </div>
                <br/>
                <div className="text-center">
                  <p>Or copy the join code</p>
                  <CopyToClipboard
                    text={share}
                    onCopy={() => this.setState({ copiedText: share })}
                  >
                    <Button
                      className="btn-icon btn-2"
                      color="primary"
                      id="ttTarget"
                      type="button"
                    >
                      <span className="btn-inner--icon">
                        <FontAwesomeIcon icon={faCopy}/>
                      </span>
                      <span className="btn-inner--text">Copy</span>
                    </Button>
                  </CopyToClipboard>
                  <UncontrolledTooltip
                    delay={0}
                    trigger="hover focus"
                    target="ttTarget"
                  >
                    {this.state.copiedText === share
                      ? "Copied"
                      : "Copy To Clipboard"}
                  </UncontrolledTooltip>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </Modal>
    );
  }
}

export default InviteModal;
