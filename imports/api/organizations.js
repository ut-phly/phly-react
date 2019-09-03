import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const Organizations = new Mongo.Collection('organizations');

if (Meteor.isServer) {
  Meteor.publish('organizations', function organizationPublication() {
    return Organizations.find();
  })
}

Organizations.schema = new SimpleSchema({
  name: {type: String},
  createdAt: {type: Date},
  owner: {type: String},
  username: {type: String},
});

//this will automatically check against the scehma when created
Organizations.attachSchema(Organizations.schema);

Meteor.methods({
  'organizations.insert'(organization) {
    console.log(organization);
    // add validation that the user is signed in and the schema is correct
    Organizations.insert({
        name: organization.name,
        createdAt: new Date(),
        owner: campaign.owner,
        username: campaign.username,
    });
  }
});
