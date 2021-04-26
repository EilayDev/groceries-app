import '../styles/globals.css'
import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../Components/theme'
import Head from 'next/head';
import { Provider } from 'react-redux'
import {useStore} from '../redux/store'

 function MyApp(props) {
  const { Component, pageProps } = props;
  const reduxStore = useStore(pageProps.initialReduxState)
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
      <Provider store={reduxStore}>
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

export default MyApp;