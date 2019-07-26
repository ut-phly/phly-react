import { Meteor } from 'meteor/meteor';
import { Campaigns1 } from '../imports/api/campaigns1.js';

Meteor.methods({
  insertCampaigns1(campaign) {
    Campaigns1.insert(campaign);
  }
});
