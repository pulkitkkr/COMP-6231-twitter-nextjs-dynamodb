import 'styles/resets.scss';
import 'perfect-scrollbar/css/perfect-scrollbar.css';

import dynamic from 'next/dynamic';
import React from 'react';

const App = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default dynamic(() => Promise.resolve(App), {
  ssr: false,
});
