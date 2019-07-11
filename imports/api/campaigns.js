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
})

Campaigns.attachSchema(CampaignsSchema);

if (Meteor.isServer) {
  Meteor.publish('campaigns', function() {
      if (!this.userId) return this.ready();

      var currentUser = this.userId;
      return Campaigns.find({ userId: currentUser });
  });
}

Meteor.methods({
    'campaigns.insert'(name) {
        debugger;
        check(name, String);

        Campaigns.insert({
            name: name,
            startDate: startDate,
            endDate: endDate,
            description: description,
            userId: this.userId,
        });
    }
});
