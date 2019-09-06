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
        braintree.client.create({
          authorization: clientToken
        },function (clientErr, clientInstance) {
          if (clientErr) {
            console.error('Error creating client:', clientErr);
            return;
          }
          // Create a Venmo component.
          var venmoButton = document.getElementById('venmo-button');
          braintree.venmo.create({
            client: clientInstance
          },function (venmoErr, venmoInstance) {
            if (venmoErr) {
              console.error('Error creating Venmo:', venmoErr);
              return;
            }
            // Verify browser support before proceeding.
            if (!venmoInstance.isBrowserSupported()) {
              console.log('Browser does not support Venmo');
              return;
            }

            displayVenmoButton(venmoInstance);
            if (venmoInstance.hasTokenizationResult()) {
              venmoInstance.tokenize(function (tokenizeErr, payload) {
                if (err) {
                  handleVenmoError(tokenizeErr);
                } else {
                  handleVenmoSuccess(payload);
                }
              });
              return;
            }
          });
          function displayVenmoButton(venmoInstance) {
            // Assumes that venmoButton is initially display: none.
            venmoButton.style.display = 'block';

            venmoButton.addEventListener('click', function () {
              venmoButton.disabled = true;

              venmoInstance.tokenize(function (tokenizeErr, payload) {
                venmoButton.removeAttribute('disabled');

                if (tokenizeErr) {
                 handleVenmoError(tokenizeErr);
               } else {
                 handleVenmoSuccess(payload);
               }

              });
            });
          }

          function handleVenmoError(err) {
            if (err.code === 'VENMO_CANCELED') {
              console.log('App is not available or user aborted payment flow');
            } else if (err.code === 'VENMO_APP_CANCELED') {
              console.log('User canceled payment flow');
            } else {
              console.error('An error occurred:', err.message);
            }
          }


          function handleVenmoSuccess(payload) {
            // Send payload.nonce to your server.
            console.log('Got a payment method nonce:', payload.nonce);
            // Display the Venmo username in your checkout UI.
            console.log('Venmo user:', payload.details.username);
          }

        });
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
                    console.log("iphone");
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
                    <div id="venmo-button"></div>
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
