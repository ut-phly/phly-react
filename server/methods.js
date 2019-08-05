import { Meteor } from 'meteor/meteor';
import '../imports/api/campaigns.js';

import SimpleSchema from 'simpl-schema';

// export const Campaigns = new Mongo.Collection('campaigns');
//
// Campaigns.schema = new SimpleSchema({
//   name: {type: String},
//   createdAt: {type: Date},
//   owner: {type: String},
//   username: {type: String},
// });
//
// //this will automatically check against the scehma when created
// Campaigns.attachSchema(Campaigns.schema);

Meteor.methods({
  'campaigns.insert'(campaign) {
    // add validation that the user is signed in and the schema is correct
    Campaigns.insert({
        name: campaign.name,
        createdAt: new Date(),
        owner: campaign.owner,
        username: campaign.username,
    });
  }
});
