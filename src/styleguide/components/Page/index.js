import React, { useEffect } from 'react';

import PerfectScrollbar from 'perfect-scrollbar';

import { makeStyles } from '@material-ui/core/styles';
import styles from 'assets/jss/material-dashboard-react/layouts/adminStyle.js';

import bgImage from 'assets/img/sidebar-2.jpg';
import logo from 'assets/img/reactlogo.png';
import routes from 'routes';

import Navbar from 'components/Navbars/Navbar.js';
import Sidebar from 'components/Sidebar/Sidebar.js';

const useStyles = makeStyles(styles);

let ps;

const Page = ({ children }) => {
  const classes = useStyles();
  const mainPanel = React.createRef();

  useEffect(() => {
    if (navigator.platform.indexOf('Win') > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
      document.body.style.overflow = 'hidden';
    }

    return function cleanup() {
      if (navigator.platform.indexOf('Win') > -1) {
        ps.destroy();
      }
    };
  }, [mainPanel]);

  return (
    <div className={classes.wrapper}>
      <Sidebar
        routes={routes}
        logoText={'COMP-6231 DSD'}
        image={bgImage}
        logo={logo}
        color={'blue'}
        userLabel={null}
      />
      <div className={classes.mainPanel} ref={mainPanel}>
        <Navbar handleDrawerToggle={() => {}} routes={routes} />
      </div>
      <div className={classes.content}>
        <div className={classes.container}>{children}</div>
      </div>
    </div>
  );
};

export default Page;
