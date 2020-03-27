import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import { Mongo } from 'meteor/mongo';

import { withHistory, Link, Redirect } from 'react-router-dom';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
  Modal
} from 'reactstrap';

import {
  faDollarSign,
  faDonate,
  faGlassCheers,
  faHeart,
  faCopy
} from '@fortawesome/free-solid-svg-icons';

var QRCode = require('qrcode.react');
//var ShortUrl = require('node-url-shortener');
//import GoogleUrlShortner from 'react-google-url-shortner';

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
            share: false
        }

    }

    getQRCode = () => {
      var url = `https://www.phly.co/public/${this.props.match.params.id}`;
      return (<QRCode value={url} renderAs='canvas'/>);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const date = new Date();
        var campaign = {
            name: this.state.name,
            owner: Meteor.userId(),
            username: Meteor.user().username,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            description: this.state.description,
            nonprofit: this.state.nonprofit,
            goalAmount: this.state.goalAmount
        }
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

/*
    handleEdit = () => {
        this.setState({ editing: true });
    }
*/

    handleChange = (key) => {
        return function(e){
            var state = {};
            state[key] = e.target.value;
            this.setState(state);
        }.bind(this);
    }

    handleStartDayChange = (day) => {
        this.setState({startDate: day});
    }

    handleEndDayChange = (day) => {
        this.setState({endDate: day});
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

    toggleModal = () => {
      this.setState({ share: !this.state.share });
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

        if (this.state.editing === true) {
            return (
                <div>
                </div>
            )
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
                          <Col xs="8">
                            <div className="col">
                              <h6 className="text-uppercase text-light ls-1 mb-1">
                                Overview
                              </h6>
                              <h2 className="mb-0 font-weight-bold">{campName}</h2>
                            </div>
                          </Col>
                          <Col className="text-right" xs="4">
                            <Button
                              color="primary"
                              onClick={() => this.toggleModal()}
                            >
                              Share
                            </Button>

                            <Modal
                              className="modal-dialog-centered"
                              isOpen={this.state.share}
                              toggle={() => this.toggleModal()}
                            >
                              <div className="modal-header">
                                <h5 className="modal-title" id="shareModalLabel">
                                  Share your campaign
                                </h5>
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
                                      <p>Download QR code or link and share</p>
                                      <div>
                                        {this.getQRCode()}
                                      </div>
                                      <a
                                        className="mt-3 mr-3"
                                        href={`https://www.phly.co/public/${this.props.match.params.id}`}
                                      >
                                        {`https://www.phly.co/public/${this.props.match.params.id}`}
                                      </a>
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
                                        </Button>
                                      </CopyToClipboard>
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
                              <p>{campDes}</p>
                            </div>
                          </Col>
                        </Row>
                        <Row className="mt-4">
                          <Col>
                            <div className="col">
                              <h6 className="text-uppercase text-light ls-1 mb-1">
                                Nonprofit
                              </h6>
                              <h4>{nonprofit}</h4>
                            </div>
                          </Col>
                        </Row>
                        <Row className="mt-4">
                          <Col xs="6">
                            <div className="col">
                              <h6 className="text-uppercase text-light ls-1 mb-1">
                                Start Date
                              </h6>
                              <h4>{startString}</h4>
                            </div>
                          </Col>
                          <Col xs="6">
                            <div className="col">
                              <h6 className="text-uppercase text-light ls-1 mb-1">
                                End Date
                              </h6>
                              <h4>{endString}</h4>
                            </div>
                          </Col>
                        </Row>
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
                              <h2 className="mb-0 font-weight-bold">${goalAmount}</h2>
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
