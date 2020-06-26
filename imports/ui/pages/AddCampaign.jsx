import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withHistory, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactDatetime from 'react-datetime';
import { withRouter } from 'react-router-dom';

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
  Button
} from 'reactstrap';

export default class AddCampaign extends Component {
    constructor(props) {
      super(props);
      this.state = {
        name: '',
        description: '',
        startDate: new Date(),
        endDate: new Date(),
        goalAmount: 0,
        nonprofit: '',
        created: false
      };

    }

    handleSubmit = (event) => {
        event.preventDefault();
        var campaign = {
            name: this.state.name,
            createdAt: new Date(),
            owner: this.props.org,
            startDate: this.state.startDate.toDate(),
            endDate: this.state.endDate.toDate(),
            description: this.state.description,
            nonprofit: this.state.nonprofit,
            goalAmount: this.state.goalAmount,
        }
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
                              <ReactDatetime
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
                              <ReactDatetime
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
        {/*
        <Responsive>
          <Segment style={{ backgroundColor: '#F9FFFF', margin: 0 }} basic clearing>
            <Header as='h1'
                    floated='left'
                    color='orange'
                    style={{
                          fontSize: '2em',
                          letterSpacing: '1.5px',
                          margin: 0,
                          paddingRight: '.5em' }}>
              New Campaign
            </Header>
          </Segment>
          <Segment style={{ backgroundColor: '#F9FFFF', margin: 0 }} basic clearing>
            <Form noValidate onSubmit={this.handleSubmit}>
              <Form.Group widths="equal">
                <Form.Input fluid type="text" label="Name" value={this.state.name} onChange={this.handleChange('name')} />
                <Form.Input fluid type="text" label="Non Profit" value={this.state.nonprofit} onChange={this.handleChange('nonprofit')} />
              </Form.Group>
              <Form.TextArea type="text" label="Description" value={this.state.description} onChange = {this.handleChange('description')} />
              <Form.Group widths="equal">
                <Form.Field>
                  <label htmlFor="startDate">Start Date</label>
                  <DayPickerInput onDayChange={this.handleStartDayChange.bind(this)}/>
                </Form.Field>
                <Form.Field>
                  <label htmlFor="endDate">End Date</label>
                  <DayPickerInput onDayChange={this.handleEndDayChange.bind(this)}/>
                </Form.Field>
                <Form.Field>
                  <label>Goal</label>
                  <Input type="number" label="$" value = {this.state.goalAmount} onChange = {this.handleChange('goalAmount')}/>
                </Form.Field>
              </Form.Group>
              <Button color='orange' type='submit'>Create</Button>
            </Form>
          </Segment>
        </Responsive>
        */}
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
