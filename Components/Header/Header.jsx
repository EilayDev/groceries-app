import { AppBar, Toolbar, Typography, IconButton, useMediaQuery } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { useDispatch } from 'react-redux'
import {openDrawer} from '../../redux/drawer/drawerReducer'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    white: ({
        color: 'white',
    }),
    smdisplay: {
        [theme.breakpoints.up('sm')]: {
            'display': 'none' 
        }
    },
    zindex: {
        'z-index': theme.zIndex.drawer + 1,
        'position': 'relative'
    }
}))

export default function Header() {
    const dispatch = useDispatch();
    const handleDrawer = () => {
        dispatch(openDrawer());
    }
    const classes = useStyles();
    return(
        <AppBar position="static" className={`${classes.appBar} ${classes.zindex}`}>
            <Toolbar>
            <IconButton onClick={handleDrawer} edge="start" className={`${classes.white} ${classes.smdisplay}`} aria-label="menu">
                <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.white}>
                Grocering
            </Typography>
            </Toolbar>
        </AppBar>
    )
    
}