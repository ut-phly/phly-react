import { Meteor } from 'meteor/meteor';
import '../imports/api/campaigns.js';
import '../imports/api/organizations.js';
import '../imports/api/potentials.js';
import '../imports/api/donations.js';
import './publish.js';

// Define gateway variable
var gateway;

Meteor.startup(() => {
    var env;
    var braintree = require('braintree');
  // Pick Braintree environment based on environment defined in Meteor settings.

    if (Meteor.isProduction) {
        gateway = braintree.connect({
            environment:  braintree.Environment.Production,
            merchantId:   'kbgtdmr6tz3y36hr',
            publicKey:    '3cdj78frnf6mk7qw',
            privateKey:   '93641e2bea82f47e45d1b66fcda8c33d'
        });
    } else {
        gateway = braintree.connect({
            environment:  braintree.Environment.Sandbox,
            merchantId:   '3wy8txzn8txdcppk',
            publicKey:    'mqvthtfyjbs2chw6',
            privateKey:   '1ff396c3113380a124ef3861106eebc8'
        });
    }
});

Meteor.methods({
  'getClientToken'(customerId) {
    var generateToken = Meteor.wrapAsync(gateway.clientToken.generate, gateway.clientToken);

    var response = generateToken();
    return response.clientToken;
  },

  btCreateCustomer: function() {

    // Calling the Braintree API to create our customer!
    gateway.customer.create({}, function(error, response){
      if (error){
        console.log(error);
      } else {
        // If customer is successfuly created on Braintree servers,
        // we will now add customer ID to our User
        return response.customer.id;
      }
    });
  },

  createTransaction: function(nonceFromTheClient, donation_amount) {

    // Let's create transaction.
    gateway.transaction.sale({
      amount: donation_amount,
      paymentMethodNonce: nonceFromTheClient, // Generated nonce passed from client

      /*customer: {
        id: user.customerId
      },*/
      options: {
        submitForSettlement: true, // Payment is submitted for settlement immediatelly
        storeInVaultOnSuccess: true // Store customer in Braintree's Vault
      }
    }, function (err, success) {
      if (err) {
        console.log("THERE IS AN ERROR WITH THE TRANSACTION")
        console.log(err);
      } else {
        // When payment's successful, add "paid" role to current user.
      }
    });
  }
});
