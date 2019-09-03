import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withHistory, Link } from 'react-router-dom';
//import '../../api/payments.js';

//import Campaigns from '../../api/campaigns.js';

export default class CampaignPage extends Component {
    componentWillMount() {
      $.getScript('https://js.braintreegateway.com/v2/braintree.js');
    }
    render() {
      // Meteor.methods({
      //   'getClientToken'(clientId) {
      //     var generateToken = Meteor.wrapAsync(gateway.clientToken.generate, gateway.clientToken);
      //     var options = {};
      //
      //     if (clientId) {
      //       options.clientId = clientId;
      //     }
      //
      //     var response = generateToken(options);
      //     return response.clientToken;
      //   }
      // });

      Meteor.call('getClientToken', function(error, clientToken) {
        var braintree = require('braintree');
        if (error) {
          console.log(error);
          console.log(clientToken);
        } else {
          braintree.setup(clientToken, "dropin", {
            container: "payment-form", // Injecting into <div id="payment-form"></div>
            onPaymentMethodReceived: function (response) {
              // When we submit the payment form,
              // we'll receive a response that includes
              // payment method nonce:
              var nonce = response.nonce;
              // Check the nonce printed in console after submitting the form.
              console.log(nonce);
            }
          });
        }
      });

      return (
          <div>
            // <head>
            //     <script src="https://js.braintreegateway.com/v2/braintree.js"></script>
            // </head>
            <div className="card mb-3">
              <h2 className="card-header">Public Campaign Page</h2>
              <form role="form">
              <div class="row">
                <div class="col-md-6 col-xs-12">
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
