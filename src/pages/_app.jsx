import 'styles/resets.scss';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
import "assets/css/material-dashboard-react.css?v=1.9.0";

import dynamic from 'next/dynamic';
import React from 'react';
import NotificationProvider from 'context/NotificationContext';

const App = ({ Component, pageProps }) => {
  return (
    <NotificationProvider>
      <Component {...pageProps} />
    </NotificationProvider>
  );
};

export default dynamic(() => Promise.resolve(App), {
  ssr: false,
});
