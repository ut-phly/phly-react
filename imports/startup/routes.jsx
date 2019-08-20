import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import AppContainer from '../ui/containers/AppContainer.jsx';
import MainContainer from '../ui/containers/MainContainer.jsx';

import RegisterPage from '../ui/pages/RegisterPage.jsx';
import LoginPage from '../ui/pages/LoginPage.jsx';
import Landing from '../ui/pages/Landing.jsx';
import AddCampaign from '../ui/pages/AddCampaign.jsx';

export const renderRoutes = () => (
    <Router>
        <div>
            <Route exact path="/" component={Landing}/>
            <Route path="/login" component={LoginPage}/>
            <Route path="/register" component={RegisterPage}/>
            <Route path="/home" component={AppContainer}/>
        </div>
    </Router>
);
