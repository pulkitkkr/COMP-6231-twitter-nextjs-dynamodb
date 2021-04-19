import DashboardIcon from '@material-ui/icons/Dashboard';
import AddIcon from '@material-ui/icons/Add';
import ListIcon from '@material-ui/icons/List';
import SupervisorIcon from '@material-ui/icons/SupervisorAccount';

const dashboardRoutes = [
  {
    path: '/',
    name: 'Dashboard',
    icon: DashboardIcon,
  },
  {
    path: '/query',
    name: 'Query',
    icon: SupervisorIcon,
    layout: '/admin',
    actionRoutes: [
      {
        path: '/add',
        name: 'Add',
        icon: AddIcon,
      },
      {
        path: '/view',
        name: 'View',
        icon: ListIcon,
      },
    ],
  },
];

export default dashboardRoutes;
