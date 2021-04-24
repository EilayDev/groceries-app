import '../styles/globals.css'
import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../Components/theme'
import Head from 'next/head';
import { Provider } from 'react-redux'
import store from '../redux/store'

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
    <React.Fragment>
    <Head>
      <title>Grocery App</title>
    </Head>
    <ThemeProvider theme={theme} >
      <CssBaseline/>
      <Provider store={store}>
        <Component {...pageProps}/>
      </Provider>
  </ThemeProvider>
  </React.Fragment>
    ) 
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
