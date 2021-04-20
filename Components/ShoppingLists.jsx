import React, { BreaksStrictMode } from 'react';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Popover, TextField, Tooltip, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';


const useStyles = makeStyles((theme) => ({
  selected: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  addIcon: {
    width: 'unset',
    display: 'block',
    'margin-left': 'auto',
    'margin-right': 'auto',
    'margin-top': 1,
    'margin-bottom':6,
    '&:hover': {
      'cursor': 'pointer !important'
    },
  },
  ListField: {
    width:'100%',
    padding:'0'
  },
  fullHeight: {
    height:'100%'
  }  
}));

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function ShoppingLists() {
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <div className={`${classes.selected} ${classes.fullHeight}`}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={selectedTab}
        onChange={handleChange}
        >
          
        <Tab label="Item One" {...a11yProps(0)}/>
        <Tab label="Item Two"{...a11yProps(1)}/>
        <Tab label="Item Three" {...a11yProps(2)}/>
      </Tabs>
      <Divider/>
      <Tooltip title="Add a list">
      <AddCircleOutlineRoundedIcon className={classes.addIcon}/>
      </Tooltip>
      </div>
      
      
  );
}
