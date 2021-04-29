
import React, { useEffect, useState } from 'react';
import { TextField, Checkbox, Paper, Container, FormGroup, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { selectorGetGroceries, updateGrocery } from '../../redux/groceries/groceriesReducer'
import { selectorGetSelectedTab, selectorGetLists } from '../../redux/drawer/drawerReducer'

function GroceryItem(props) {
    const classes = useStyles();
    const [checked, setChecked] = useState(props.isChecked)
    const dispatch = useDispatch();
    const itemRef = React.createRef();
    const amountRef = React.createRef();
    const checkboxRef = React.createRef();

    const dispatchUpdate = () => {
        dispatch(updateGrocery({
            linkedTab: props.linkedTab, index: props.index,
            itemName: itemRef.current.value, amount: amountRef.current.value,
            checkStatus: checked
        }))
    }
    useEffect(() => {
        itemRef.current.onchange = dispatchUpdate;
        amountRef.current.onchange = dispatchUpdate;
        checkboxRef.current.onchange = dispatchUpdate;
    })
    const toggleCheckbox = (_) => {
        setChecked(!checked)
    }
    return (
        <div className={classes.product}>
            <FormGroup row={true} className={`${classes.formField}`}>
                <TextField inputRef={itemRef} className={classes.inputField} disabled={props.isChecked} label="Item" variant="outlined" defaultValue={props.itemName} />
                <div className={classes.multiply}><span> X </span></div>
                <TextField inputRef={amountRef} className={classes.amountField} disabled={props.isChecked} label="Amount" variant="outlined" defaultValue={props.amount} />
                <Checkbox
                    checked={checked}
                    color="primary"
                    inputRef={checkboxRef}
                    onClick={toggleCheckbox}
                />
            </FormGroup>
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    fullHeight: {
        'height': '100%'
    },
    product: {
        'margin-top': 25,
        'margin-bottom': 25,
    },
    multiply: {
        'margin-left': 8,
        'margin-right': 8,
    },
    container: {
        'padding-top': '1%',
        'padding-bottom': '2%',
        'display': 'flex',
        'flex-direction': 'column',
    },
    inputField: {
        'width': '20ch'
    },
    amountField: {
        'max-width': '11ch'
    },
    scrollable: {
        'height': '100%',
        'overflow': 'auto'
    },
    formField: {
        'justifyContent': 'center',
        'alignItems': 'center'
    },
    paper: {
        marginLeft: "2%",
        marginRight: "2%"
    },
    listName: {
        'text-align': 'center',
        'margin-bottom': "1%",
        color: '#0E1111'
    }
}));

export default function Groceries() {
    const classes = useStyles();
    const getGroceries = useSelector(selectorGetGroceries);
    const getSelectedTab = useSelector(selectorGetSelectedTab);
    const getLists = useSelector(selectorGetLists);

    return (
        <Container className={`${classes.container} ${classes.fullHeight} `}>
            {getGroceries.map((item, index) => (
                getLists[getSelectedTab].label === item.linkedTab &&
                <React.Fragment key={index}>
                    <Typography variant="h4" className={classes.listName}>
                        {item.linkedTab} List
                    </Typography>
                    <Paper className={`${classes.scrollable} ${classes.paper}`}>
                        {getGroceries[index]['items'].map((list, itemIndex) => (
                            <GroceryItem key={itemIndex} index={itemIndex} linkedTab={item.linkedTab}
                                itemName={list.itemName} amount={list.amount} isChecked={list.isChecked} />
                        ))}
                    </Paper>
                </React.Fragment>
            ))}
        </Container>

    )
}