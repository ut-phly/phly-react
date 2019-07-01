import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export default Campaigns = new Mongo.Collection('campaigns');

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
