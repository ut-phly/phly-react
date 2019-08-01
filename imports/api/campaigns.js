import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const Campaigns = new Mongo.Collection('campaigns');

Campaigns.schema = new SimpleSchema({
  name: {type: String},
  createAt: {type: Date},
  owner: {type: String},
  username: {type: String},
});

//this will automatically check against the scehma when created
Campaigns.attachSchema(Campaigns.schema);

Meteor.methods({
  'campaigns.insert'(campaign) {
    // add validation that the user is signed in and the schema is correct
    Campaigns.insert({
        name: campaign.name,
        createAt: campaing.date,
        owner: campaign.owner,
        username: campaign.username,
    });
  }
});
