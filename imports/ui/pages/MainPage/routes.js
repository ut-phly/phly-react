import CampaignList from './CampaignList.jsx';
import Organizations from '../Organizations.jsx';
import Profile from '../Profile.jsx';

import {
  faHandHoldingHeart,
  faUsers,
  faUserCircle
} from '@fortawesome/free-solid-svg-icons';

var routes = [
  {
    path: "/",
    name: "Campaigns",
    icon: faHandHoldingHeart,
    component: CampaignList,
    layout: "/home"
  },
  {
    path: "/orgs",
    name: "Organizations",
    icon: faUsers,
    component: Organizations,
    layout: "/home"
  },
  {
    path: "/profile",
    name: "Profile",
    icon: faUserCircle,
    component: Profile,
    layout: "/home"
  }
];

export default routes;
