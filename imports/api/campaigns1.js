import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
//import { check } from 'meteor/check';

export const Campaigns1 = new Mongo.Collection('campaigns1');

const CampaignsSchema = new SimpleSchema({
 name: {type: String},
 startDate: {type: String},
 endDate: {type: Date},
 description: {type: String, optional: true},
 user : {type: String},
});

Campaigns1.attachSchema(CampaignsSchema);
//Campaigns.schema = Schema.Campaigns;
