import {IconButton, Tooltip, Divider} from '@material-ui/core';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import { makeStyles } from '@material-ui/core/styles';
import { addToLists } from '../../redux/drawer/drawerReducer';
import { useDispatch } from 'react-redux'


import React from 'react'

const useStyles = makeStyles((theme) => ({
  addIcon: {
    '&:hover': {
      'cursor': 'pointer !important'
    },
  },
}))


export function CustomAdd() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const handleAdd = (_event) => {
    dispatch(addToLists({ label: "new" }))
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