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
    share: String,
    'users.$': String,
    campaigns: Array,
    'campaigns.$': String,
});

Organizations.attachSchema(Organizations.schema);

Meteor.methods({
    'organizations.insert'(org) {
        let share = new Meteor.Collection.ObjectID();
        console.log(share);
        console.log(share._str);
        Organizations.insert({
            name: org.name,
            createdAt: new Date(),
            owner: org.owner,
            share: share._str,
            users: [],
            campaigns: []
        }, function(err, org_id) {
          Meteor.users.update(org.owner, { $set: { org: id } });
        });
    },

    'organizations.delete'(id) {
        Organizations.update({ _id: id }, { $pull: { users: user }});
    },

    'organizations.join'(code, user) {
        Organizations.update({ share: code }, { $push: { users: user }});
    },

    'organizations.addCampaign'(id, campaign) {
        Organizations.update({ _id: id }, { $push: { campaigns: campaign }});
    },

    'organizations.save'(id, user) {
        console.log("saving user: " + user + ", " + id);
        Meteor.users.update(user, { $set: { org: id } });
    }
})
