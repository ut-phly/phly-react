import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import '../imports/ui/assets/vendor/nucleo/css/nucleo.css';
import '../imports/ui/assets/vendor/font-awesome/css/font-awesome.min.css';
import '../imports/ui/assets/scss/argon-design-system-react.scss';

import { renderRoutes } from '../imports/startup/routes.jsx'

Meteor.startup(() => {
    render(renderRoutes(), document.getElementById('react-target'));
});
