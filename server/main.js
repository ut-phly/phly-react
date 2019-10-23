import { Meteor } from 'meteor/meteor';
import '../imports/api/campaigns.js';
import '../imports/api/organizations.js';
import '../imports/api/potentials.js';
import './publish.js';

// Define gateway variable
var gateway;

Meteor.startup(() => {

    var env;
    var braintree = require('braintree');
  // Pick Braintree environment based on environment defined in Meteor settings.
    if (Meteor.settings.public.env === 'Production') {
        env = Braintree.Environment.Production;
    } else {
        env = Braintree.Environment.Sandbox;
    }
  //console.log(env);
  // Initialize Braintree connection:
  //gateway = BrainTreeConnect({
    gateway = braintree.connect({
        environment: env,
        publicKey:  '4qpbhj8rxyn4wb9k',
        privateKey: '4b8926c2bf26ec19a3435edfdbe4139b',
        merchantId: 's9d9rpjb9wttm9t8'
    });
});

Meteor.methods({
  'getClientToken'(clientId) {
    var generateToken = Meteor.wrapAsync(gateway.clientToken.generate, gateway.clientToken);
    var options = {};

    if (clientId) {
      options.clientId = clientId;
    }

    var response = generateToken(options);
    return response.clientToken;
  },
  btCreateCustomer: function(){
    var user = Meteor.user();

    var customerData = {
      email: user.emails[0].address
    };

    // Calling the Braintree API to create our customer!
    gateway.customer.create(customerData, function(error, response){
      if (error){
        console.log(error);
      } else {
        // If customer is successfuly created on Braintree servers,
        // we will now add customer ID to our User
        Meteor.users.update(user._id, {
          $set: {
            customerId: response.customer.id
          }
        });
      }
    });
  },
  createTransaction: function(nonceFromTheClient, donation_amount) {
    var user = Meteor.user();

    // Let's create transaction.
    gateway.transaction.sale({
      amount: donation_amount,
      paymentMethodNonce: nonceFromTheClient, // Generated nonce passed from client
      customer: {
        id: user.customerId
      },
      options: {
        submitForSettlement: true, // Payment is submitted for settlement immediatelly
        storeInVaultOnSuccess: true // Store customer in Braintree's Vault
      }
    }, function (err, success) {
      if (err) {
        console.log(err);
      } else {
        // When payment's successful, add "paid" role to current user.
        Roles.addUsersToRoles(user._id, 'paid', Roles.GLOBAL_GROUP)
      }
    });
  }
});
