import React from 'react'
import {IconButton, Tooltip, Divider, Typography, Popover, Snackbar, TextField} from '@material-ui/core';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import { makeStyles } from '@material-ui/core/styles';
import { addToLists, selectorGetLists } from '../../redux/drawer/drawerReducer';
import {addToGroceries} from '../../redux/groceries/groceriesReducer'
import { useDispatch, useSelector } from 'react-redux'
import CheckIcon from '@material-ui/icons/Check';
import Alert from '@material-ui/lab/Alert';



const useStyles = makeStyles((theme) => ({
  addIcon: {
    '&:hover': {
      'cursor': 'pointer !important'
    },
  },
  typography: {
  }
}))

export function CustomAdd() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const getLists = useSelector(selectorGetLists)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [nameAlert, setNameAlert] = React.useState(false);

  const handleAdd = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleCloseSnackbar = () => {
    setNameAlert(false)
  }
  const open = Boolean(anchorEl)
  const reference = React.createRef();
  const submitName = (event) => {
    const name = reference.current.value
    // if name empty
    if (name === ''){
      return
    }
    // if name already exists
    if (getLists.filter((item) => item.label.toLowerCase() === name.toLowerCase()).length) {
      setNameAlert(true)
      return
    }
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
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}>
            <Typography component={'span'} className={classes.typography}>
            <TextField inputRef={reference} id="filled-basic" label="Enter new list name" variant="filled" />
            <CheckIcon onClick={submitName} fontSize="large"/>
            </Typography>
            <Snackbar open={nameAlert} autoHideDuration={6000} onClose={handleCloseSnackbar}>
            <Alert severity="error">
              Name already exists!
            </Alert>
            </Snackbar>
          </Popover>
        <Divider />
      </>
    )
}



export default CustomAdd