import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const Campaigns = new Mongo.Collection('campaigns');

if (Meteor.isServer) {
  Meteor.publish('campaigns', function campaignPublication() {
    return Campaigns.find();
  })
}

Campaigns.schema = new SimpleSchema({
    name: {type: String},
    createdAt: {type: Date},
    owner: {type: String}, //organization id
    username: {type: String},
});

//this will automatically check against the scehma when created
Campaigns.attachSchema(Campaigns.schema);

Meteor.methods({
    'campaigns.insert'(campaign) {
        console.log(campaign);
    // add validation that the user is signed in and the schema is correct
        Campaigns.insert({
            name: campaign.name,
            createdAt: new Date(),
            owner: campaign.owner,
            username: campaign.username,
        });
    },

    'campaigns.delete'(id) {
        Campaigns.remove({ _id: id });
    }

});
