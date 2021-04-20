import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import { makeStyles } from '@material-ui/core/styles';



export default function Header() {
    const useStyles = makeStyles((theme) => ({
        white: ({
            color: 'white'
        })
    }))
    
    const classes = useStyles();
    return(
        <AppBar position="static" className={classes.appBar}>
            <Toolbar>
            <IconButton edge="start" className={classes.white} aria-label="menu">
                <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.white}>
                Grocering
            </Typography>
            </Toolbar>
        </AppBar>
    )
    
}