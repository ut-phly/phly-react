import { Meteor } from 'meteor/meteor';
import Campaigns1 from '/imports/api/campaigns1';


Meteor.startup(() => {
    Meteor.publish('campaigns1', function() {
      return Campaigns1.find({});
    })
});
