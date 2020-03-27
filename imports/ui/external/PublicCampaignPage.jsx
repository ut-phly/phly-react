import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { withHistory, Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Donations } from '../../api/donations.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { HTTP } from 'meteor/http';
import Navigation from '../components/Navigation.jsx';

import {
  Container,
  Row, Col,
  Progress,
  Card,
  CardBody,
  Form,
  FormGroup,
  InputGroup,
  Input,
  InputGroupText,
  InputGroupAddon,
  Button,
  Alert
} from 'reactstrap';

import {
  faDollarSign,
  faUserCircle,
  faThumbsUp
} from '@fortawesome/free-solid-svg-icons';

import { Campaigns } from '../../api/campaigns.js';
import { Organizations } from '../../api/organizations.js';

class PublicCampaignPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            done: false,
            error: ''
        }

    }

    componentDidMount() {

      var self = this;

      var form = document.querySelector('#dropin-form');
      //new implementation
      var dropin = require('braintree-web-drop-in');

      Meteor.call('getClientToken', function(error, clientToken) {
          if (error) {
            console.log(error);
          } else {

            dropin.create({
              authorization: clientToken,
              container: '#payment-container',
              dataCollector: {
                paypal: true
              },
              venmo: {},
              paypal: {
                flow: 'vault',
              }
            }, function (createErr, instance) {
              if (createErr) {
                console.log(createErr);
                return;
              }


              form.addEventListener('submit', function(event) {
                event.preventDefault();
                instance.requestPaymentMethod(function(requestPaymentMethodErr, payload) {
                  if (requestPaymentMethodErr) {
                    console.log(requestPaymentMethodErr);
                    return;
                  }

                  let donation_amount = document.getElementById('donation-am').value;
                  let donor = document.getElementById('donor').value;
                  donation_amount = parseFloat(donation_amount);
                  if (donation_amount && donor) {
                    let platform_fee = (self.props.campaign.fee) ? .31 : 0;
                    donation_amount += platform_fee;

                    Meteor.call('createTransaction', payload.nonce, donation_amount, function(transactionError, success) {
                      if (transactionError) {
                        console.log(transactionError);
                        self.setState({ error: "Transaction creation failed" });
                      } else {
                        var donation = {
                          donor: donor,
                          campaign: self.props.campaign._id,
                          nonprofit: self.props.campaign.nonprofit,
                          amount: donation_amount - platform_fee
                        }
                        Meteor.call('donations.insert', donation);
                        self.setState({ done: true, error: '' })
                      }
                    });
                  } else {
                    self.setState({ error: "Please fill in all fields" });
                  }

                })
              })
            })
          }
        });

    }

    render() {
        let name = "";
        let description = "";
        let nonprofit = "";
        let org = "";
        let goalAmount = "";
        if (this.props.campaign) {
            name = this.props.campaign.name;
            description = this.props.campaign.description;
            nonprofit = this.props.campaign.nonprofit;
            goalAmount = this.props.campaign.goalAmount;
        }

        if (this.props.org) {
          org = this.props.org.name;
        }

        var totalRaised = 0;
        if (this.props.donations) {
          this.props.donations.forEach(calculateTotal);
          function calculateTotal(donation, index){
            totalRaised += donation.amount;
          }
        }

      return (
        <div>
          <Navigation transparent/>
          <section className="section bg-gradient-primary section-shaped section-lg section-bg">
            <Container fluid>
              <Row className="mx-5 justify-content-center row-grid">
                <Col xs="12">
                  <Card className="bg-white shadow border-0 p-4 mb-5">
                    <CardBody>
                      <h1 className="display-1">{name}</h1>
                      <h2>for {nonprofit}</h2>
                      <h2>by {org}</h2>
                      <p className="lead">{description}</p>
                      <Row className="mt-3">
                        <Col xs="11">
                          <Progress
                            max="100"
                            className="mt-2"
                            value={`${Math.round(totalRaised * 100 / goalAmount)}`}
                            barClassName="bg-danger"
                          />
                        </Col>
                        <Col xs="1">
                          <h3 className="float-right">${totalRaised}</h3>
                        </Col>
                      </Row>
                      { !this.state.done ?
                      <Form id="dropin-form">
                        <FormGroup className="mb-3">
                          <label
                            className="form-control-label"
                            htmlFor="input-donor"
                          >
                            Name
                          </label>
                          <InputGroup className="input-group-alternative" size="lg">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <FontAwesomeIcon icon={faUserCircle}/>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="Enter your name" type="text" id="donor"/>
                          </InputGroup>
                        </FormGroup>
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-donation-am"
                          >
                            Donation
                          </label>
                          <InputGroup className="input-group-alternative" size="lg">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <FontAwesomeIcon icon={faDollarSign}/>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="00.00" type="number" id="donation-am"/>
                          </InputGroup>
                        </FormGroup>
                        <FormGroup>
                          <div id="payment-container"></div>
                        </FormGroup>
                        <p><i>In light of COVID-19 Phly is waiving all fees.</i></p>
                        <Button type="submit" size="lg" color="primary">Submit</Button>
                      </Form>
                      :
                      <Alert color="success" className="mt-4">
                        <span className="alert-inner--icon">
                          <FontAwesomeIcon icon={faThumbsUp}/>
                        </span>{" "}
                        <span className="alert-inner--text">
                          <strong>Thank you for your donation!</strong> Refresh to donate again.
                        </span>
                      </Alert>
                    }
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
          </section>
        {/*
          <Responsive>
              <Segment style={{ backgroundColor: '#F9FFFF', paddingTop: '6em' }} vertical>
                  <Grid container centered stackable>
                      <Grid.Column desktop={8} mobile={16}>
                          <Header as='h1'
                                  color='orange'
                                  style={{
                                      fontSize: '6em',
                                      letterSpacing: '1.5px' }}>
                              {name}
                          </Header>
                          <p style={{ fontSize: '3em' }}>for {nonprofit}</p>
                          <Container fluid>
                            <Row>
                              <Col xs="11">
                                <Progress
                                  max="100"
                                  className="mt-2"
                                  value={`${Math.round(totalRaised * 100 / goalAmount)}`}
                                  barClassName="bg-danger"
                                />
                              </Col>
                              <Col xs="1">
                                <h3 className="float-right">${totalRaised}</h3>
                              </Col>
                            </Row>
                          </Container>
                          <p style={{ fontSize: '1.5em' }}>{description}</p>

                          { !this.state.done ?
                            <Form id="dropin-form">
                              <Form.Field>
                                <Input
                                  style={{ paddingTop: '1em' }}
                                  type="text"
                                  id="donor"
                                  placeholder="Enter your name"
                                  size="massive"/>
                              </Form.Field>
                              <Form.Field>
                                  <Input
                                    style={{ paddingTop: '1em', paddingBottom: '1em' }}
                                    label="$"
                                    type="number"
                                    id="new-donation-am"
                                    placeholder="00.00"
                                    size="massive"
                                    min="0.01" step="0.01"/>
                              </Form.Field>
                              <Form.Field>
                                  <div id="payment-container"></div>
                              </Form.Field>
                              <p style={{ color: "gray" }}><i>Phly adds an additional flat .31 cent platform fee to your donation to help us maintain our platform and offer our service to student organizations for free</i></p>
                              <Button type="submit" color="orange" size="massive">Submit</Button>
                              <p style={{ color: "gray" }}>Check out our <Link to="/policies">privacy policy</Link> and <Link to="/tos">terms of service</Link></p>
                            </Form>
                            :
                            <div>
                              <Message positive>
                                  <Header>Thank you for your donation!</Header>
                                  <p>Refresh to donate again</p>
                              </Message>
                              <Message positive>
                                  <Header>Check us out!</Header>
                                  <p>Phly makes fundraising easier and safer for student organizations on
                                      college campuses. Want to start fundraising a better way? Join for free today at <Link to='/'>www.phly.co</Link></p>
                              </Message>
                            </div>

                          }

                          { this.state.error ?
                            <Message negative>{this.state.error}</Message> : ""
                          }



                      </Grid.Column>
                  </Grid>
              </Segment>
          </Responsive>
        */}
        </div>
      );
    }
}

export default CampaignContainer = withTracker(props => {
    Meteor.subscribe('campaigns');
    Meteor.subscribe('donations');
    Meteor.subscribe('organizations');
    let campaign = Campaigns.findOne({ _id: props.match.params.id });
    let donations = Donations.find({campaign: props.match.params.id}).fetch();
    let org = (campaign) ? Organizations.findOne({ _id: campaign.owner }) : {};
    return {
        campaign: campaign,
        donations: donations,
        org: org
    }
})(PublicCampaignPage);
