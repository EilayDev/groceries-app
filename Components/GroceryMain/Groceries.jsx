import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Container } from '@material-ui/core';
import TabScrollButton from '@material-ui/core/TabScrollButton';

function GroceryItem(props) {
    const classes = useStyles();
    const [isChecked, setChecked] = useState(false)
    const handleChange = (event) => {
        setChecked((state) => !state)
    }
    return (
        <div className={classes.product}>
            
            <form>
            <Checkbox
                checked={isChecked}
                color="primary"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
                onClick={handleChange}
                className={classes.checkbox}
            />
                <TextField id={props.id} className={classes.inputField} label="Item" variant="outlined" defaultValue={props.name} /> x 
                <TextField id={props.id} className={classes.amountField} label="Amount" variant="outlined" defaultValue={props.amount} />
            </form>
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    fullHeight: {
        'height':'100%'
    },
    product: {

        'margin-bottom': 20,
    },
    checkbox: {
        'margin-top': 7
    },
    container: {
        'margin-top': '2vh',
        'margin-bottom': '2vh',
    },
    inputField: {
        'width': '20ch'
    },
    amountField: {
        'width': '9ch'
    }
    ,
    scrollable: {
        'max-height':'100%',
        'overflow':'auto'
    }
}));

export default function Groceries() {
    const classes = useStyles();
    
    return (
        <Grid
            container
            className={classes.fullHeight}
            >
            <Grid item sm={6} className={classes.scrollable}>
                <Container className={`${classes.fullHeight} ${classes.container}`}>
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

                </Container>
                
            </Grid>
            <Grid item sm={6}>
                <Container className={`${classes.fullHeight} ${classes.container}`}>   
                    <Paper className={classes.fullHeight}>             
                        <Typography variant="h4"> Basket </Typography>
                    </Paper>
                </Container>
            </Grid>
        </Grid>
    )
}