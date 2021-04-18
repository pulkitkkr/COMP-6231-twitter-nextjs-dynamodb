import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import GridItem from 'components/Grid/GridItem.js';
import { buildTimeChart } from 'variables/timechart';
import dynamic from 'next/dynamic';
const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const CountryChart = ({ companyData, isNone }) => {
  if (isNone) {
    return <h4>Please Select a Company to View Analytical chart</h4>;
  }

  if (!companyData || companyData?.length === 0) {
    return (
      <>
        <div style={{ position: 'relative' }}>
          <p>Please Wait We are trying to fetch Data ..</p>
          <Skeleton width={1000} height={140} animation="wave" variant="text" />
          <Skeleton width={1000} height={300} animation="wave" variant="text" />
        </div>
      </>
    );
  }

  const X = companyData.map((c) => {
    return new Date(c.post_date * 1000);
  });
  const Y = companyData.map((c) => 1);
  const title = 'Tweets  Count';

  const timechart = buildTimeChart({ X, Y, title });

  return (
    <GridItem xs={12} sm={12} md={12}>
      <br />
      <ApexChart options={timechart.options} series={timechart.series} height={400} type="area" />
    </GridItem>
  );
};

export default CountryChart;
