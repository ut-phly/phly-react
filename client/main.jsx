import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import App from '/imports/ui/App';

import { renderRoutes } from '../imports/startup/routes.jsx'

Meteor.startup(() => {
    render(renderRoutes(), document.getElementById('react-target'));
});
