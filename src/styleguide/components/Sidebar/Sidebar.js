/*eslint-disable*/
import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';

import styles from 'assets/jss/material-dashboard-react/components/sidebarStyle.js';

const useStyles = makeStyles(styles);

export default function Sidebar(props) {
  const router = useRouter();
  const classes = useStyles();
  // verifies if routeName is the one active (in browser input)
  function activeRoute(routeName) {
    return router.pathname === routeName;
  }

  const { color, logo, image, logoText, routes, userLabel } = props;

  var links = (
    <List className={classes.list}>
      {routes.map((prop, key) => {
        var activePro = ' ';
        var listItemClasses;

        listItemClasses = classNames({
          [' ' + classes[color]]: activeRoute(prop.layout + prop.path),
        });

        const whiteFontClasses = classNames({
          [' ' + classes.whiteFont]: activeRoute(prop.layout + prop.path),
        });

        const Label = (
          <ListItem button className={classes.itemLink + listItemClasses}>
            {typeof prop.icon === 'string' ? (
              <Icon
                className={classNames(classes.itemIcon, whiteFontClasses, {
                  [classes.itemIconRTL]: props.rtlActive,
                })}
              >
                {prop.icon}
              </Icon>
            ) : (
              <prop.icon
                className={classNames(classes.itemIcon, whiteFontClasses, {
                  [classes.itemIconRTL]: props.rtlActive,
                })}
              />
            )}
            <ListItemText
              primary={props.rtlActive ? prop.rtlName : prop.name}
              className={classNames(classes.itemText, whiteFontClasses, {
                [classes.itemTextRTL]: props.rtlActive,
              })}
              disableTypography={true}
            />
          </ListItem>
        );

        const isNestedLink = prop.actionRoutes && prop.actionRoutes.length > 0;

        if (isNestedLink) {
          return (
            <TreeView key={key} defaultExpanded={['3']} className={classes.treeView}>
              <TreeItem
                nodeId={`${prop.name}-${key}`}
                classes={{
                  root: classes.mainTreeItemRoot,
                  content: classes.content,
                  expanded: classes.mainItemExpanded,
                  selected: classes.selected,
                  group: classes.group,
                  label: classes.mainItemLabel,
                }}
                label={
                  <div>
                    <prop.icon
                      className={classNames(classes.itemIcon, whiteFontClasses, {
                        [classes.itemIconRTL]: props.rtlActive,
                      })}
                    />
                    {prop.name}
                  </div>
                }
              >
                {prop.actionRoutes
                  .filter((item) => !item.isHidden)
                  .map((item, key) => (
                    <Link href={prop.path + item.path} className={classes.item} activeClassName="active">
                      <TreeItem
                        nodeId={`${item.name}-${key}`}
                        classes={{
                          root: classes.treeItemRoot,
                          content: classes.content,
                          expanded: classes.expanded,
                          selected: classes.selected,
                          group: classes.group,
                          label: activeRoute(prop.layout + prop.path + item.path)
                            ? classes.treeItemLabelSelected
                            : classes.treeItemLabel,
                        }}
                        label={
                          <>
                            <item.icon
                              className={classNames(classes.itemIcon, whiteFontClasses, {
                                [classes.itemIconRTL]: props.rtlActive,
                              })}
                            />
                            {item.name}
                          </>
                        }
                      />
                    </Link>
                  ))}
              </TreeItem>
            </TreeView>
          );
        }

        return (
          <Link href={prop.path} className={activePro + classes.item} activeClassName="active" key={key}>
            {Label}
          </Link>
        );
      })}
    </List>
  );

  var brand = (
    <div
      className={classes.logo}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection: 'column',
      }}
    >
      <Link href="/">
        <a className={classNames(classes.logoLink)}>
          <div className={classes.logoImage}>
            <img src={logo} alt="logo" className={classes.img} />
          </div>
          {logoText}
        </a>
      </Link>

      <div>
        <p className={classes.userName}>{userLabel}</p>
      </div>
    </div>
  );

  return (
    <div>
      <Hidden smDown implementation="css">
        <Drawer
          anchor={props.rtlActive ? 'right' : 'left'}
          variant="permanent"
          open
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerPaperRTL]: props.rtlActive,
            }),
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>{links}</div>
          {image !== undefined ? (
            <div className={classes.background} style={{ backgroundImage: 'url(' + image + ')' }} />
          ) : null}
        </Drawer>
      </Hidden>
    </div>
  );
}

Sidebar.propTypes = {
  rtlActive: PropTypes.bool,
  bgColor: PropTypes.oneOf(['purple', 'blue', 'green', 'orange', 'red']),
  logo: PropTypes.string,
  image: PropTypes.string,
  userLabel: PropTypes.string,
  logoText: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
};
