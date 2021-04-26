import React from 'react';
import { TextField, Checkbox, Paper, Container, FormGroup, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { selectorGetGroceries, toggleCheckGrocery } from '../../redux/groceries/groceriesReducer'
import { selectorGetSelectedTab, selectorGetLists } from '../../redux/drawer/drawerReducer'

function GroceryItem(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const handleChange = (event) => {
        dispatch(toggleCheckGrocery({linkedTab: props.linkedTab, index: props.index}))
    }
    return (
        <div className={classes.product}>
            <FormGroup row={true} className={`${classes.formField}`}>
                <TextField className={classes.inputField} disabled={props.isChecked} label="Item" variant="outlined" defaultValue={props.itemName} /> <div className={classes.multiply}><span> X </span></div>
                <TextField className={classes.amountField} disabled={props.isChecked} label="Amount" variant="outlined" defaultValue={props.amount} />
                <Checkbox
                    checked={props.isChecked}
                    color="primary"
                    onClick={handleChange}
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
        'padding-bottom': '2%'
    },
    inputField: {
        'width': '20ch'
    },
    amountField: {
        'width': '9ch'
    },
    scrollable: {
        'height': '100%',
        'overflow': 'auto'
    },
    formField: {
        'justifyContent': 'center',
        'alignItems': 'center'
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
                 <div key={index} style={{height: '100%'}}>
                    <Typography variant="h4" className={classes.listName}>
                            {item.linkedTab} List
                    </Typography>
                    <Paper className={`${classes.scrollable}`}>
                        {getGroceries[index]['items'].map((list, itemIndex) => (
                            <GroceryItem key={itemIndex} index={itemIndex} linkedTab={item.linkedTab} itemName={list.itemName} amount={list.amount} isChecked={list.isChecked} />
                        ))}
                    </Paper>
                </div>
            ))}
        </Container>

    )
}