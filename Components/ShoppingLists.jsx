import React, {useState} from 'react';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {Tooltip} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';


const useStyles = makeStyles((theme) => ({
  selected: {
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
    width:'100%',
    padding:'0'
  },
  fullHeight: {
    height:'100%'
  },
}));



export default function ShoppingLists() {
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = useState(0);
  const [lists, setLists] = useState([]);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const placeholdLists = [
    {
      label: "Test1",
    },
    {
      label: "Test2"
    }
  ];
  const handleAdd = (event) => {
    setLists(prevData => {
      return [...prevData, {label: "new"}]
    })
  }

  return (
    <div className={`${classes.selected} ${classes.fullHeight}`}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={selectedTab}
        onChange={handleChange}
        >
        {placeholdLists.map((list, index) => (
          <Tab key={index} label={list.label}/>
        ))}
        
        
        {lists.map((list, index) => (
            <Tab key={index} label={list.label}/>
        ))}
            
      </Tabs>
      <Tooltip title="Add a list">
        <AddCircleOutlineRoundedIcon className={classes.addIcon} onClick={handleAdd}/>
      </Tooltip>
      <Divider/>
      
       
      </div>
      
      
  );
}
