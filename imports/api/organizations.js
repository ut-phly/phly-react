import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const Organizations = new Mongo.Collection('organizations');

if (Meteor.isServer) {
  Meteor.publish('organizations', function orgPublication() {
    return Organizations.find({ owner: Meteor.userId() });
  })
}

Organizations.schema = new SimpleSchema({
    name: {type: String},
    createdAt: {type: Date},
    owner: {type: String},
    users: Array,
    'users.$': String,
    campaigns: Array,
    'campaigns.$': Object,
    'campaigns.$.name': String,
    'campaigns.$.createdAt': Date,
    'campaigns.$.owner': String, //organization id
    'campaigns.$.username': String
});

Organizations.attachSchema(Organizations.schema);

Meteor.methods({
    'organizations.insert'(org) {
        console.log(org);
        Organizations.insert({
            name: org.name,
            createdAt: new Date(),
            owner: org.owner,
            users: [],
            campaigns: []
        });
    },

    'organizations.delete'(id) {
        Organizations.remove({ _id: id });
    },

    'organizations.addCampaign'(id, campaign) {
        Organizations.update({ _id: id }, { $push: { campaigns: campaign }});
    }
})
