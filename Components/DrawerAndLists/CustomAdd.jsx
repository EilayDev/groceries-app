import {IconButton, Tooltip, Divider, ButtonBase} from '@material-ui/core';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import { makeStyles } from '@material-ui/core/styles';

import React from 'react'

const useStyles = makeStyles((theme) => ({
  addIcon: {
    '&:hover': {
      'cursor': 'pointer !important'
    },
  },
}))


export function CustomAdd(props, ref) {
  const classes = useStyles();
  const handleAdd = (_event) => {
    props.setLists(prevData => {
      return [...prevData, { label: "new", id: prevData.length }]
    })
  }
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



export default CustomAdd