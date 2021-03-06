import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import validator from "validator";
import { withHistory, Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Donations } from '../../api/donations.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ShowMore from 'react-show-more';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {
  FacebookShareButton,
  TwitterShareButton
} from 'react-share';

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
  Alert,
  Modal,
  FormFeedback
} from 'reactstrap';

import {
  faDollarSign,
  faUserCircle,
  faThumbsUp,
  faExclamationTriangle,
  faHandHoldingHeart,
  faExternalLinkAlt,
  faCopy,
  faInfo
} from '@fortawesome/free-solid-svg-icons';

import {
  faFacebook,
  faTwitter
} from '@fortawesome/free-brands-svg-icons';

import { Campaigns } from '../../api/campaigns.js';
import { Organizations } from '../../api/organizations.js';

class PublicCampaignPage extends Component {
    constructor(props) {
        super(props);
        var ua = window.navigator.userAgent;
        var markup = (ua.indexOf("FBAN") > -1) || (ua.indexOf("FBAV") > -1) || (ua.indexOf("Instagram") > -1) || (ua.indexOf("LinkedIn") > -1) || (ua.indexOf("Twitter") > -1);

        this.state = {
            done: false,
            error: '',
            markup: markup,
            popup: markup,
            failure: false,
            payee: {
              value: '',
              valid: true
            },
            amount: {
              value: '',
              valid: true
            },
            phone: {
              value: '',
              valid: true
            },
            'custom-0': {
              value: '',
              valid: true
            },
            'custom-1': {
              value: '',
              valid: true
            },
            'custom-2': {
              value: '',
              valid: true
            },
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

                  if (!self.state.amount.valid) {
                    self.setState({ error: "Please enter a valid payment amount" });
                    return;
                  }
                  if (!self.state.phone.valid) {
                    self.setState({ error: "Please enter a valid payment amount" });
                    return;
                  }

                  let donation_amount = self.state.amount.value;

                  if (!self.state.payee.valid) {
                    self.setState({ error: "Please enter a name for the payment" });
                    return;
                  }
                  let donor = self.state.payee.value;
                  donation_amount = parseFloat(donation_amount);

                  let form = [];
                  let invalid = false;
                  if (self.props.campaign.form) {
                    self.props.campaign.form.map((field, index) => {
                      let value = self.state[`custom-${index}`].value;
                      if (!self.state[`custom-${index}`].valid) invalid = true;


                      if (field.type === "tel") {
                        value = value.replace(/\D/g, "");
                      }
                      form.push({
                        label: field.label,
                        type: field.type,
                        required: field.required,
                        value: value
                      })
                    })
                  }

                  if (invalid) {
                    self.setState({ error: "Please make sure all the required fields are filled and valid" });
                    return;
                  }

                  if (donation_amount && donor) {
                    let platform_fee = (self.props.campaign.fee) ? .31 : 0;
                    let braintree_fee = (self.props.campaign.braintree) ? (donation_amount *.0299) + .31 : 0;
                    donation_amount += platform_fee;

                    Meteor.call('createTransaction', payload.nonce, Math.ceil((donation_amount + braintree_fee) * 100) / 100, function(transactionError, result) {
                      if (transactionError) {
                        console.log(transactionError);
                        self.setState({ failure: true });
                      } else {
                        var donation = {
                          transaction: result.transaction.id,
                          donor: donor,
                          phone: self.state.phone.value,
                          campaign: self.props.campaign._id,
                          nonprofit: self.props.campaign.nonprofit,
                          amount: donation_amount - platform_fee,
                          form: form
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

    onInputChange = (e) => {
      let valid = this.validateInput(e.target.type, e.target.value) || !e.target.required;
      this.setState({
        [e.target.name]: {
          value: e.target.value,
          valid: valid
        }
      })
    }

    validateInput = (type, value) => {
      switch (type) {
        case "text":
          return true;
          break;

        case "email":
          return validator.isEmail(value);
          break;

        case "number":
          return validator.isCurrency(value);
          break;

        case "tel":
          return validator.isMobilePhone(value, "en-US");
          break;

        default:
        return true;
        break;
      }
    }

    toggle = () => {
      this.setState({ popup: !this.state.popup });
    }

    render() {
        let name = "";
        let description = "";
        let nonprofit = "";
        let org = "";
        let goalAmount = "";
        let fee = false;
        let complete = false;
        let form = [];
        if (this.props.campaign) {
            name = this.props.campaign.name;
            description = this.props.campaign.description;
            nonprofit = this.props.campaign.nonprofit;
            goalAmount = this.props.campaign.goalAmount;
            fee = this.props.campaign.braintree;
            complete = (this.props.campaign.complete) ? true : false;
            if (this.props.campaign.form) form = this.props.campaign.form;
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
          <Navigation transparent mobile/>
          <section className="section bg-gradient-primary section-shaped section-lg section-bg">
            <Container className="d-flex">
              <div className="col px-0">
              <Row className="justify-content-center row-grid">
                <Col xs="12">
                  <Modal
                    className="modal-dialog-centered modal-danger mt-0"
                    contentClassName="bg-gradient-danger"
                    isOpen={this.state.popup}
                    toggle={() => this.toggle()}
                  >
                    <div className="modal-header">
                      <h3 className="modal-title" id="modal-title-notification">
                        Open to continue!
                      </h3>
                    </div>
                    <div className="modal-body">
                      <div className="py-3 text-center">
                        <img
                          alt="..."
                          className="img-fluid"
                          src="/images/custom/phly-browser.gif"
                        />
                      </div>
                    </div>
                  </Modal>
                  <Card className="bg-white shadow border-0 p-4 mb-5">
                    <CardBody>
                      <h3 className="display-3">{name}</h3>
                      <h4>for {nonprofit}</h4>
                      <h4>by {org}</h4>
                      <ShowMore
                        className="lead"
                        lines={3}
                        more='Show more'
                        less='Show less'
                      >
                        {description}
                      </ShowMore>
                      <Row className="mt-3">
                        <Col md={`${(totalRaised > 9999) ? 10 : 11}`} xs={`${(totalRaised > 9999) ? 8 : 9}`}>
                          <Progress
                            max="100"
                            className="mt-3"
                            value={`${Math.round(totalRaised * 100 / goalAmount)}`}
                            barClassName="bg-danger"
                          />
                        </Col>
                        <Col md={`${(totalRaised > 9999) ? 2 : 1}`} xs={`${(totalRaised > 9999) ? 4 : 3}`}>
                          <h3 className="float-right">${totalRaised}</h3>
                        </Col>
                      </Row>
                      { complete ?
                        <Row className="mt-3">
                          <Col>
                            <Card className="bg-gradient-success text-white border-0 p-4">
                              <CardBody className="text-center">
                                <FontAwesomeIcon size="6x" className="m-4" icon={faHandHoldingHeart}/>
                                <h2 className="text-white font-weight-bold">This campaign is complete!</h2>
                                <p className="text-white">Check out our <Link to="/campaigns" className="text-white font-weight-bold">campaign page <FontAwesomeIcon icon={faExternalLinkAlt}/></Link> to support other campaigns</p>
                              </CardBody>
                            </Card>
                          </Col>
                        </Row>
                        :
                        <div>
                          { !this.state.done ?
                            <Form id="dropin-form">
                              <FormGroup className="mb-3">
                                <label
                                  className="form-control-label"
                                  htmlFor="input-donor"
                                >
                                  Name <span className="text-danger">*</span>
                                </label>
                                <Input
                                  placeholder="Enter your name"
                                  type="text" id="donor"
                                  name="payee"
                                  required
                                  onChange={this.onInputChange}/>
                              </FormGroup>
                              <FormGroup className="mb-3">
                                <label
                                  className="form-control-label"
                                  htmlFor="input-phone"
                                >
                                  Phone Number <span className="text-danger">*</span>
                                </label>
                                <Input
                                  placeholder="Enter your name"
                                  type="tel" id="phone"
                                  name="phone"
                                  required
                                  invalid={!this.state.phone.valid}
                                  onChange={this.onInputChange}/>
                              </FormGroup>
                              { form.map((field, index) => {
                                  return (
                                    <FormGroup key={index}>
                                      <label
                                        className="form-control-label"
                                        htmlFor={`custom-${index}`}
                                      >
                                        {field.label} {field.required ? <span className="text-danger">*</span> : ""}
                                      </label>
                                      <Input
                                        placeholder={field.label}
                                        type={field.type}
                                        name={`custom-${index}`}
                                        required={field.required}
                                        rows={field.type === "textarea" ? "4" : ""}
                                        invalid={(this.state[`custom-${index}`]) ? !this.state[`custom-${index}`].valid : false}
                                        onChange={this.onInputChange}
                                        />
                                    </FormGroup>
                                  )
                                }
                              )}
                              <FormGroup>
                                <label
                                  className="form-control-label"
                                  htmlFor="donation"
                                >
                                  Payment <span className="text-danger">*</span>
                                </label>
                                <Input
                                  placeholder="00.00"
                                  type="number" id="donation"
                                  name="amount"
                                  min="0"
                                  required
                                  invalid={!this.state.amount.valid}
                                  onChange={this.onInputChange}/>
                              </FormGroup>
                              { this.state.failure ?
                                <FormGroup>
                                  <Alert color="danger" className="mt-4">
                                    <span className="alert-inner--icon">
                                      <FontAwesomeIcon icon={faExclamationTriangle}/>
                                    </span>{" "}
                                    <span className="alert-inner--text">
                                      <strong>Oh no! Your payment didn't go through.</strong> Refresh to try again.
                                    </span>
                                  </Alert>
                                </FormGroup>

                                :
                                <FormGroup className="mt-4">
                                  <div id="payment-container"></div>
                                </FormGroup>

                              }
                              { fee ? <p><i>Standard processing fee of 2.9% plus 30 cents is added to each payment.</i></p> : '' }
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
                              <Button type="submit" size="lg" color="primary">Submit</Button>
                            </Form>
                            :
                            <Row className="mt-3">
                              <Col md="4" xs="12">
                                <Card className="bg-gradient-success text-white border-0 p-4 my-3 shadow">
                                  <CardBody className="text-center">
                                    <FontAwesomeIcon size="3x" className="mb-4" icon={faThumbsUp}/>
                                    <h3 className="text-white font-weight-bold">Thank you for your donation!</h3>
                                  </CardBody>
                                </Card>
                              </Col>
                              <Col md="8" xs="12" className="mt-3">
                                <Card className="border-0 p-4 shadow">
                                  <CardBody>
                                    <Row>
                                      <Col md="6" xs="12" className="text-center mb-4">
                                        <div className="icon icon-lg icon-shape icon-shape-success shadow rounded-circle mb-4">
                                          <FontAwesomeIcon icon={faExternalLinkAlt}/>
                                        </div>
                                        <p>Keep supporting this campaign by sharing!</p>
                                      </Col>
                                      <Col md="6" xs="12">
                                        <CopyToClipboard
                                          text={`https://www.phly.co/public/${this.props.match.params.id}`}
                                        >
                                          <Button
                                            className="btn-icon btn-2"
                                            color="primary"
                                            type="button"
                                            block
                                          >
                                            <span className="btn-inner--icon">
                                              <FontAwesomeIcon icon={faCopy}/>
                                            </span>
                                            <span className="btn-inner--text">Copy Link</span>
                                          </Button>
                                        </CopyToClipboard>
                                        <Button
                                          href={`https://www.facebook.com/sharer/sharer.php?u=www.phly.co/public/${this.props.match.params.id}`}
                                          target="_blank"
                                          className="button btn btn-facebook btn-block btn-icon btn-2 mt-3"

                                        >
                                          <span className="btn-inner--icon">
                                            <FontAwesomeIcon icon={faFacebook}/>
                                          </span>
                                          <span className="btn-inner--text">Facebook</span>
                                        </Button>

                                        <Button
                                          href={`https://twitter.com/intent/tweet?url=www.phly.co/public/${this.props.match.params.id}`}
                                          target="_blank"
                                          className="button btn btn-twitter btn-block btn-icon btn-2 mt-3"
                                        >
                                          <span className="btn-inner--icon">
                                            <FontAwesomeIcon icon={faTwitter}/>
                                          </span>
                                          <span className="btn-inner--text">Twitter</span>
                                        </Button>
                                      </Col>
                                    </Row>
                                  </CardBody>
                                </Card>
                              </Col>
                            </Row>
                          }
                        </div>
                      }
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </div>
            </Container>
          </section>
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
