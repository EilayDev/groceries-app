import {IconButton, Tooltip, Divider} from '@material-ui/core';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import { makeStyles } from '@material-ui/core/styles';
import { addToLists } from '../../redux/drawer/drawerReducer';
import {addToGroceries} from '../../redux/groceries/groceriesReducer'
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
    const name = "test"
    dispatch(addToLists({ label: name }))
    dispatch(addToGroceries({
      linkedTab: name,
      items: [
          {
              itemName: '',
              amount: '',
              isChecked: false,
          }
      ]
  }))
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