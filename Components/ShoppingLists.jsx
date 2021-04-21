import React, { useState, useEffect, preventDefault } from 'react';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Tooltip } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ButtonBase from '@material-ui/core/ButtonBase';



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
    width: '100%',
    padding: '0'
  },
  fullHeight: {
    height: '100%'
  },
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

export default function ShoppingLists() {
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = useState(0);
  const [lists, setLists] = useState(placeholdLists);

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
    if(lists.length==1){return}
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

  const TabWrapper = React.forwardRef((props, ref) => {
    return (
      <ButtonBase ref={ref} {...props}> {props.children} {props.className.includes("Mui-selected") && <CloseIcon onClick={handleDelList} />} </ButtonBase >
    )
  })


  return (
    <div className={`${classes.selected} ${classes.fullHeight}`}>
      <Tabs
        orientation="vertical"
        value={selectedTab}
        onChange={handleChange}
      >
        {lists.map((list, index) => (
          <Tab key={index} label={list.label} component={TabWrapper} />
        ))}
        <CustomAdd />
      </Tabs>




    </div>


  );
}