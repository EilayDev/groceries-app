import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import CloseIcon from '@material-ui/icons/Close';
import { SwipeableDrawer, useMediaQuery, Drawer, IconButton, ButtonBase, Tab, Tabs, Divider } from '@material-ui/core';
import CustomAdd from './CustomAdd';
import { useSelector, useDispatch } from 'react-redux'
import {openDrawer, closeDrawer, selectorIsOpen, setSelectedTab, removeSelectedTab, selectorGetLists, selectorGetSelectedTab} from '../../redux/drawer/drawerReducer'
import {removeGroceries} from '../../redux/groceries/groceriesReducer'

const useStyles = makeStyles((theme) => ({
  rightBorder: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  ListField: {
    width: '100%',
    padding: '0'
  },
  fullHeight: {
    height: '100%'
  },
  selected: {
    '& span': {
      'font-weight': 'bold'
    }
  },
  drawerPaper: {
    width: '15em',
    position: 'static',
  }
}));

export default function ShoppingLists(props) {
  const classes = useStyles();
  const isScreenLarge = useMediaQuery('(min-width:600px)');

  // redux
  const isDrawerOpen = useSelector(selectorIsOpen)
  const getLists = useSelector(selectorGetLists)
  const getSelectedTab = useSelector(selectorGetSelectedTab)
  const dispatch = useDispatch();


  const handleChange = (_event, newValue) => {
    dispatch(setSelectedTab(newValue))
  };
  const openDrawerHandler = () => {
    dispatch(openDrawer())
  }
  const closeDrawerHandler = () => {
    dispatch(closeDrawer());
  }
  
  const TabWrapper = React.forwardRef((props, ref) => {
    const handleDelList = (event) => {
      event.stopPropagation();
      if (getLists.length == 1) { return }
      dispatch(removeSelectedTab())
      dispatch(removeGroceries(props.tab))
      if (getSelectedTab == getLists.length - 1) {
        let tabs = document.getElementsByClassName("MuiTab-textColorInherit");
        tabs[tabs.length - 2].click();
      }
    }
    return (
      <ButtonBase ref={ref} {...props}> {props.children} {props['aria-selected'] && <CloseIcon onClick={handleDelList} />} </ButtonBase >
    )
  })
  return (
    <>
      { isScreenLarge ?
        <Drawer
          variant='permanent'
          anchor="left"
          className={classes.fullHeight}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={`${classes.rightBorder} ${classes.fullHeight}`}>
            <Tabs
              orientation="vertical"
              value={getSelectedTab}
              onChange={handleChange}
            >
              {getLists.map((list, index) => (
                <Tab key={index} label={list.label} tab={getSelectedTab} classes={{ selected: classes.selected }} component={TabWrapper} />
              ))}
              <CustomAdd/>
            </Tabs>
          </div>
        </Drawer>
        :
        <SwipeableDrawer
          onOpen={openDrawerHandler}
          onClose={closeDrawerHandler}
          anchor="left"
          open={isDrawerOpen}
          className={classes.fullHeight}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div>
            <IconButton onClick={closeDrawerHandler}>
              <ChevronLeftIcon />
            </IconButton>
            <Divider />
          </div>
          <div className={`${classes.rightBorder} ${classes.fullHeight}`}>
            <Tabs
              orientation="vertical"
              value={getSelectedTab}
              onChange={handleChange}
            >
              {getLists.map((list, index) => (
                <Tab key={index} label={list.label} classes={{ selected: classes.selected }} component={TabWrapper} />
              ))}
              <CustomAdd />
            </Tabs>
          </div>
        </SwipeableDrawer>
      }
    </>
  );
}