import styles from '../styles/Main.module.css'
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Fab, Tooltip} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Add';
import Groceries from '../Components/GroceryMain/Groceries'
import ShoppingLists from "../Components/DrawerAndLists/ShoppingLists";
import {initializeStore} from '../redux/store'
import {initializeLists, selectorGetSelectedTab} from '../redux/drawer/drawerReducer'
import {initializeGroceries, addToGroceriesAt} from '../redux/groceries/groceriesReducer'
import {useSelector, useDispatch} from 'react-redux'

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
  const SERVER = 'http://localhost:3000/api/'
  const reduxStore = initializeStore();
  const {dispatch} = reduxStore

  // Lists
  let response = await fetch(SERVER + 'getLists')
  let data = await response.json()
  dispatch(initializeLists(data))

  // Groceries
  response = await fetch(SERVER + 'getGroceries')
  data = await response.json()

  dispatch(initializeGroceries(data))
  return { props: { initialReduxState: reduxStore.getState()}}
}

export default function Main(props) {
  const classes = useStyles();
  const dispatch = useDispatch()
  const getSelectedTab = useSelector(selectorGetSelectedTab);
  const handleFabClick = () => {
    // push empty grocery item
    dispatch(addToGroceriesAt({index: getSelectedTab, item: {itemName: '', amount: '', isChecked: false}}))
  }
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
        <Fab color="primary" aria-label="edit" onClick={handleFabClick} className={classes.fab}>
          <EditIcon />
        </Fab>
      </Tooltip>
    </main>
    <Footer />
    </>
  )
}
