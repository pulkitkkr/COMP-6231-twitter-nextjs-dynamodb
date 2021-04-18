import { startOfDay, parseISO } from 'date-fns';

import format from 'date-fns/format';

export const buildTimeChart = ({ X, Y, title }) => {
  const dayCount = new Map();

  X.forEach((x, i) => {
    const SOD = startOfDay(x).getTime();

    if (dayCount.has(SOD)) {
      dayCount.set(SOD, dayCount.get(SOD) + 1);
    } else {
      dayCount.set(SOD, 1);
    }
  });

  const data = [];

  const xxx = Object.fromEntries(dayCount);

  console.log(xxx);
  for (let key in xxx) {
    const date = new Date(key * 1);

    data.push({ x: date, y: xxx[key] });
  }

  const series = [
    {
      name: title,
      data,
    },
  ];

  const options = {
    chart: {
      type: 'timeseries',
      stacked: false,
      height: 350,
      zoom: {
        type: 'x',
        enabled: true,
        autoScaleYaxis: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
    },
    title: {
      text: title,
      align: 'left',
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 90, 100],
      },
    },
    yaxis: {
      labels: {
        formatter: function (val) {
          return val.toFixed(2) + ' ';
        },
      },
      title: {
        text: `${title}`,
      },
    },
    xaxis: {
      labels: {
        formatter: function (args) {
          const date = new Date(args);
          const label = date.getDate() + '-' + date.getMonth() + 1 + '-' + date.getFullYear();

          return label;
        },
      },
    },
    tooltip: {
      x: {
        format: 'dd MMM yyyy',
      },
    },
  };
  return { series, options };
};
