import styles from '../styles/Main.module.css'
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Add';
import Groceries from '../Components/GroceryMain/Groceries'
import ShoppingLists from "../Components/ShoppingLists";
import Tooltip from '@material-ui/core/Tooltip';


const useStyles = makeStyles((theme) => ({
  main: {
    display: 'flex',
    'align-items': 'stretch',
    height: '85vh',
    width: '100%'
  },
  fab: {
    position: 'absolute',
    [theme.breakpoints.down('md')]: {
      bottom: theme.spacing(5),
      right: theme.spacing(5),
    },
    [theme.breakpoints.up('md')]: {
      bottom: theme.spacing(10),
      right: theme.spacing(10),
    }
  },
  groceriesDiv: {
    flex: 1,
  }
}))

export default function Main() {
  const classes = useStyles();

  return (
    <main className={classes.main}>
      <div>
        <ShoppingLists />
      </div>
      <div className={classes.groceriesDiv}>
        <Groceries />
      </div>
      <Tooltip title="Add a product">
        <Fab color="primary" aria-label="edit" className={classes.fab}>
          <EditIcon />
        </Fab>
      </Tooltip>
    </main>
  )
}
