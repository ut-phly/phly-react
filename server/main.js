import { Meteor } from 'meteor/meteor';
import '../imports/api/campaigns.js';

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
  gateway = BrainTreeConnect({
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
  }
});
