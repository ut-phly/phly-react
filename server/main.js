import { Meteor } from 'meteor/meteor';
import { Promise } from 'meteor/promise';
import { Email } from 'meteor/email';

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
    //process.env.MAIL_URL = "smtp://hello@phly.co:phi1@nthropy@smtp.porkbun.com:587";
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
    console.log("Making client token");
    var generateToken = Meteor.wrapAsync(gateway.clientToken.generate, gateway.clientToken);

    var response = generateToken();
    return response.clientToken;
    console.log("Made client token");
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
    console.log("Making transaction");
    // Let's create transaction.

    return new Promise(function(resolve, reject) {
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
      }, function (err, result) {
        if (err) {
          console.log("THERE IS AN ERROR WITH THE TRANSACTION")
          console.log(err);
          reject(new Meteor.Error("transaction-error", "Immediate error with transaction"));
        } else {
          console.log("Created Transaction");
          if (!result.success) {
            reject(new Meteor.Error("transaction-failed", "Payment did not go through"));
          } else resolve(result);
        }
      });
    })
  },

  contactUsEmail: function(form) {
    let text = `Howdy ${form.name},

We got your message! We will reach out to you as soon as possible.

Thanks,
The Phly Team`;

    let subject = "Phly Support";
    let to = form.email;
    let from = "hello@phly.co";

    Email.send({
      to: to,
      from: from,
      subject: subject,
      text: text
    });

    let date = new Date();
    text = `New Support Ticket ${date.toString()}

From: ${form.name}
Email: ${form.email}
Message: ${form.message}`;

    subject = "New Support Ticket Submitted";
    to = "hello@phly.co";

    Email.send({
      to: to,
      from: from,
      subject: subject,
      text: text
    });

  }
});
