import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
//import { check } from 'meteor/check';

export const Campaigns = new Mongo.Collection('campaigns');

const CampaignsSchema = new SimpleSchema({
 name: {type: String},
 startDate: {type: String},
 endDate: {type: Date},
 description: {type: String, optional: true},
 userId: {type: String},
});

Campaigns.attachSchema(CampaignsSchema);
//Campaigns.schema = Schema.Campaigns;
