import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withHistory, Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import PieChart from 'react-minimal-pie-chart';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IntroModal from '../components/IntroModal.jsx';

import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Button,
  Progress
} from 'reactstrap';

import {
  faDollarSign,
  faDonate,
  faGlassCheers,
  faHeart,
  faArrowRight,
  faShareSquare
} from '@fortawesome/free-solid-svg-icons';

export default class Campaign extends Component {
  constructor(props) {
    super(props);
    this.openIntroModal = React.createRef();
  }

  getCampaigns = (donations) => {
    return this.props.campaigns.map((camp) => {

      let goal = (camp.goalAmount) ? camp.goalAmount : 500;
      let totalDon = 0;
      donations.forEach((don) => {
        if (don.campaign == camp._id) {
          totalDon += don.amount;
        }
      });

      return (
        <Card className="mt-3 shadow" tag={Link} to={`/home/${camp._id}`} key={camp._id}>
          <CardBody>
            <Row className="py-2 px-3">
              <Col md="3">
                <CardTitle
                  className="h3 font-weight-bold mb-0"
                >
                  {camp.name}
                </CardTitle>
              </Col>
              <Col md="2">
                <span className="h3 font-weight-bold mb-3">
                  {`${camp.endDate.toLocaleDateString()}`}
                </span>
              </Col>
              <Col md="2">
                <span className="h3 font-weight-bold mb-0">
                  ${totalDon}
                </span>
              </Col>
              <Col md="2" className="mr-3">
                <span className="h3 font-weight-bold mb-0">
                  ${goal}
                </span>
              </Col>
              <Col md="2" className="mt-3">
                <Progress
                  max={`${goal}`}
                  value={`${totalDon}`}
                  barClassName="bg-danger"
                />
              </Col>
            </Row>
          </CardBody>
        </Card>
      )
    })
  }

  handleIntro = () => {
    this.openIntroModal.current.toggle();
  }

  render() {

    const { donations, campaigns } = this.props;

    // calculate total donations
    let totalDonations = 0;
    let totalRaised = 0;
    let lastDonation = {};
    if (donations) {
      donations.forEach((d, i) => {
        lastDonation = d;
        totalRaised += d.amount;
        totalDonations += 1;
      });
    }


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
                        <span className="text-nowrap">Since you started</span>
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
                        <span className="text-nowrap">Since you started</span>
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
                            Campaigns
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {campaigns.length}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-primary text-white rounded-circle shadow">
                            <FontAwesomeIcon icon={faHeart}/>
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-nowrap">Over the past year</span>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
        <Container className="mt--7 mb-5" fluid>
          <Row>
            <Col>
              <Row className="px-5">
                <Col md="3">
                  <h5 className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block">Name</h5>
                </Col>
                <Col md="2">
                  <h5 className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block">Ends</h5>
                </Col>
                <Col md="2">
                  <h5 className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block">Status</h5>
                </Col>
                <Col md="2" className="mr-3">
                  <h5 className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block">Goal</h5>
                </Col>
                <Col md="2">
                  <h5 className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block">Progress</h5>
                </Col>
              </Row>
              { (campaigns.length == 0) ?
                <Card className="mt-3 shadow">
                  <CardBody>
                    <Row className="py-2 px-3">
                      <Col md="10">
                        <CardTitle
                          className="h3 font-weight-bold mb-0"
                        >
                          Learn about Phly
                        </CardTitle>
                      </Col>
                      <Col md="2" className="text-right">
                        <Button
                          color="primary"
                          onClick={this.handleIntro}
                        >
                          Walkthrough
                        </Button>
                      </Col>
                    </Row>
                    <IntroModal ref={this.openIntroModal}/>
                  </CardBody>
                </Card>
                : this.getCampaigns(donations)
              }
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}
