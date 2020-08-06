import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import AppContainer from '../ui/containers/AppContainer.jsx';
import MainContainer from '../ui/containers/MainContainer.jsx';

import RegisterPage from '../ui/external/RegisterPage.jsx';
import GetStarted from '../ui/external/GetStarted.jsx';
import LoginPage from '../ui/external/LoginPage.jsx';
import Landing from '../ui/external/Landing2.jsx';
import AddCampaign from '../ui/pages/AddCampaign.jsx';
import CampaignPage from '../ui/pages/CampaignPage.jsx';
import CampaignContainer from '../ui/external/PublicCampaignPage.jsx';
import MarketplaceContainer from '../ui/external/Marketplace.jsx';
import Policies from '../ui/external/Policies.jsx';
import Terms from '../ui/external/Terms.jsx';
import AboutUs from '../ui/external/AboutUs.jsx';
import Pricing from '../ui/external/Pricing.jsx';

import { Campaigns } from '../api/campaigns.js';

export const renderRoutes = () => (
    <Router>
      <div>
        <Route path="/home" component={AppContainer}/>
        <Route exact path="/" component={Landing}/>
        <Route path="/login" component={LoginPage}/>
        <Route path="/register" component={RegisterPage}/>
        <Route path="/getstarted" component={GetStarted}/>
        <Route path="/public/:id" component={CampaignContainer}/>
        <Route path="/campaigns" component={MarketplaceContainer}/>
        <Route path="/policies" component={Policies}/>
        <Route path="/tos" component={Terms}/>
        <Route path="/aboutus" component={AboutUs}/>
        <Route path="/pricing" component={Pricing}/>
      </div>
    </Router>
);
