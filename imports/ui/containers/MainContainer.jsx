import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { Campaigns } from '../../api/campaigns.js';
import { Organizations } from '../../api/organizations.js';
import { Donations } from '../../api/donations.js';

import MainPage from '../pages/MainPage/MainPage.jsx';

export default MainContainer = withTracker(({history}) => {
    Meteor.subscribe('myCampaigns');
    Meteor.subscribe('donations');
    Meteor.subscribe('organizations');
    Meteor.subscribe('user.custom');
    const currentUser = Meteor.user();
    const campaigns = Campaigns.find({}).fetch();
    const organizations = Organizations.find({}).fetch();
    const donations = Donations.find({}).fetch();

    //console.log(campaigns);
    //console.log(organizations);
    return {
        history: history,
        currentUser: currentUser,
        campaigns: campaigns,
        organizations: organizations,
        donations: donations
    };
})(MainPage);
