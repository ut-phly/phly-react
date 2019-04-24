import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export default Campaigns = new Mongo.Collection('campaigns');

if (Meteor.isServer) {
  Meteor.publish('campaigns', function() {
      if (!this.userId) return this.ready();

      var currentUser = this.userId;
      return Campaigns.find({ userId: currentUser });
  });
}
