import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import { Mongo } from 'meteor/mongo';
import classnames from 'classnames';

import { withHistory, Link, Redirect } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ReactDatetime from 'react-datetime';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  FacebookShareButton,
  TwitterShareButton
} from 'react-share';

import { Campaigns } from '../../api/campaigns.js';
import { Donations } from '../../api/donations.js';

import {
  Progress,
  Container,
  Col,
  Row,
  Card,
  CardBody,
  CardTitle,
  CardHeader,
  Button,
  Table,
  Modal,
  Form,
  FormGroup,
  Input,
  InputGroup,
  CustomInput,
  Alert,
} from 'reactstrap';

import {
  faDollarSign,
  faDonate,
  faGlassCheers,
  faHeart,
  faCopy,
  faEdit,
} from '@fortawesome/free-solid-svg-icons';

import {
  faFacebook,
  faTwitter
} from '@fortawesome/free-brands-svg-icons';

var QRCode = require('qrcode.react');
//var ShortUrl = require('node-url-shortener');
//import GoogleUrlShortner from 'react-google-url-shortner';

STATES = ['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming']

export default class CampaignPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deleted: false,
            editing: false,
            public: false,
            name: '',
            description: '',
            startDate: new Date(),
            endDate: new Date(),
            goalAmount: 0,
            share: false,
            endCampaign: false,
            showAlert: false,
            payTo: '',
            payWith: '',
            handle: '',
            handle2: '',
            address: '',
            address2: '',
            city: '',
            state: '',
            zipcode: '',
            donationLink: '',
        }

    }

    getQRCode = () => {
      var url = `https://www.phly.co/public/${this.props.match.params.id}`;
      return (<QRCode value={url} renderAs='canvas'/>);
    }

    handleSave = () => {
        var campaign = {
            name: this.state.name,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            description: this.state.description,
            nonprofit: this.state.nonprofit,
            goalAmount: this.state.goalAmount
        }
        console.log(campaign);
        Meteor.call('campaigns.edit', campaign, this.props.match.params.id);
        this.setState({ editing: false });
    }


    handleDelete = () => {
        Meteor.call('campaigns.delete', this.props.match.params.id);
        this.setState({ deleted: true });
    }

    handlePublic = () => {
        this.setState({ public: true });
    }


    handleEdit = () => {
      var obj = Campaigns.findOne({ _id: this.props.match.params.id });
      this.setState({
        editing: true,
        name: obj.name,
        startDate: obj.startDate,
        endDate: obj.endDate,
        description: obj.description,
        nonprofit: obj.nonprofit,
        goalAmount: obj.goalAmount
      });
    }


    handleChange = (key) => {
        return function(e){
            var state = {};
            state[key] = e.target.value;
            this.setState(state);
        }.bind(this);
    }

    handleStartDayChange = (day) => {
        this.setState({startDate: day.toDate()});
    }

    handleEndDayChange = (day) => {
        this.setState({endDate: day.toDate()});
    }

    getDonations = (donations) => {
      return donations.map((don) => {
        return (
          <tr key={don._id}>
            <td>{don.donor}</td>
            <td>${Math.round(don.amount * 100) / 100}</td>
          </tr>
        )
      })
    }

    showStateSelector = () => {

      return STATES.map((state) => {
        return (<option>{state}</option>)
      });

    }

    toggleModal = (modalType) => {
      if(modalType == ("share")){
        this.setState({ share: !this.state.share });
      } else if (modalType == ("endCampaign")) {
        this.setState({
          endCampaign: !this.state.endCampaign,
          payTo: '',
          payWith: '',
          handle: '',
          address: '',
          address2: '',
          city: '',
          state: '',
          zipcode: '',
          donationLink: '',
          additionalInfo: '',
        });
      }
    }

    handlePayOutFields = (field) => {
      switch(field.formName){
        case "payTo":
          // if (field.label === "my organization"){
          //   this.setState({payTo: "org"});
          // }
          // else if(field.label === "another organization or charity"){
          //   this.setState({payTo: "outsideOrg"});
          // }
          // else if(field.label === "two or more organizations/charities"){
          //   this.setState({payTo: "multOrgs"});
          // }
          if (field.id === 0){
            this.setState({payTo: "org"});
          }
          else if(field.id === 1){
            this.setState({payTo: "outsideOrg"});
          }
          else if(field.id === 2){
            this.setState({payTo: "multOrgs"});
          }

        case "payWith":
          this.setState({payWith: field.label});
      }
    }

    // field = [formName, id, label]
    createAltForm = (field) => {
      var idString = "customeRadio" + field.id

      return(
        <div className="custom-control custom-radio mb-3">
          <input
            className="custom-control-input"
            id={idString}
            name={field.formName}
            type="radio"
            onClick = {() => this.handlePayOutFields(field)}
          />
          <label className="custom-control-label" htmlFor={idString}>
            {field.label}
          </label>
        </div>
      );
    }

    showPaymentOptions = () => {
      var reciever = this.state.payTo;
      if(reciever === '') { return(null); }
      else{
        return(
          <FormGroup>
            <label
             className="form-control-label"
            >
              How would your organization like to receive the campaign funds?
            </label>
            {this.createAltForm({formName: "payWith", id: 3, label: "paypal"})}
            {this.createAltForm({formName: "payWith", id: 4, label: "cashapp"})}
            {this.createAltForm({formName: "payWith", id: 5, label: "venmo"})}
            {this.createAltForm({formName: "payWith", id: 6, label: "check"})}
          </FormGroup>
        );
      }
    }

    handleChange = (key) => {
      return function(e) {
        var state = {};
        state[key] = e.target.value;
        this.setState(state);
      }.bind(this);
    }

    handleEndCampaignSubmit = (event) => {
      event.preventDefault();
      var paymentMethod = this.state.payWith;
      if (( paymentMethod === "paypal" || paymentMethod === "cashapp" || paymentMethod === "venmo")
          && ( this.state.handle !== this.state.handle2 )){
            this.setState({showAlert: ! this.state.showAlert});
      } else {
        var campaign = {
          payTo: this.state.payTo,
          payWith: this.state.payWith,
          handle: this.state.handle,
          address: this.state.address,
          address2: this.state.address2,
          city: this.state.city,
          state: this.state.state,
          zipcode: this.state.zipcode,
          donationLink: this.state.donationLink,
          additionalInfo: this.state.additionalInfo,
        }
        console.log(campaign);
        Meteor.call('campaigns.updatePayment', campaign, this.props.match.params.id);
      }
    }

    showPaymentInfoFields = () => {
      var paymentMethod = this.state.payWith;
      var handleString1 = paymentMethod === "paypal" ?
        "Enter the email linked to your organization's PayPal."
        : "Enter your " + paymentMethod + " handle.";
      var handleString2 = paymentMethod === "paypal" ?
        "Re-enter the email linked to your organization's PayPal."
        : "Re-enter your " + paymentMethod + " handle.";
      var filler = paymentMethod === "paypal" ? "paypal@email.com" : "handle";
      if( this.state.payTo === "outsideOrg" ) {
        return(
          <div>
            <FormGroup>
              <label
                className="form-control-label"
                htmlFor="donationLink"
              >
                Link to charity/organization website
              </label>
              <Input
                className="form-control-alternative"
                id="donationLink"
                placeholder="Paste the link to the org/charitity's website here..."
                type="text"
                onChange={this.handleChange("donationLink")}
              />
            </FormGroup>
            <FormGroup>
              <label
                className="form-control-label"
                htmlFor="additionalInfo"
              >
                Additional Information
              </label>
              <Input
                className="form-control-alternative"
                id="additionalInfo"
                placeholder="Include any additional information for sending the proceeds"
                type="text"
                onChange={this.handleChange("additionalInfo")}
              />
            </FormGroup>
          </div>
        )
      }
      else if ( this.state.payTo === "multOrgs"){
        return(
          <FormGroup>
            <label
              className="form-control-label"
              htmlFor="addInfo"
            >
              We would love to help you send the funds to muliple organizations/charities.
              Please describe your situation below and our team will contact you in 3-5 business days.
            </label>
            <Input
              className="form-control-alternative"
              id="addInfo"
              placeholder="Name the organizations and the amounts..."
              type="textarea"
              onChange={this.handleChange("additionalInfo")}
            />
          </FormGroup>
        );
      }
      else if ( paymentMethod === "paypal" || paymentMethod === "cashapp" || paymentMethod === "venmo") {
        return(
          <div>
            <FormGroup>
              <label
                className="form-control-label"
                htmlFor="handle"
              >
                {handleString1}
              </label>
              <Input
                className="form-control-alternative"
                id="handle"
                placeholder={filler}
                type="text"
                onChange={this.handleChange("handle")}
              />
            </FormGroup>
            <FormGroup>
              <label
                className="form-control-label"
                htmlFor="re-enter-handle"
              >
                {handleString2}
              </label>
              <Input
                className="form-control-alternative"
                id="re-enter-handle"
                placeholder={filler}
                type="text"
                onChange={this.handleChange("handle2")}
              />
            </FormGroup>
          </div>
        );
      }
      else if ( paymentMethod === "check" ) {
        return (
          <div>
            <FormGroup>
              <label
                className="form-control-label"
                htmlFor="primary-address"
              >
                Address
              </label>
              <Input
                className="form-control-alternative"
                id="primary-address"
                placeholder="1234 Main Street"
                type="text"
                onChange={this.handleChange("address")}
              />
            </FormGroup>
            <FormGroup>
              <label
                className="form-control-label"
                htmlFor="secondary-address"
              >
                Address 2
              </label>
              <Input
                className="form-control-alternative"
                id="secondary-address"
                placeholder="Apartment, studio, or floor"
                type="text"
                onChange={this.handleChange("address2")}
              />
            </FormGroup>
            <Row>
              <Col md="4">
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="City"
                  >
                    City
                  </label>
                  <Input
                    className="form-control-alternative"
                    id="City"
                    placeholder="City"
                    type="text"
                    onChange={this.handleChange("city")}
                  />
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="state"
                  >
                    State
                  </label>
                  <Input
                    className="form-control-alternative"
                    id="state"
                    type="select"
                    onChange={this.handleChange("state")}
                  >
                    {this.showStateSelector()}
                  </Input>
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="Zip-Code"
                  >
                    Zip Code
                  </label>
                  <Input
                    className="form-control-alternative"
                    id="Zip-Code"
                    placeholder="Zip Code"
                    type="text"
                    onChange={this.handleChange("zipcode")}
                  />
                </FormGroup>
              </Col>
            </Row>
          </div>
        );
      }
    }

    endCampaignForm = () => {
      return(
        <div>
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              END CAMPAIGN FORM
            </h5>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => this.toggleModal("endCampaign")}
            >
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <div className="modal-body">
            <FormGroup>
              <label
               className="form-control-label"
              >
                Where do you want the proceeds of this campaign to go?
              </label>
              {this.createAltForm({formName: "payTo", id: 0, label: "my organization"})}
              {this.createAltForm({formName: "payTo", id: 1, label: "another organization or charity"})}
              {this.createAltForm({formName: "payTo", id: 2, label: "two or more organizations/charities"})}
            </FormGroup>
            {this.state.payTo === "org" ? this.showPaymentOptions() : null}
            {this.showPaymentInfoFields()}
            {this.state.showAlert ?
              <Alert color="warning">
                <strong>Warning!</strong> Please check if your handle is correct
              </Alert>
              : null
            }
          </div>
          <div className="modal-footer">
            <Button color="primary" type="button" onClick={(event) => this.handleEndCampaignSubmit(event)}>
              Submit
            </Button>
          </div>
        </div>
      );
    }

    render() {
        if (this.state.deleted === true) return <Redirect to='/home'/>

        var obj = Campaigns.findOne({ _id: this.props.match.params.id });
        var donations = Donations.find({campaign: this.props.match.params.id}).fetch();

        let totalRaised = 0;
        let totalDonations = 0;
        let lastDonation = {};
        if (donations) {
          donations.forEach(calculateTotal);
          function calculateTotal(donation, index){
            totalRaised += donation.amount;
            totalDonations++;
            lastDonation = donation;
          }
        }
        if (obj != null) {
            var campName = obj.name;
            var campDes = obj.description;
            var campStartDate = obj.startDate;
            var startString = campStartDate.toLocaleDateString();
            var campEndDate = obj.endDate;
            var endString = campEndDate.toLocaleDateString();
            var nonprofit = obj.nonprofit;
            var goalAmount = obj.goalAmount;
        }

        let percent = Math.round(totalRaised * 100 / goalAmount);

        return (
            <div>
              <div className="header bg-gradient-primary py-8">
                <Container fluid>
                  <div className="header-body">
                    <Row>
                      <Col col="6" xl="3">
                        <Card className="card-stats mb-4 mb-xl-0 shadow">
                          <CardBody>
                            <Row>
                              <div className="col">
                                <CardTitle
                                  tag="h5"
                                  className="text-uppercase text-muted mb-0"
                                >
                                  Total Raised
                                </CardTitle>
                                <span className="h2 font-weight-bold mb-0">
                                  ${totalRaised}
                                </span>
                              </div>
                              <Col className="col-auto">
                                <div className="icon icon-shape bg-primary text-white rounded-circle shadow">
                                  <FontAwesomeIcon icon={faDollarSign}/>
                                </div>
                              </Col>
                            </Row>
                            <p className="mt-3 mb-0 text-muted text-sm">
                              <span className="text-nowrap">Since {startString}</span>
                            </p>
                          </CardBody>
                        </Card>
                      </Col>
                      <Col col="6" xl="3">
                        <Card className="card-stats mb-4 mb-xl-0 shadow">
                          <CardBody>
                            <Row>
                              <div className="col">
                                <CardTitle
                                  tag="h5"
                                  className="text-uppercase text-muted mb-0"
                                >
                                  Payments
                                </CardTitle>
                                <span className="h2 font-weight-bold mb-0">
                                  {totalDonations}
                                </span>
                              </div>
                              <Col className="col-auto">
                                <div className="icon icon-shape bg-secondary text-white rounded-circle shadow">
                                  <FontAwesomeIcon icon={faDonate}/>
                                </div>
                              </Col>
                            </Row>
                            <p className="mt-3 mb-0 text-muted text-sm">
                              <span className="text-nowrap">Since {startString}</span>
                            </p>
                          </CardBody>
                        </Card>
                      </Col>
                      <Col col="6" xl="3">
                        <Card className="card-stats mb-4 mb-xl-0 shadow">
                          <CardBody>
                            <Row>
                              <div className="col">
                                <CardTitle
                                  tag="h5"
                                  className="text-uppercase text-muted mb-0"
                                >
                                  Last Payment
                                </CardTitle>
                                <span className="h2 font-weight-bold mb-0">
                                  { lastDonation.amount ? `$${Math.round(lastDonation.amount * 100) / 100}` : "--" }
                                </span>
                              </div>
                              <Col className="col-auto">
                                <div className="icon icon-shape bg-default text-white rounded-circle shadow">
                                  <FontAwesomeIcon icon={faGlassCheers}/>
                                </div>
                              </Col>
                            </Row>
                            <p className="mt-3 mb-0 text-muted text-sm">
                              <span className="text-nowrap">{ lastDonation.donor ? `from ${lastDonation.donor}` : "Make your first campaign!"}</span>
                            </p>
                          </CardBody>
                        </Card>
                      </Col>
                      <Col col="6" xl="3">
                        <Card className="card-stats mb-4 mb-xl-0 shadow">
                          <CardBody>
                            <Row>
                              <div className="col">
                                <CardTitle
                                  tag="h5"
                                  className="text-uppercase text-muted mb-0"
                                >
                                  Progress
                                </CardTitle>
                                <span className="h2 font-weight-bold mb-0">
                                  {percent}%
                                </span>
                              </div>
                              <Col className="col-auto">
                                <div className="icon icon-shape bg-primary text-white rounded-circle shadow">
                                  <FontAwesomeIcon icon={faHeart}/>
                                </div>
                              </Col>
                            </Row>
                            <p className="mt-3 mb-0 text-muted text-sm">
                              <span className="text-nowrap">of goal raised</span>
                            </p>
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                  </div>
                </Container>
              </div>
              <Container className="mt--7 mb-5" fluid>
                <Row className="mt-3">
                  <Col md="8">
                    <Card className="shadow">
                      <CardHeader className="border-0">
                        <Row className="align-items-center">
                          <Col xs="4">
                            <div className="col">
                              <h6 className="text-uppercase text-light ls-1 mb-1">
                                Overview
                              </h6>
                              { this.state.editing ?
                                <Input
                                  className="form-control-alternative"
                                  id="input-name"
                                  defaultValue={campName}
                                  type="text"
                                  onChange={this.handleChange("name")}
                                />
                                :
                                <h2 className="mb-0 font-weight-bold">{campName}</h2>
                              }
                            </div>
                          </Col>
                          <Col className="text-right" xs="8">
                            <Button
                              color="primary"
                              onClick={() => this.toggleModal("endCampaign")}
                            >
                              End Campaign
                            </Button>
                            <Modal
                              className="modal-dialog-centered"
                              isOpen={this.state.endCampaign}
                              toggle={() => this.toggleModal("endCampaign")}
                            >
                              {this.endCampaignForm()}
                            </Modal>
                            <Button
                              className="btn-icon btn-2"
                              color="primary"
                              type="button"
                              onClick={() => this.handleEdit()}
                            >
                              <span className="btn-inner--icon">
                                <FontAwesomeIcon icon={faEdit}/>
                              </span>
                            </Button>
                            <Button
                              color="primary"
                              onClick={() => this.toggleModal("share")}
                            >
                              Share
                            </Button>
                            <Modal
                              className="modal-dialog-centered"
                              isOpen={this.state.share}
                              toggle={() => this.toggleModal("share")}
                            >
                              <div className="modal-header">
                                <h4 className="modal-title" id="shareModalLabel">
                                  Share your campaign
                                </h4>
                                <button
                                  aria-label="Close"
                                  className="close"
                                  data-dismiss="modal"
                                  type="button"
                                  onClick={() => this.toggleModal("share")}
                                >
                                  <span aria-hidden={true}>×</span>
                                </button>
                              </div>
                              <div className="modal-body">
                                <Container fluid>
                                  <Row className="mb-3">
                                    <Col className="text-center" xs="6">
                                      <p>Download QR code</p>
                                      <div>
                                        {this.getQRCode()}
                                      </div>
                                    </Col>
                                    <Col xs="6" className="text-center">
                                      <p>Or share the link</p>
                                      <CopyToClipboard
                                        text={`https://www.phly.co/public/${this.props.match.params.id}`}
                                      >
                                        <Button
                                          className="btn-icon btn-2"
                                          color="primary"
                                          type="button"
                                        >
                                          <span className="btn-inner--icon">
                                            <FontAwesomeIcon icon={faCopy}/>
                                          </span>
                                          <span className="btn-inner--text">Copy</span>
                                        </Button>
                                      </CopyToClipboard>
                                      <FacebookShareButton className="mt-3" url={`https://www.phly.co/public/${this.props.match.params.id}`}>
                                        <Button
                                          className="btn-icon btn-2"
                                          color="primary"
                                          type="button"
                                        >
                                          <span className="btn-inner--icon">
                                            <FontAwesomeIcon icon={faFacebook}/>
                                          </span>
                                          <span className="btn-inner--text">Facebook</span>
                                        </Button>
                                      </FacebookShareButton>
                                      <TwitterShareButton className="mt-3" url={`https://www.phly.co/public/${this.props.match.params.id}`}>
                                        <Button
                                          className="btn-icon btn-2"
                                          color="primary"
                                          type="button"
                                        >
                                          <span className="btn-inner--icon">
                                            <FontAwesomeIcon icon={faTwitter}/>
                                          </span>
                                          <span className="btn-inner--text">Twitter</span>
                                        </Button>
                                      </TwitterShareButton>
                                    </Col>
                                  </Row>
                                </Container>
                              </div>
                            </Modal>

                          </Col>
                        </Row>
                      </CardHeader>
                      <CardBody className="mb-3">
                        <Row>
                          <Col>
                            <div className="col">
                              <h6 className="text-uppercase text-light ls-1 mb-1">
                                Description
                              </h6>
                              { this.state.editing ?
                                <Input
                                  className="form-control-alternative"
                                  id="input-description"
                                  defaultValue={campDes}
                                  rows="5"
                                  type="textarea"
                                  onChange={this.handleChange("description")}
                                />
                                :
                                <p>{campDes}</p>
                              }
                            </div>
                          </Col>
                        </Row>
                        <Row className="mt-4">
                          <Col>
                            <div className="col">
                              <h6 className="text-uppercase text-light ls-1 mb-1">
                                Nonprofit
                              </h6>
                              { this.state.editing ?
                                <Input
                                  className="form-control-alternative"
                                  id="input-np"
                                  defaultValue={nonprofit}
                                  type="text"
                                  onChange={this.handleChange("nonprofit")}
                                />
                                :
                                <h4>{nonprofit}</h4>
                              }
                            </div>
                          </Col>
                        </Row>
                        <Row className="mt-4">
                          <Col xs="6">
                            <div className="col">
                              <h6 className="text-uppercase text-light ls-1 mb-1">
                                Start Date
                              </h6>
                              { this.state.editing ?
                                <ReactDatetime
                                  defaultValue={campStartDate}
                                  timeFormat={false}
                                  id="input-start"
                                  onChange={this.handleStartDayChange}
                                />
                                :
                                <h4>{startString}</h4>
                              }
                            </div>
                          </Col>
                          <Col xs="6">
                            <div className="col">
                              <h6 className="text-uppercase text-light ls-1 mb-1">
                                End Date
                              </h6>
                              { this.state.editing ?
                                <ReactDatetime
                                  defaultValue={campEndDate}
                                  timeFormat={false}
                                  id="input-start"
                                  onChange={this.handleEndDayChange}
                                />
                                :
                                <h4>{endString}</h4>
                              }
                            </div>
                          </Col>
                        </Row>
                        { this.state.editing ?
                          <Row className="mt-4">
                            <Col className="text-right" xs="12">
                              <Button
                                color="primary"
                                onClick={() => this.handleSave()}
                              >
                                Save
                              </Button>
                            </Col>
                          </Row> : ""
                        }
                      </CardBody>
                    </Card>
                  </Col>
                  <Col md="4">
                    <Card className="shadow">
                      <CardHeader className="border-0">
                        <Row className="align-items-center">
                          <Col xs="8">
                            <div className="col">
                              <h6 className="text-uppercase text-light ls-1 mb-1">
                                Goal
                              </h6>
                              { this.state.editing ?
                                <Input
                                  className="form-control-alternative"
                                  id="input-goal"
                                  defaultValue={goalAmount}
                                  type="number"
                                  onChange={this.handleChange("goalAmount")}
                                />
                                :
                                <h2 className="mb-0 font-weight-bold">${goalAmount}</h2>
                              }
                            </div>
                          </Col>
                        </Row>
                      </CardHeader>
                      <CardBody className="mb-3">
                        <Row>
                          <Col>
                            <div className="col">
                              <h6 className="text-uppercase text-light ls-1 mb-1">
                                Progress
                              </h6>
                              <Row>
                                <Col xs="10">
                                  <Progress
                                    max="100"
                                    className="mt-2"
                                    value={`${percent}`}
                                    barClassName="bg-danger"
                                  />
                                </Col>
                                <Col xs="2">
                                  <p className="float-right">{percent}%</p>
                                </Col>
                              </Row>
                            </div>
                          </Col>
                        </Row>
                      </CardBody>
                      <Table className="align-items-center table-flush" responsive>
                        <thead className="thead-light">
                          <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Payment</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.getDonations(donations)}
                        </tbody>
                      </Table>
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
                          {campName}
                        </Header>
                        <Modal trigger={<Button floated='right'><Icon name='external'/>Share</Button>} size='small'>
                          <Header icon='plus' content='Share your campaign'/>
                          <Modal.Content>
                            <p>
                              Your external link is: <Link to={`/public/${this.props.match.params.id}`}>phly.co/public/{this.props.match.params.id}</Link>
                            </p>
                            <div>{this.getQRCode()}</div>
                          </Modal.Content>
                          <Modal.Actions>
                            <CopyToClipboard text={`phly.co/public/${this.props.match.params.id}`}>
                              <Button color='green' inverted>
                                <Icon name='copy'/> Copy
                              </Button>
                            </CopyToClipboard>
                          </Modal.Actions>
                        </Modal>
                    </Segment>
                    <Segment style={{ backgroundColor: '#F9FFFF', margin: 0 }} basic>
                        <Grid columns={2}>
                            <Grid.Column>
                                <Grid.Row className="mt-5 ml-3">
                                  <Header sub>Non-Profit</Header>
                                </Grid.Row>
                                <Grid.Row className="ml-3">
                                  <p>{nonprofit}</p>
                                </Grid.Row>
                                <Grid.Row className="mt-5 ml-3">
                                  <Header sub>Goal</Header>
                                </Grid.Row>
                                <Grid.Row className="ml-3">
                                  <p>{'$'}{goalAmount}</p>
                                </Grid.Row>
                                <Grid.Row className="mt-5 ml-3">
                                  <Header sub>Description</Header>
                                </Grid.Row>
                                <Grid.Row className="ml-3">
                                  <p>{campDes}</p>
                                </Grid.Row>
                                <Grid.Row className="mt-5 ml-3">
                                  <Header sub>Donations</Header>
                                </Grid.Row>
                                <Grid.Row className="ml-3">
                                  <p>Total: ${totalRaised}</p>
                                </Grid.Row>
                            </Grid.Column>
                            <Grid.Column>
                                <Grid.Row className="mt-5 ml-3">
                                  <Header sub>Start Date</Header>
                                </Grid.Row>
                                <Grid.Row className="ml-3">
                                  <p>{startString}</p>
                                </Grid.Row>
                                <Grid.Row className="mt-5 ml-3">
                                  <Header sub>End Date</Header>
                                </Grid.Row>
                                <Grid.Row className="ml-3">
                                  <p>{endString}</p>
                                </Grid.Row>
                                <Grid.Row className="mt-5 ml-3">
                                  <Header sub>QR Code</Header>
                                </Grid.Row>
                                <Grid.Row className="ml-3">
                                  <div>{this.getQRCode()}</div>
                                </Grid.Row>
                            </Grid.Column>
                        </Grid>
                    </Segment>
                </Responsive>
            */}
          </div>
        );
    }
}
