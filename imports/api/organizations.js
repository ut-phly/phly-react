import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const Organizations = new Mongo.Collection('organizations');

if (Meteor.isServer) {
    Meteor.publish('organizations', function orgPublication() {
        const user = Meteor.userId();
        return Organizations.find({
            $or: [
                { owner: user },
                { users: user }
            ]
        });
    })
}

Organizations.schema = new SimpleSchema({
    name: String,
    createdAt: Date,
    owner: String,
    users: Array,
    'users.$': String,
    campaigns: Array,
    'campaigns.$': String,
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
