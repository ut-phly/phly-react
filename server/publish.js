import { Meteor } from 'meteor/meteor';
import '../imports/api/campaigns.js';

Meteor.publish('user.custom', function () {
    if (!this.userId) {
        return this.ready();
    }

    // For testing purpose, make sure roleGroup exists on this user' record
    console.warn(Meteor.users.findOne({_id: this.userId}, {fields: {org: 1}}));
    return Meteor.users.find({_id: this.userId}, {fields: {org: 1} });
});
