import React, { Component } from 'react';
import { withHistory, Link, Redirect } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';

import Navigation from '../components/Navigation.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  Container,
  Col, Row,
  Card,
  CardHeader,
  CardBody,
  Progress,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

import {
  faUsers
} from '@fortawesome/free-solid-svg-icons';

import { Campaigns } from '../../api/campaigns.js';
import { Organizations } from '../../api/organizations.js';
import { Donations } from '../../api/donations.js';

class Marketplace extends Component {

    renderCampaigns = (campaigns, organizations, donations) => {
      campaigns.reverse();
      campaigns = campaigns.filter((camp) => {
        if (camp.complete) return false;
        if (donations.some((don) => don.campaign == camp._id)) return true;
        else return false;
      });

      return campaigns.map((camp, i) => {
        let org = organizations.find((org) => org._id == camp.owner) ? organizations.find((org) => org._id == camp.owner).name : "";
        let totalRaised = 0;
        donations.forEach((don) => {
          if (don.campaign == camp._id) totalRaised += don.amount;
        })
        return (
          <Col lg="4" xs="12" className="my-4" key={i} tag={Link} to={`/public/${camp._id}`}>
            <Card className="shadow">
              <CardHeader className="h3 font-weight-bold mb-0">
                {camp.name}
              </CardHeader>
              <CardBody>
                <h4>
                  <span className="mr-3">
                    <FontAwesomeIcon icon={faUsers}/>
                  </span>
                  <span>{org}</span>
                  <span>
                    <h4 className="float-right">${totalRaised}</h4>
                  </span>
                </h4>
                <Row className="mt-3">
                  <Col xs="12">
                    <Progress
                      max="100"
                      className="mt-2"
                      value={`${Math.round(totalRaised * 100 / camp.goalAmount)}`}
                      barClassName="bg-danger"
                    />
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        );
      });
    }

    renderPastCampaigns = (campaigns, organizations, donations) => {
      campaigns.reverse();
      campaigns = campaigns.filter((camp) => {
        if (camp.complete && donations.some((don) => don.campaign == camp._id)) return true;
        else return false;
      });

      return campaigns.map((camp, i) => {
        let org = organizations.find((org) => org._id == camp.owner) ? organizations.find((org) => org._id == camp.owner).name : "";
        let totalRaised = 0;
        donations.forEach((don) => {
          if (don.campaign == camp._id) totalRaised += don.amount;
        })
        return (
          <Col lg="4" xs="12" className="my-4" key={i} tag={Link} to={`/public/${camp._id}`}>
            <Card className="shadow">
              <CardHeader className="h3 font-weight-bold mb-0 text-muted">
                {camp.name}
              </CardHeader>
              <CardBody>
                <h4 className="text-muted">
                  <span className="mr-3">
                    <FontAwesomeIcon icon={faUsers}/>
                  </span>
                  <span>{org}</span>
                  <span>
                    <h4 className="float-right text-muted">${totalRaised}</h4>
                  </span>
                </h4>
                <Row className="mt-3">
                  <Col xs="12">
                    <h4 className="text-success font-weight-bold">Complete</h4>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        );
      });
    }

    render() {
        const { campaigns, organizations, donations } = this.props;

        let items = [];
        this.props.campaigns.forEach(function(campaign) {
            let np = (campaign.nonprofit) ? campaign.nonprofit : 'Miracle Network';
            items.push({
                header: campaign.name,
                description: campaign.description,
                meta: np,
                href: `/public/${campaign._id}`,
                link: true
            });
        });

        return (
            <div>
              <Navigation transparent mobile/>
              <main>
                <section className="section bg-gradient-primary section-shaped section-lg">
                  <Container className="py-lg-md d-flex">
                    <div className="col px-0">
                      <Row>
                        {this.renderCampaigns(campaigns, organizations, donations)}
                        {this.renderPastCampaigns(campaigns, organizations, donations)}
                      </Row>
                      <Row></Row>
                    </div>
                  </Container>
                </section>
                <footer className="footer bg-white">
                  <Container>
                    <hr />
                    <Row className=" align-items-center justify-content-md-between">
                      <Col md="6">
                        <div className=" copyright">
                          Call us at <a href="tel:+15125222764">(512) 522-2764</a>
                        </div>
                        <div className=" copyright mt-2">
                          Email us at <a href="mailto:hello@phly.co">hello@phly.co</a>
                        </div>
                        <div className=" copyright">

                          © {new Date().getFullYear()}{" "}
                          <a
                            href="https://www.phly.co"
                          >
                            Phly
                          </a>
                          .
                        </div>
                      </Col>
                      <Col md="6">
                        <Nav className=" nav-footer justify-content-end">
                        <NavItem>
                          <NavLink
                            href="https://www.phly.co"
                            target="_blank"
                          >
                            Phly
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            href="https://www.phly.co"
                            target="_blank"
                          >
                            About Us
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            href="https://www.phly.co/tos"
                            target="_blank"
                          >
                            Terms of Service
                          </NavLink>
                        </NavItem>
                      </Nav>
                      </Col>
                    </Row>
                  </Container>
                </footer>
              </main>
            </div>
        )
    }
}

export default MarketplaceContainer = withTracker(() => {
    Meteor.subscribe('campaigns');
    Meteor.subscribe('organizations');
    Meteor.subscribe('donations');
    let campaigns = Campaigns.find().fetch();
    let organizations = Organizations.find().fetch();
    let donations = Donations.find().fetch();
    return {
        campaigns: campaigns,
        organizations: organizations,
        donations: donations
    }
})(Marketplace);
