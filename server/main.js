import { Meteor } from 'meteor/meteor';
import Campaigns from '/imports/api/campaigns';

import '../imports/api/campaigns.js';

Meteor.startup(() => {
    if (Campaigns.find().count() === 0) {
        Campaigns.insert({ name: "Test campaign", userId: "kAoxxAEg4BmCga6Ys" });
        Campaigns.insert({ name: "Rose Test campaign", userId: "baYAsXZfkQBYy9uZM" });
    }
});
