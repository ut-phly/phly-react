import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { Campaigns } from '../../api/campaigns.js';

import MainPage from '../pages/MainPage/MainPage.jsx';

export default MainContainer = withTracker(({params}) => {
    Meteor.subscribe('campaigns');
    const currentUser = Meteor.user();
    console.log(currentUser);
    console.log(Meteor.userId());
    const campaigns = Campaigns.find({ owner: Meteor.userId() }).fetch();

    console.log(campaigns);
    return {
        currentUser: currentUser,
        campaigns: campaigns,
        //campaigns: Campaigns.find({}).fetch()
    };
})(MainPage);
