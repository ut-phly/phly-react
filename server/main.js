import { Meteor } from 'meteor/meteor';
import { Promise } from 'meteor/promise';
import { Email } from 'meteor/email';

import { onPageLoad } from 'meteor/server-render';
import { Campaigns } from '../imports/api/campaigns';

import '../imports/api/campaigns.js';
import '../imports/api/organizations.js';
import '../imports/api/potentials.js';
import '../imports/api/donations.js';
import './publish.js';

// Define gateway variable
var gateway;

const siteName = 'Phly';
const defaultImage = 'https://www.phly.co/images/meta-image.png';
const defaultMetaTags = `
<meta name="twitter:card" content="summary" />
<meta name="twitter:site" content="@getphly" />
<meta property="twitter:title"       content="${siteName}" />
<meta property="twitter:description" content="Collect and track all payments for your club or community in one place." />
<meta property="twitter:image"       content="${defaultImage}" />
<meta property="og:title"       content="${siteName}" />
<meta property="og:description" content="Collect and track all payments for your club or community in one place." />
<meta property="og:image"       content="${defaultImage}" />
`;

function extractCampaignId(pathname) {
  const tripIdRegExp = new RegExp('/public/([23456789ABCDEFGHJKLMNPQRSTWXYZabcdefghijkmnopqrstuvwxyz0123456789]{17})');
  const match = pathname.match(tripIdRegExp);
  if (!match || match.length > 2) {
    return null;
  }
  return match[1];
}

function createMetaTag(property, content) {
  return `<meta property="${property}" content="${content}">`;
}

onPageLoad((sink) => {
  const { pathname } = sink.request.url;
  const meteorHost = Meteor.absoluteUrl();
  const campaignId = extractCampaignId(pathname);
  const campaign = campaignId ? Campaigns.findOne({ _id: campaignId }) : null;

  if (campaign) {
    const title = campaign.name;
    const description = campaign.description;
    const fullUrl = meteorHost + pathname.replace(/^\/+/g, '');
    sink.appendToHead(createMetaTag('twitter:card', 'summary'));
    sink.appendToHead(createMetaTag('twitter:site', '@getphly'));
    sink.appendToHead(createMetaTag('twitter:title', title));
    sink.appendToHead(createMetaTag('twitter:description', description));
    sink.appendToHead(createMetaTag('twitter:image', defaultImage));
    sink.appendToHead(createMetaTag('og:title', title));
    sink.appendToHead(createMetaTag('og:description', description));
    sink.appendToHead(createMetaTag('og:url', fullUrl));
    sink.appendToHead(createMetaTag('og:image', defaultImage));
    sink.appendToHead(createMetaTag('og:site_name', siteName));
  } else {
    sink.appendToHead(defaultMetaTags);
    sink.appendToHead(createMetaTag('og:url', meteorHost));
  }
});

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
