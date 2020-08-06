import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Email } from 'meteor/email';
//call the qr code function in backend and save to another line in the SimpleSchema
//use the object to display the qr code in the html
import { Organizations } from './organizations.js';
import { Donations } from './donations.js';

var QRCode = require('qrcode-svg');

export const Campaigns = new Mongo.Collection('campaigns');

if (Meteor.isServer) {
    Meteor.publish('campaigns', function campaignPublication() {
        return Campaigns.find({}, {
          fields: {
            owner: 0,
            payTo: 0,
            payWith: 0,
            handle: 0,
            checkName: 0,
            address: 0,
            address2: 0,
            city: 0,
            state: 0,
            zipcode: 0,
            donationLink: 0,
            additionalInfo: 0
        }});
    });

    Meteor.publish('myCampaigns', function () {
        const user = Meteor.userId();
        var orgs = Organizations.find({
            $or: [
                { owner: user },
                { users: user }
            ]
        }).fetch();
        orgs = orgs.map((org) => (org._id));
        return Campaigns.find({ owner: { $in: orgs } });
    });
}

Campaigns.schema = new SimpleSchema({
    name: String,
    createdAt: Date,
    owner: String,
    startDate: Date,
    endDate: Date,
    description: String,
    nonprofit: String,
    goalAmount: Number,
    braintree: Boolean,
    payTo: String,
    payWith: String,
    additionalInfo: {type: String, optional: true},
    handle: {type: String, optional: true},
    checkName: {type: String, optional: true},
    address: {type: String, optional: true},
    address2: {type: String, optional: true},
    city: {type: String, optional: true},
    state: {type: String, optional: true},
    zipcode: {type: String, optional: true},
    donationLink: {type: String, optional: true},
    complete: {type: Boolean},
    form: {type: Array, optional: true},
    'form.$': {type: Object},
    'form.$.label': {type: String},
    'form.$.type': {type: String},
    'form.$.required': {type: Boolean}
});

//this will automatically check against the scehma when created
Campaigns.attachSchema(Campaigns.schema);

Meteor.methods({

    'campaigns.insert'(campaign) {

        Campaigns.insert(
          {
              name: campaign.name,
              createdAt: new Date(),
              owner: campaign.owner,
              startDate: campaign.startDate,
              endDate: campaign.endDate,
              description: campaign.description,
              nonprofit: campaign.nonprofit,
              goalAmount: campaign.goalAmount,
              braintree: true,
              payTo: "temp",
              payWith: "temp",
              complete: false,
              form: campaign.form
          }
        );
    },

    'campaigns.edit'(campaign, id) {
    // add validation that the user is signed in and the schema is correct
        Campaigns.update(
            { _id: id },
            {
                $set:
                {
                    name: campaign.name,
                    description: campaign.description,
                    startDate: campaign.startDate,
                    endDate: campaign.endDate,
                    nonprofit: campaign.nonprofit,
                    goalAmount: campaign.goalAmount
                }
            }
        );
    },

    'campaigns.delete'(id) {
        Campaigns.remove({ _id: id });
    },

    'campaigns.updatePayment'(campaign, id){
      Campaigns.update(
        {_id: id},
        {
          $set:
          {
            payTo: campaign.payTo,
            payWith: campaign.payWith,
            additionalInfo: campaign.additionalInfo,
            handle: campaign.handle,
            checkName: campaign.checkName,
            address: campaign.address,
            address2: campaign.address2,
            city: campaign.city,
            state: campaign.state,
            zipcode: campaign.zipcode,
            donationLink: campaign.donationLink,
            complete: true,
          }
        },
        function(err, docs) {
          let campaign = Campaigns.findOne({ _id: id });
          let date = new Date();
          let organization = Organizations.findOne({ _id: campaign.owner });
          let donations = Donations.find({ campaign: id }).fetch();

          let raised = 0;
          donations.forEach((donation, i) => {
            raised += donation.amount;
          });
          let processing = (campaign.braintree) ? Math.ceil((((raised *.029) + .3) * 100) / 100) : 0;
          let phly = Math.ceil(((raised * .037) * 100) / 100);

          let to = "hello@phly.co";
          let from = "hello@phly.co";
          let subject = "Campaign Complete";
          let text = `
          Time Completed: ${date.toString()}
          Organization: ${organization.name}
          Campaign Name: ${campaign.name}
          Goal: ${campaign.goalAmount}
          Total Raised: ${raised}
          Processing Fee: ${processing}
          Phly Fee: ${phly}
          Net Total: ${raised - phly}
          Donor Count: ${donations.length}
          Nonprofit Name: ${campaign.nonprofit}
          -------------
          Payout Org Details-
          Payout To: ${campaign.payTo}
          Payout Method: ${campaign.payWith}
          Payment Details:
            Handle: ${campaign.handle}
            Check Name: ${campaign.checkName}
            Address: ${campaign.address} ${campaign.address2 + " "} ${campaign.city}, ${campaign.state} ${campaign.zipcode}
            Donation Link: ${campaign.donationLink}
            Additional Info: ${campaign.additionalInfo}`;

          Email.send({
            to: to,
            from: from,
            subject: subject,
            text: text
          });

          let user = Meteor.user();
          to = user.emails[0].address;
          subject = "Congrats! Your campaign is complete"
          text = `
Your campaign is now complete! Your funds are being processed according to the instructions you provided on the “End Campaign” form.  You will receive another email from Hello@phly.co with details on your campaign and an official receipt with 1-2 business days.

Please make sure to check your spam folder if you do not receive a follow up email and reach out to our support team by emailing hello@phly.co.`;

          Email.send({
            to: to,
            from: from,
            subject: subject,
            text: text
          });

        }
      );
    }
});
