import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

const CountryChart = ({ companyData, isNone }) => {
  if (isNone) {
    return <h4>Please Select a Company to View Analytical chart</h4>;
  }

  if (!companyData || companyData?.length === 0) {
    return (
      <>
        <h4>Please Wait We are trying to get data from DynamoDB</h4>
        <div style={{ position: 'relative', top: -80 }}>
          <Skeleton width={1000} height={700} animation="wave" variant="text" />
        </div>
      </>
    );
  }

  return <h3>{companyData?.length}</h3>;
};

export default CountryChart;
