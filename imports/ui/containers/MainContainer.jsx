import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { Campaigns } from '../../api/campaigns.js';
import { Organizations } from '../../api/organizations.js';

import MainPage from '../pages/MainPage/MainPage.jsx';

export default MainContainer = withTracker(({history}) => {
    Meteor.subscribe('myCampaigns');
    Meteor.subscribe('organizations');
    const currentUser = Meteor.user();
    console.log(currentUser);
    console.log(Meteor.userId());
    const campaigns = Campaigns.find({}).fetch();
    const organizations = Organizations.find({}).fetch();

    console.log(campaigns);
    console.log(organizations);
    return {
        history: history,
        currentUser: currentUser,
        campaigns: campaigns,
        organizations: organizations
    };
})(MainPage);
