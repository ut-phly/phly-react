import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

import { Organizations } from './organizations.js';

//var qrcode = require('qrcode');
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
    goalAmount: {type: Number}
});

//this will automatically check against the scehma when created
Campaigns.attachSchema(Campaigns.schema);

Meteor.methods({

    'campaigns.insert'(campaign) {
        // add validation that the user is signed in and the schema is correct
        Campaigns.insert({
            name: campaign.name,
            createdAt: new Date(),
            owner: campaign.owner,
            startDate: campaign.startDate,
            endDate: campaign.endDate,
            description: campaign.description,
            nonprofit: campaign.nonprofit,
            goalAmount: campaign.goalAmount
        });
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
                }
            }
        );
    },

    'campaigns.delete'(id) {
        Campaigns.remove({ _id: id });
    },

    // 'campaigns.createPublicQR'(url) {
    //
    // }
});

//,
//function(err, doc) {
//    Organizations.update({ _id: campaign.owner }, { $push: { 'campaigns': doc._id }});
//}
