import { Meteor } from 'meteor/meteor';

import { Campaigns } from  '../imports/api/campaigns.js';

Meteor.startup(()=> {
  Meteor.publish('players', function() {
    return Players.find({});
  })
});
