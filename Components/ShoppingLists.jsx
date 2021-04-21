import React, { useState, useEffect, preventDefault } from 'react';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Tooltip } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ButtonBase from '@material-ui/core/ButtonBase';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';



const useStyles = makeStyles((theme) => ({
  rightBorder: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  addIcon: {
    width: 'unset',
    display: 'block',
    'margin-left': 'auto',
    'margin-right': 'auto',
    'margin-bottom': '10px',
    '&:hover': {
      'cursor': 'pointer !important'
    },

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
  space: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  drawer: {
    [theme.breakpoints.down('lg')]:{
      width:'40%'
    },
    [theme.breakpoints.up('lg')]:{
      width: '10%'
    }
  }

}));

const placeholdLists = [
  {
    label: "Default",
    id: 0
  },
  {
    label: "Test2",
    id: 1
  }
];



export default function ShoppingLists(props) {
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = useState(0);
  const [lists, setLists] = useState(placeholdLists);
  const isScreenLarge = useMediaQuery('(min-width:1280px)');

  const handleChange = (_event, newValue) => {
    setSelectedTab(newValue);
  };
  const handleAdd = (_event) => {
    setLists(prevData => {
      return [...prevData, { label: "new", id: prevData.length }]
    })
  }

  const handleDelList = (event) => {
    event.stopPropagation();
    if (lists.length == 1) { return }
    setLists((prevData) => (
      prevData.filter((_e, i) => i != selectedTab)))
    if (selectedTab == lists.length - 1) {
      let tabs = document.getElementsByClassName("MuiTab-textColorInherit");
      tabs[tabs.length - 2].click();
    }
  }
  const CustomAdd = () => {
    return (
      <>
        <Tooltip title="Add a list">
          <AddCircleOutlineRoundedIcon className={classes.addIcon} onClick={handleAdd} />
        </Tooltip>
        <Divider />
      </>
    )
  }

  const handleSwipeClose = () => {
    props.setDrawerState(false)
  }
  const handleSwipeOpen = () => {
    props.setDrawerState(true)
  }

  const TabWrapper = React.forwardRef((props, ref) => {
    return (
      <ButtonBase ref={ref} {...props}> {props.children} {props['aria-selected'] && <CloseIcon onClick={handleDelList} />} </ButtonBase >
    )
  })

  const closeDrawerHandler = () => {
    props.setDrawerState(false)
  }
  
  const CustomDrawer = (props) => {
    if (isScreenLarge) {
      return (
        <Drawer {...props}>
          {props.children}
        </Drawer>
      )
    }
    else {
      return (
        <SwipeableDrawer {...props}>
          {props.children}
        </SwipeableDrawer>
      )
    }
  }

  return (
    <CustomDrawer
    {...(isScreenLarge ? {variant:'permanent'} : {onOpen:handleSwipeOpen,
    onClose:handleSwipeClose})}
      
      anchor="left"
      open={props.drawerState}
      classes={{
        paper: classes.drawer
      }}
      
    >
      <div className={`${classes.space}`} />
      {!isScreenLarge &&
        <IconButton onClick={closeDrawerHandler}>
          <ChevronLeftIcon />
        </IconButton>
      }

      <div className={`${classes.rightBorder} ${classes.fullHeight}`}>
        <Tabs
          orientation="vertical"
          value={selectedTab}
          onChange={handleChange}
        >
          {lists.map((list, index) => (
            <Tab key={index} label={list.label} classes={{ selected: classes.selected }} component={TabWrapper} />
          ))}
          <CustomAdd />
        </Tabs>
      </div>

    </CustomDrawer>
  );
}