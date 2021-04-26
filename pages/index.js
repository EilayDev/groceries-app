import styles from '../styles/Main.module.css'
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Add';
import Groceries from '../Components/GroceryMain/Groceries'
import ShoppingLists from "../Components/DrawerAndLists/ShoppingLists";
import Tooltip from '@material-ui/core/Tooltip';
import {initializeStore} from '../redux/store'
import {initializeLists} from '../redux/drawer/drawerReducer'
import {initializeGroceries} from '../redux/groceries/groceriesReducer'

import Header from '../Components/Header/Header'
import Footer from '../Components/Footer/Footer'

const useStyles = makeStyles((theme) => ({
  main: {
    display: 'flex',
    'align-items': 'stretch',
    height: '85vh',
    width: '100%'
  },
  fab: {
    position: 'absolute',
    [theme.breakpoints.down('md')]: {
      bottom: theme.spacing(5),
      right: theme.spacing(5),
    },
    [theme.breakpoints.up('md')]: {
      bottom: theme.spacing(10),
      right: theme.spacing(10),
    }
  },
  groceriesDiv: {
    flex: 1,
  }
}))

// fetch data
export async function getServerSideProps(){
  const reduxStore = initializeStore();
  const {dispatch} = reduxStore

  // Lists
  let response = await fetch('http://localhost:3001/api/getLists')
  let data = await response.json()
  dispatch(initializeLists(data))

  // Groceries
  response = await fetch('http://localhost:3001/api/getGroceries')
  data = await response.json()

  dispatch(initializeGroceries(data))
  return { props: { initialReduxState: reduxStore.getState()}}
}

export default function Main(props) {
  const classes = useStyles();

  return (
    <>
    <Header/>
    <main className={classes.main}>
      <div>
        <ShoppingLists/>
      </div>
      <div className={classes.groceriesDiv}>
        <Groceries />
      </div>
      <Tooltip title="Add a product">
        <Fab color="primary" aria-label="edit" className={classes.fab}>
          <EditIcon />
        </Fab>
      </Tooltip>
    </main>
    <Footer />
    </>
  )
}
