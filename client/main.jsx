import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import '../imports/ui/assets/design/vendor/nucleo/css/nucleo.css';
import '../imports/ui/assets/design/vendor/font-awesome/css/font-awesome.css';
import '../imports/ui/assets/dashboard/scss/argon-dashboard-react.scss';
import '../imports/ui/assets/design/scss/argon-design-system-react.scss';

import { renderRoutes } from '../imports/startup/routes.jsx'

Meteor.startup(() => {
    render(renderRoutes(), document.getElementById('react-target'));
});
