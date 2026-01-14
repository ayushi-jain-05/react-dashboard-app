// import
import Dashboard from "pages/Dashboard";
import Profile from "pages/Profile";

import {
  HomeIcon,
  StatsIcon,
  CreditIcon,
  PersonIcon,
  SupportIcon
} from "components/Icons/Icons";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <HomeIcon color="inherit" />,
    component: Dashboard,
    layout: "",
  },
  {
    path: "/tables",
    name: "Tables",
    icon: <StatsIcon color="inherit" />,
    component: Dashboard, // Redirects to Dashboard
    layout: "",
  },
  {
    path: "/billing",
    name: "Billing",
    icon: <CreditIcon color="inherit" />,
    component: Dashboard, // Redirects to Dashboard
    layout: "",
  },
  {
    path: "/rtl",
    name: "RTL",
    icon: <SupportIcon color="inherit" />,
    component: Dashboard, // Redirects to Dashboard
    layout: "",
  },
  {
    name: "ACCOUNT PAGES",
    category: "account",
    state: "pageCollapse",
    views: [
      {
        path: "/profile",
        name: "Profile",
        icon: <PersonIcon color="inherit" />,
        secondaryNavbar: true,
        component: Profile,
        layout: "",
      },
    ],
  },
];
export default dashRoutes;
