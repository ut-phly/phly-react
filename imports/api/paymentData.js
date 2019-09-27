import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const PaymentData = new Mongo.Collection('paymentData');

if (Meteor.isServer) {
  Meteor.publish('paymentData', function campaignPublication() {
    return Campaigns.find();
  })
}

PaymentData.schema = new SimpleSchema({
  name: {type: String},
  amount: {type: Number}

});

//this will automatically check against the scehma when created
PaymentData.attachSchema(PaymentData.schema);

Meteor.methods({
  'paymentData.insert'(campaign) {
    console.log(campaign);
    // add validation that the user is signed in and the schema is correct
    PaymentData.insert({
        name: campaign.name,
        amount: campaign.amount,
    });
  }
});
