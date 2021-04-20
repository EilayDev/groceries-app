import '../styles/globals.scss'
import React from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../Components/theme'

import Header from '../Components/Header/Header'
import Footer from '../Components/Footer/Footer'



export default function MyApp(props) {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  return(
    <ThemeProvider theme={theme} >
      <CssBaseline />
      <Header />
      <Component {...pageProps} />
      <Footer />
  </ThemeProvider>
    ) 
}


MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
