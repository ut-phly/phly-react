import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

import { Organizations } from './organizations.js';
import { Campaigns } from './campaigns.js';

export const Donations = new Mongo.Collection('donations');

if (Meteor.isServer) {
    Meteor.publish('donations', function donationPublication() {
        return Donations.find({});
    });

    Meteor.publish('myDonations', function () {
        const user = Meteor.userId();
        var orgs = Organizations.find({
            $or: [
                { owner: user },
                { users: user }
            ]
        }).fetch();
        orgs = orgs.map((org) => (org._id));
        var campaigns = Campaigns.find({
            owner: { $in: orgs }
        }).fetch();
        campaigns = campaigns.map((camp) => (camp._id));
        return Donations.find({ campaign: { $in: campaigns } });
    });
}

Donations.schema = new SimpleSchema({
    createdAt: {type: Date},
    donor: {type: String},
    campaign: {type: String},
    nonprofit: {type: String},
    amount: {type: Number}
});

//this will automatically check against the scehma when created
Donations.attachSchema(Donations.schema);

Meteor.methods({

    'donations.insert'(donation) {
        // add validation that the user is signed in and the schema is correct
        Donations.insert({
            createdAt: new Date(),
            donor: donation.donor,
            campaign: donation.campaign,
            nonprofit: donation.nonprofit,
            amount: donation.amount
        });
    },

});
