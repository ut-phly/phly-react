import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import Campaigns from '../../api/campaigns.js';

import MainPage from '../pages/MainPage.jsx';

// export default MainContainer = withTracker(({params}) => {
//     Meteor.subscribe('campaigns');
//     const currentUser = Meteor.user();
//
//     return {
//         currentUser: currentUser,
//         campaigns: Campaigns.find({}).fetch()
//     };
// })(MainPage);
