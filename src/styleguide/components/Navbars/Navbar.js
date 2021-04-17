import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from 'components/CustomButtons/Button.js';

import styles from 'assets/jss/material-dashboard-react/components/headerStyle.js';
import { useRouter } from 'next/router';

const useStyles = makeStyles(styles);

export default function Header(props) {
  const classes = useStyles();
  const router = useRouter();

  function isActiveRoute(routeName) {
    return router.pathname === routeName;
  }

  function getRouteName() {
    let name;

    props.routes.forEach((prop) => {
      if (isActiveRoute(prop.path)) {
        name = prop.name;
      }
    });

    return name || '';
  }

  const { color } = props;

  const appBarClasses = classNames({
    [' ' + classes[color]]: color,
  });
  return (
    <AppBar className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <div className={classes.flex}>
          <Button color="transparent" href="#" className={classes.title}>
            {getRouteName()}
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  color: PropTypes.oneOf(['primary', 'info', 'success', 'warning', 'danger']),
  handleDrawerToggle: PropTypes.func,
  routes: PropTypes.arrayOf(PropTypes.object),
};
