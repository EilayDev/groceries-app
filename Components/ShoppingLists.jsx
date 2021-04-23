import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import CloseIcon from '@material-ui/icons/Close';
import { SwipeableDrawer, useMediaQuery, IconButton, Drawer, ButtonBase, Tooltip, Tab, Tabs, Divider } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  rightBorder: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  addIcon: {
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
  drawerPaper: {
    width: '15em',
    position: 'static',
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
  const isScreenLarge = useMediaQuery('(min-width:600px)');

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
        <IconButton color="inherit" onClick={handleAdd}>
          <Tooltip title="Add a list">
            <AddCircleOutlineRoundedIcon className={classes.addIcon} />
          </Tooltip>
        </IconButton>

        <Divider />
      </>
    )
  }

  const openDrawerHandler = () => {
    props.setDrawerState(true)
  }
  const closeDrawerHandler = () => {
    props.setDrawerState(false)
  }

  const TabWrapper = React.forwardRef((props, ref) => {
    return (
      <ButtonBase ref={ref} {...props}> {props.children} {props['aria-selected'] && <CloseIcon onClick={handleDelList} />} </ButtonBase >
    )
  })

  const CustomDrawer = (props) => {
    if (isScreenLarge) {
      return (
        <Drawer {...props}>
          {props.children}
        </Drawer>
      )
    }
    return (
      <SwipeableDrawer {...props}>
        {props.children}
      </SwipeableDrawer>
    )
  }

  return (
    <CustomDrawer
      {...(isScreenLarge ? { variant: 'permanent' } : {
        onOpen: openDrawerHandler,
        onClose: closeDrawerHandler
      })}

      anchor="left"
      open={props.drawerState}
      className={classes.fullHeight}
      classes={{
        paper: classes.drawerPaper
      }}
    >
      {!isScreenLarge &&
        <div>
          <IconButton onClick={closeDrawerHandler}>
            <ChevronLeftIcon />
          </IconButton>
          <Divider />
        </div>
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