import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withHistory, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Datetime from 'react-datetime';
import { withRouter } from 'react-router-dom';

import FormBuilder from '../components/FormBuilder.jsx';

import {
  Container,
  Col, Row,
  Card,
  CardBody,
  CardHeader,
  Form,
  FormGroup,
  Input,
  InputGroup,
  Button,
  Label,
  Alert
} from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';

export default class AddCampaign extends Component {
    constructor(props) {
      super(props);
      this.state = {
        name: '',
        description: '',
        startDate: null,
        endDate: null,
        goalAmount: 0,
        nonprofit: '',
        created: false,
        advanced: false,
        error: ''
      };
      this.formRef = React.createRef(null);
    }

    handleSubmit = (event) => {
        event.preventDefault();

        let fields = [];
        if (this.state.advanced) {
          fields = this.formRef.current.getFormContents();
          if (fields === null) return;
          console.log(fields);
        }

        for (var key in this.state) {
          if ((this.state[key] === null || this.state[key] === "") && key !== "error") {
            this.setState({ error: "Please fill out all the form fields"});
            return;
          }
        }

        var campaign = {
            name: this.state.name,
            createdAt: new Date(),
            owner: this.props.org,
            startDate: this.state.startDate.toDate(),
            endDate: this.state.endDate.toDate(),
            description: this.state.description,
            nonprofit: this.state.nonprofit,
            goalAmount: this.state.goalAmount,
            form: []
        }

        console.log(fields);
        if (this.state.advanced) campaign.form = fields;

        console.log(campaign);
        Meteor.call('campaigns.insert', campaign, (err) => {
          if (err) {
            console.log(err)
          } else {
            this.props.showCampaignModal();
            this.setState({ created: true });
          }
        });
    }

    handleChange = (key) => {
      return function(e) {
        var state = {};
        state[key] = e.target.value;
        this.setState(state);
      }.bind(this);
    }

    handleStartDayChange = (date) => {
      this.setState({startDate: date});
    }

    handleEndDayChange = (date) => {
      this.setState({endDate: date});
    }

    toggleAdvanced = () => {
      this.setState({
        advanced: !this.state.advanced
      });
    }

    render() {

      if (this.state.created === true) return <Redirect to='/home'/>

      return (
        <div>
          <div className="header bg-gradient-primary py-8">
            <Container fluid>
              <div className="header-body">
              </div>
            </Container>
          </div>
          <Container className="mt--7" fluid>
            <Row className="justify-content-center row-grid">
              <Col lg="8">
                <Card className="bg-white shadow border-0 mb-5">
                  <CardHeader className="border-0">
                    <Row className="align-items-center">
                      <Col xs="8">
                        <h2 className="mx-3 mb-0 font-weight-bold">New Campaign</h2>
                      </Col>
                    </Row>
                  </CardHeader>
                  <CardBody className="px-lg-5 py-lg-5">
                    <Form onSubmit={this.handleSubmit}>
                      <Row>
                        <Col lg="8">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-name"
                            >
                              Campaign Name
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-name"
                              placeholder="Name"
                              type="text"
                              onChange={this.handleChange("name")}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-np"
                            >
                              Nonprofit
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-np"
                              placeholder="Nonprofit"
                              type="text"
                              onChange={this.handleChange("nonprofit")}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-goal"
                            >
                              Goal
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-goal"
                              placeholder="Goal"
                              type="number"
                              onChange={this.handleChange("goalAmount")}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-np"
                            >
                              Start Date
                            </label>
                            <InputGroup className="input-group-alternative">
                              <Datetime
                                inputProps={{
                                  placeholder: "Start Date"
                                }}
                                timeFormat={false}
                                id="input-start"
                                onChange={this.handleStartDayChange}
                              />
                            </InputGroup>
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <label
                            className="form-control-label"
                            htmlFor="input-np"
                          >
                            End Date
                          </label>
                          <FormGroup>
                            <InputGroup className="input-group-alternative">
                              <Datetime
                                inputProps={{
                                  placeholder: "End Date"
                                }}
                                timeFormat={false}
                                id="input-end"
                                onChange={this.handleEndDayChange}
                              />
                            </InputGroup>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-description"
                            >
                              Description
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-description"
                              placeholder="Description"
                              rows="5"
                              type="textarea"
                              onChange={this.handleChange("description")}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row className="my-3">
                        <Col>
                          <Button size="sm" color="secondary" type="button" onClick={this.toggleAdvanced}>
                            { this.state.advanced ? "-" : "+"} Advanced
                          </Button>
                          { this.state.advanced ?
                             <FormBuilder ref={this.formRef}/>
                             : ""
                          }
                        </Col>
                      </Row>
                      { this.state.error ?
                        <Alert color="danger" className="mt-4">
                          <span className="alert-inner--icon">
                            <FontAwesomeIcon icon={faExclamationTriangle}/>
                          </span>{" "}
                          <span className="alert-inner--text">
                            {this.state.error}
                          </span>
                        </Alert> : ''
                      }
                      <Row>
                        <Col className="text-right">
                          <FormGroup>
                            <Button
                              color="primary"
                              type="submit"
                            >
                              Create
                            </Button>
                          </FormGroup>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      );
    }
}

//export default withRouter(AddCampaign);
AddCampaign.propTypes = {
    history: PropTypes.object,
    currentUser: PropTypes.object,
    org: PropTypes.string,
}
