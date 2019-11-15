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
    Input
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
            clientToken: ''
        }

    }

    componentDidMount() {
      var self = this;
      Meteor.call('getClientToken', function(error, clientToken) {
          if (error) {
            console.log(error);
          } else {
            self.setState({clientToken: clientToken});
          }
      });
    }

    render() {
        let name = "";
        let description = "";
        let nonprofit = "";
        let org = "";
        if (this.props.campaign) {
            name = this.props.campaign.name;
            description = this.props.campaign.description;
            nonprofit = np_translation.get(this.props.campaign.nonprofit);
            org = this.props.campaign.owner;
        }


        var self = this;

        if (this.state.clientToken) {
          braintree.setup(this.state.clientToken, "dropin", {
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
                  alert('Thank you for your donation!');
                }
              });
            }
          });
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
                          <p style={{ fontSize: '1.5em' }}>{description}</p>
                          <Form role="form">
                            <Form.Field>
                                <Input
                                  style={{ paddingTop: '1em', paddingBottom: '1em' }}
                                  label="$"
                                  type="number"
                                  id="donation_amount"
                                  placeholder="Amount"
                                  size="massive"/>
                            </Form.Field>
                            <Form.Field>
                                <div id="payment-form"></div>
                            </Form.Field>
                            <Button type="submit" color="orange" size="massive">Submit</Button>
                            <p>Check out our <Link to="/policies">privacy policy</Link> and <Link to="/tos">terms of service</Link></p>
                        </Form>
                      </Grid.Column>
                  </Grid>
              </Segment>
          </Responsive>
      );
    }
}

export default CampaignContainer = withTracker(props => {
    Meteor.subscribe('campaigns');
    let campaign = Campaigns.findOne({ _id: props.match.params.id });
    return {
        campaign: campaign
    }
})(PublicCampaignPage);
