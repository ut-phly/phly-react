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
    Progress
} from 'semantic-ui-react';

import { Campaigns } from '../../api/campaigns.js';

var options = [
  [ 'st_judes', 'St. Judes Children Hospital' ],
  [ 'miracle_network', 'Miracle Network' ],
  [ 'texas_food_bank', 'Texas Food Bank' ]
]
var np_translation = new Map(options);

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
      console.log(Meteor.isProduction);
      console.log(Meteor.settings.public.env);
      var self = this;
      Meteor.call('getClientToken', function(error, clientToken) {
          if (error) {
            console.log(error);
          } else {
            braintree.setup(clientToken, "dropin", {
              container: "payment-form", // Injecting into <div id="payment-form"></div>

              paypal: {
                style: {
                  size: 'responsive'
                }
              },


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
            nonprofit = np_translation.get(this.props.campaign.nonprofit);
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
                      <Grid.Column desktop={8} mobile={15}>
                          <Header as='h1'
                                  color='orange'
                                  style={{
                                      fontSize: '6em',
                                      letterSpacing: '1.5px' }}>
                              {name}
                          </Header>
                          <p style={{ fontSize: '3em' }}>for {nonprofit}</p>
                          <Progress percent={totalRaised * 100 / goalAmount} progress color='orange'/>
                          <p style={{ fontSize: '1.5em' }}>{description}</p>
                          { !this.state.done ?
                            <Form role="form">
                              <Form.Field>
                                  <Input
                                    style={{ paddingTop: '1em', paddingBottom: '1em' }}
                                    label="$"
                                    type="number"
                                    id="donation_amount"
                                    placeholder="00.00"
                                    size="massive"
                                    min="0.01" step="0.01"/>
                              </Form.Field>
                              <Form.Field>
                                  <div id="payment-form"></div>
                              </Form.Field>
                              <Button type="submit" color="orange" size="massive">Submit</Button>
                              <p>Check out our <Link to="/policies">privacy policy</Link> and <Link to="/tos">terms of service</Link></p>
                            </Form>
                            :
                            <Message positive>
                                <Header>Thank you for your donation!</Header>
                                <p>Refresh to donate again</p>
                            </Message>
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
