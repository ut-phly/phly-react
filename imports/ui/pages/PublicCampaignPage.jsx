import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withHistory, Link } from 'react-router-dom';
//import '../../api/payments.js';
import { HTTP } from 'meteor/http';

//import Campaigns from '../../api/campaigns.js';

export default class CampaignPage extends Component {
    render() {

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
          <div>
            <div className="card mb-3">
              <h2 className="card-header">Public Campaign Page</h2>
              <form role="form">
                <div class="row">
                  <div class="col-md-6 col-xs-12">
                    <input
                      className="form-control"
                      type="integer"
                      id="donation_amount"
                      placeholder="Amount"/>
                    <div id="payment-form"></div>
                    <button type="submit" class="btn btn-success">Submit</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
      );
    }
}
