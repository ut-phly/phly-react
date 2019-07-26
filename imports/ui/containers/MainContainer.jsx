import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import Campaigns1 from '../../api/campaigns1.js';

import List from 'material-ui/List';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'

import MainPage from '../pages/MainPage.jsx';

export default MainContainer = withTracker(({params}) => {
    // Meteor.subscribe('campaigns');
    const currentUser = Meteor.user();

    return {
        currentUser: currentUser,
        //campaigns: Campaigns1.find({}).fetch()
    };
})(MainPage);
