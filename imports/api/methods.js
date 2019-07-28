import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import SimpleSchema from 'simpl-schema';
import { Campaigns1 } from './campaigns1.js';

export const insert = new ValidatedMethod({
  name: 'Campaigns1.methods.insert',
  validate: new SimpleSchema({
    name: { type: String },
    startDate: { type: String },
    endDate: { type: String },
    description: { type: String },
    user: { type: String}
  }).validator(),
  run(newCampaign) {
    debugger;
    Campaigns1.insert(newCampaign)
  }
});
