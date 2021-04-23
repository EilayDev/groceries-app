import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Container } from '@material-ui/core';
import FormGroup from '@material-ui/core/FormGroup';

function GroceryItem(props) {
    const classes = useStyles();
    const [isChecked, setChecked] = useState(false)
    const handleChange = (event) => {
        setChecked((state) => !state)
    }
    return (
        <div className={classes.product}>
            <FormGroup row={true} className={`${classes.formField}`}>
                <TextField className={classes.inputField} disabled={isChecked} label="Item" variant="outlined" defaultValue={props.name} /> <div className={classes.multiply}><span> X </span></div>
                <TextField className={classes.amountField} disabled={isChecked} label="Amount" variant="outlined" defaultValue={props.amount} />
                <Checkbox
                    checked={isChecked}
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
        'margin-left':8,
        'margin-right': 8,
    },
    container: {
        'padding-top': '2%',
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
    }
}));

export default function Groceries() {
    const classes = useStyles();

    return (
        <Container className={`${classes.container} ${classes.fullHeight} `}>
            <Paper className={`${classes.scrollable}`}>
                <GroceryItem id="r2" name="Tuna" amount="5" />
                <GroceryItem id="r1" name="Eggs" amount="6" />
                <GroceryItem id="r2" name="Tuna" amount="5" />
                <GroceryItem id="r1" name="Eggs" amount="6" />
                <GroceryItem id="r2" name="Tuna" amount="5" />
                <GroceryItem id="r1" name="Eggs" amount="6" />
                <GroceryItem id="r2" name="Tuna" amount="5" />
                <GroceryItem id="r1" name="Eggs" amount="6" />
                <GroceryItem id="r2" name="Tuna" amount="5" />
                <GroceryItem id="r1" name="Eggs" amount="6" />
                <GroceryItem id="r2" name="Tuna" amount="5" />
                <GroceryItem id="r1" name="Eggs" amount="6" />
                <GroceryItem id="r2" name="Tuna" amount="5" />
                <GroceryItem id="r1" name="Eggs" amount="6" />
                <GroceryItem id="r2" name="Tuna" amount="5" />
                <GroceryItem id="r1" name="Eggs" amount="6" />
                <GroceryItem id="r2" name="Tuna" amount="5" />
        </Paper>
        </Container>

    )
}