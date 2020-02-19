import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { withHistory, Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Donations } from '../../api/donations.js';
import { Payments } from '../../api/donations.js';

//import '../../api/payments.js';
import { HTTP } from 'meteor/http';
import {
    Button,
    Form,
    Responsive,
    Segment,
    Grid,
    Header,
    Input,
    Message,
    Progress,
} from 'semantic-ui-react';

import { Campaigns } from '../../api/campaigns.js';

class PublicCampaignPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            clientToken: '',
            done: false,
            error: ''
        }

    }

    componentDidMount() {
      //console.log(Meteor.isProduction);
      //console.log(Meteor.settings.public.env);
      var self = this;

      /*
      Meteor.call('getClientToken', function(error, clientToken) {
          if (error) {
            console.log(error);
          } else {
            braintree.setup(clientToken, "dropin", {
              container: "payment-form", // Injecting into <div id="payment-form"></div>


              onPaymentMethodReceived: function (response) {
                // When we submit the payment form,
                // it'll create new customer first...
                var nonce = response.nonce;

                let donation_amount = document.getElementById('donation_amount').value;
                donation_amount = parseFloat(donation_amount);
                if (donation_amount) {
                  donation_amount += .31;
                  console.log(donation_amount);
                  Meteor.call('createTransaction', nonce, donation_amount, function(error, success) {
                    if (error) {
                      throw new Meteor.Error('transaction-creation-failed');
                    } else {
                      var donation = {
                        campaign: self.props.campaign._id,
                        nonprofit: self.props.campaign.nonprofit,
                        amount: donation_amount
                      }
                      Meteor.call('donations.insert', donation);
                      self.setState({ done: true, error: '' })
                    }
                  });
                } else {
                  self.setState({ error: "Donation amount is invalid" });
                }

              }
            });
          }
      });
      */

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
            }, function (err, instance) {
              console.log("Made it here");
              if (err) {
                console.log(err);
                return;
              }


              form.addEventListener('submit', function() {
                instance.requestPaymentMethod(function(err, payload) {
                  if (err) {
                    console.log(err);
                    return;
                  }

                  let donation_amount = document.getElementById('new-donation-am').value;
                  let donor = document.getElementById('donor').value;
                  donation_amount = parseFloat(donation_amount);
                  if (donation_amount && donor) {
                    donation_amount += .31;

                    Meteor.call('createTransaction', payload.nonce, donation_amount, function(error, success) {
                      if (error) {
                        self.setState({ error: "Transaction creation failed" });
                      } else {
                        var donation = {
                          donor: donor,
                          campaign: self.props.campaign._id,
                          nonprofit: self.props.campaign.nonprofit,
                          amount: donation_amount - .31
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

    handleNewDonation = () => {
      this.setState({
        done: false
      })
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
            org = this.props.campaign.owner;
            goalAmount = this.props.campaign.goalAmount;
        }

        var totalRaised = 0;
        if (this.props.donations) {
          this.props.donations.forEach(calculateTotal);
          function calculateTotal(donation, index){
            totalRaised += donation.amount;
          }
        }

      return (
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
                          <Progress percent={totalRaised * 100 / goalAmount} label={`$${totalRaised}`} color='orange'/>
                          <p style={{ fontSize: '1.5em' }}>{description}</p>

                          { !this.state.done ?
                            <Form id="dropin-form">
                              <Form.Field>
                                <Input
                                  style={{ paddingTop: '1em' }}
                                  type="text"
                                  id="donor"
                                  placeholder="Name"
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
                              <p style={{ color: "gray" }}><i>Phly adds an additional flat .31 cent platform fee to your donation tp help us maintain our platform and offer our service to student organizations for free</i></p>
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
      );
    }
}

export default CampaignContainer = withTracker(props => {
    Meteor.subscribe('campaigns');
    Meteor.subscribe('donations');
    let campaign = Campaigns.findOne({ _id: props.match.params.id });
    let donations = Donations.find({campaign: props.match.params.id}).fetch();
    return {
        campaign: campaign,
        donations: donations
    }
})(PublicCampaignPage);
