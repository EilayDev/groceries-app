import '../styles/globals.css'
import React, {useState} from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../Components/theme'
import Head from 'next/head';


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
  

  const [drawerState, setDrawerState] = useState(false);
  function a11yProps(){
    return {
      setDrawerState:setDrawerState,
      drawerState:drawerState
    }
  } 
  
  
  return(
    <React.Fragment>
    <Head>
      <title>Grocery App</title>
    </Head>
    <ThemeProvider theme={theme} >
      <CssBaseline />
      <Header {...a11yProps()} />
      <Component {...pageProps} {...a11yProps()} />
      <Footer />
  </ThemeProvider>
  </React.Fragment>
    ) 
}


MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
