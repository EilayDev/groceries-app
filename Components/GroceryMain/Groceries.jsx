import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';


const useStyles = makeStyles(() => ({
    center: {
        margin: '0',
        position: "absolute",
        top: "50%",
        left: "50%",
        "-ms-transform": "translate(-50%, -50%)",
        transform: "translate(-50%, -50%)",
    },
    product: {
        
        'margin-bottom': 20,
    },
    checkbox: {
        'margin-top':7
    }
}));



function GroceryItem(props){
    const classes = useStyles();
    const [isChecked, setChecked] = useState(false)
    const handleChange = (event) => {
        setChecked((state) => !state)
    }
    return (
        <>
        <div className={classes.product}>

        <Checkbox
        checked={isChecked}
        color="primary"
        inputProps={{ 'aria-label': 'secondary checkbox' }}
        onClick={handleChange}
        className={classes.checkbox}
        />
        <TextField id={props.id} className={classes.clickable} label="Item" onClick={handleChange} variant="outlined" disabled value={props.name + " x " + props.amount}/><br/>
        </div>
        </>
    )
}

export default function Groceries() {
    const classes = useStyles();
    return(
        <>
        <div className={classes.center}>
        <GroceryItem id="r2" name="Tuna" amount="5" /> 
        <GroceryItem id="r1" name="Eggs" amount="6" />
        </div>
        </>
    )
}