import React, { useContext, useEffect, useState } from 'react';
import Page from 'components/Page/index';
import { NotificationContext } from 'context/NotificationContext';
import useSWR from 'swr';
import GridContainer from 'components/Grid/GridContainer';
import Skeleton from '@material-ui/lab/Skeleton';
import GridItem from 'components/Grid/GridItem.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardIcon from 'components/Card/CardIcon.js';
import CardFooter from 'components/Card/CardFooter.js';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import dashboardStyles from 'assets/jss/material-dashboard-react/views/dashboardStyle.js';
import { getDateLabel } from 'lib/dates';
import dummyData from 'lib/dummyCompanyResponse';
import MenuItem from '@material-ui/core/MenuItem';
import CustomSelect from 'components/CustomSelect/CustomSelect';
import CountryChart from './CountryChart';

const getMetaData = async () => {
  const response = await fetch(`/api/meta`);
  return await response.json();
};

const styles = {
  ...dashboardStyles,
  customSelect: {
    minWidth: 200,
  },
  lastUpdatedText: {
    display: 'inline-block',
    marginLeft: 20,
  },
};

const useStyles = makeStyles(styles);

const NoneOption = { id: 'none', label: 'None' };

const availableCompanies = [
  { id: '$AAPL', label: 'Apple' },
  { id: '$GOOG', label: 'Google' },
  { id: '$AMZN', label: 'Amazon' },
  { id: '$TSLA', label: 'Tesla' },
  { id: '$MSFT', label: 'Microsoft' },
];

const StatItem = ({ color = 'warning', iconName, label, value }) => {
  const classes = useStyles();

  if (!value && value !== 0) {
    return (
      <div
        style={{
          display: 'flex',
          marginBottom: 15,
          marginRight: 25,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Skeleton width={280} height={40} animation="wave" variant="text" />
        <Skeleton animation="wave" width={280} height={100} variant="rect" />
      </div>
    );
  }
  return (
    <GridItem xs={12} sm={6} md={3}>
      <Card>
        <CardHeader color={color} stats icon>
          <CardIcon color={color}>
            <Icon>{iconName}</Icon>
          </CardIcon>
          <p className={classes.cardCategory}>{label}</p>
          <h3 className={classes.cardTitle}>{value}</h3>
        </CardHeader>
        <CardFooter />
      </Card>
    </GridItem>
  );
};

const Dashboard = () => {
  const classes = useStyles();
  const { addNotification } = useContext(NotificationContext);
  const { data, error } = useSWR('/api/meta', getMetaData);

  const createWarnings = () => {
    if (error) {
      addNotification({
        color: 'danger',
        message: 'An unexpected error occurred while loading Table Data',
      });
    }
  };

  useEffect(createWarnings, [data, error]);

  const [selectedCompany, setSelectedCompany] = useState(NoneOption);

  const Table = data?.Table;

  const { ItemCount, CreationDateTime, TableStatus, TableName } = Table || {};

  const getCompanyTweets = async () => {
    console.log(selectedCompany);
    if (selectedCompany.id === NoneOption.id)
      return new Promise((resolve) =>
        resolve({
          data: null,
          error: null,
        }),
      );

    // ToDo remove this while presenting
    // return new Promise((resolve) => resolve(dummyData));

    try {
      const response = await fetch(`/api/tweets?company=${selectedCompany.id}`);
      return await response.json();
    } catch (err) {
      addNotification({
        color: 'danger',
        message: 'An unexpected error occurred while loading Tweets for: ' + selectedCompany.label,
      });
    }
  };

  const { data: companyData, error: companyError } = useSWR(
    `/api/tweets?company=${selectedCompany.id}`,
    getCompanyTweets,
  );

  const { Items: companyItems, Count: companyItemsCount } = companyData || {};

  return (
    <Page>
      <GridContainer>
        <StatItem color={'warning'} iconName={'functions'} label={'Number of Posts'} value={ItemCount} />
        <StatItem
          color={'primary'}
          iconName={'event'}
          label={'Table Created on'}
          value={getDateLabel(CreationDateTime)}
        />
        <StatItem
          color={TableStatus === 'ACTIVE' ? 'success' : 'danger'}
          iconName={TableStatus === 'ACTIVE' ? 'sync' : 'sync_problem'}
          label={'TableStatus'}
          value={TableStatus}
        />
        <StatItem color={'info'} iconName={'table_chart'} label={'TableName'} value={TableName} />
      </GridContainer>
      <GridContainer>
        <CustomSelect
          labelText="Company"
          id="company-selection"
          formControlProps={{
            className: classes.customSelect,
          }}
          selectProps={{
            value: selectedCompany.id || 'all',
            onChange: (e) => {
              if (e.target.value === NoneOption.id) {
                setSelectedCompany(NoneOption);
                return;
              }

              const item = availableCompanies.find((company) => company.id === e.target.value);

              setSelectedCompany(item);
            },
          }}
        >
          {[NoneOption, ...availableCompanies].map((company) => (
            <MenuItem key={company.id} value={company.id}>
              {company.label}
            </MenuItem>
          ))}
        </CustomSelect>
        <GridItem xs={12} sm={12} md={12}>
          <CountryChart isNone={selectedCompany.id === NoneOption.id} companyData={companyItems} />
        </GridItem>
      </GridContainer>
    </Page>
  );
};

export default Dashboard;
