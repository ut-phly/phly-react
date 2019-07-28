import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import SimpleSchema from 'simpl-schema';
import { Campaigns1 } from './campaigns1.js';

<<<<<<< HEAD
=======

>>>>>>> 47e7431cf9338292f8fcc50b17c6288827cd06e7
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
<<<<<<< HEAD
    debugger;
=======
>>>>>>> 47e7431cf9338292f8fcc50b17c6288827cd06e7
    Campaigns1.insert(newCampaign)
  }
});
