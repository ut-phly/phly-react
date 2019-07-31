import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const Campaigns = new Mongo.Collection('campaigns');

Campaigns.schema = new SimpleSchema({
  name: {type: String},
  createAt: {type: Date},
  owner: {type: String},
  username: {type: String},
});

//this will automatically check against the scehma when
//when we call Lists.insert, update and upsert
Campaigns.attachSchema(Campaigns.schema);
