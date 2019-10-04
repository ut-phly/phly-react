import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { withHistory, Link } from 'react-router-dom';
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

export default class CampaignPage extends Component {
    constructor(props) {
        super(props);
        Meteor.subscribe('campaigns');
    }

    render() {

        let campaign = Campaigns.findOne({ _id: this.props.match.params.id });
        console.log(Campaigns.find().fetch());
        let name = "";
        let description = "";
        if (campaign) {
            name = campaign.name;
            description = campaign.description;
        }

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

                Meteor.call('btCreateCustomer', function(error, success) {
                  if (error) {
                    throw new Meteor.Error('customer-creation-failed');
                  } else {
                    // ... and when the customer is successfuly created,
                    // call method for creating a transaction (finally!)
                    let donation_amount = document.getElementById('donation_amount').value;
                    Meteor.call('createTransaction', nonce, donation_amount, function(error, success) {
                      if (error) {
                        throw new Meteor.Error('transaction-creation-failed');
                      } else {
                        alert('Thank you for your donation!');
                      }
                    });
                  }
                });
              }
            });
          }
        });

      return (
          <Responsive>
              <Segment style={{ backgroundColor: '#F9FFFF', paddingTop: '6em' }} vertical>
                  <Grid container centered stackable>
                      <Grid.Column width={8}>
                          <Header as='h1'
                                  color='orange'
                                  style={{
                                      fontSize: '2em',
                                      letterSpacing: '1.5px' }}>
                              {name}
                          </Header>
                          <p>{description}</p>
                          <Form role="form">
                            <Form.Field>
                                <input
                                  type="integer"
                                  id="donation_amount"
                                  placeholder="Amount"/>
                            </Form.Field>
                            <Form.Field>
                                <div id="payment-form"></div>
                            </Form.Field>
                            <Button type="submit" color="orange">Submit</Button>
                            <p>Check out our privacy policy <Link to="/policies">here</Link></p>
                        </Form>
                      </Grid.Column>
                  </Grid>
              </Segment>
          </Responsive>
      );
    }
}
