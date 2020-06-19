import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
//call the qr code function in backend and save to another line in the SimpleSchema
//use the object to display the qr code in the html
import { Organizations } from './organizations.js';

var QRCode = require('qrcode-svg');

export const Campaigns = new Mongo.Collection('campaigns');

if (Meteor.isServer) {
    Meteor.publish('campaigns', function campaignPublication() {
        return Campaigns.find({}, { owner: 0 });
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
    name: {type: String},
    createdAt: {type: Date},
    owner: {type: String},
    startDate: {type: Date},
    endDate: {type: Date},
    description: {type: String},
    nonprofit: {type: String},
    goalAmount: {type: Number},
    braintree: {type: Boolean},
    payTo: {type: String},
    payWith: {type: String},
    handle: {type: String, optional: true},
    address: {type: String, optional: true},
    address2: {type: String, optional: true},
    city: {type: String, optional: true},
    state: {type: String, optional: true},
    zipcode: {type: String, optional: true},
    donationLink: {type: String, optional: true},
    complete: {type: Boolean},
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
              handle: "temp",
              address: "temp",
              address2: "temp",
              city: "temp",
              state: "temp",
              zipcode: "temp",
              donationLink: "temp",
              complete: false
          }
        )
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
            payInfo: campaign.payInfo,
            handle: campaign.handle,
            address: campaign.address,
            address2: campaign.address2,
            city: campaign.city,
            state: campaign.state,
            zipcode: campaign.zipcode,
            donationLink: campaign.donationLink,
            complete: true,
          }
        }
      );
    }
});

//,
//function(err, doc) {
//    Organizations.update({ _id: campaign.owner }, { $push: { 'campaigns': doc._id }});
//}
