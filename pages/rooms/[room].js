import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Fab, Tooltip} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Add';
import Groceries from '../../Components/GroceryMain/Groceries'
import ShoppingLists from "../../Components/DrawerAndLists/ShoppingLists";
import {initializeStore} from '../../redux/store'
import {initializeLists, selectorGetSelectedTabName} from '../../redux/drawer/drawerReducer'
import {initializeGroceries, addToGroceriesAt} from '../../redux/groceries/groceriesReducer'
import {useSelector, useDispatch} from 'react-redux'

import Header from '../../Components/Header/Header'

const useStyles = makeStyles((theme) => ({
  main: {
    display: 'flex',
    'align-items': 'stretch',
    height: 'calc(100% - 64px)',
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
export async function getServerSideProps(context){
  const {room} = context.query;
  console.log(context)
  let SERVER = ''
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    SERVER = 'http://localhost:3002/api/'
  } else {
    SERVER = 'http://localhost:3005/api/'
  }
  const reduxStore = initializeStore();
  const {dispatch} = reduxStore

  const response = await fetch(SERVER + 'getRoomData/' + room)
  let data;
  try {
    data = await response.json()
  }
  // redirect to mainpage if room doesn't exist or has some error
  catch{
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props:{},
    };
  }
  const lists = data.map(i => {
    return {label: i.linkedTab}
  })
  dispatch(initializeLists(lists))
  dispatch(initializeGroceries(data))

  return { props: { initialReduxState: reduxStore.getState()}}
}

export default function Main(props) {
  const classes = useStyles();
  const dispatch = useDispatch()
  const getSelectedTabName = useSelector(selectorGetSelectedTabName);
  const handleFabClick = () => {
    // push empty grocery item
    dispatch(addToGroceriesAt({name: getSelectedTabName, item: {itemName: '', amount: '', isChecked: false}}))
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
    </>
  )
}
