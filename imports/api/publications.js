import { Meteor } from 'meteor/meteor';
import Campaigns from './campaigns.js';

Meteor.publish('myCampaigns', function() {
    if (!this.userId) return this.ready();
    
    var currentUser = this.userId;
    return Campaigns.find({ userId: currentUser });
});
