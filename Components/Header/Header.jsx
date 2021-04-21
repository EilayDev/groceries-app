import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import { makeStyles } from '@material-ui/core/styles';



export default function Header(props) {
    const useStyles = makeStyles((theme) => ({
        white: ({
            color: 'white'
        }),
        zindex: {
            'z-index': theme.zIndex.drawer + 1,
            'position': 'relative'
        }
    }))
    const handleDrawer = () => {
        props.setDrawerState(true)
    }
    const classes = useStyles();
    return(
        <AppBar position="static" className={`${classes.appBar} ${classes.zindex}`}>
            <Toolbar>
            <IconButton onClick={handleDrawer} edge="start" className={classes.white} aria-label="menu">
                <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.white}>
                Grocering
            </Typography>
            </Toolbar>
        </AppBar>
    )
    
}