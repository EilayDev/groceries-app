import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {Card, CardContent, Grid, Button, Divider, TextField, Modal, Link} from '@material-ui/core';
import DoneAllRoundedIcon from '@material-ui/icons/DoneAllRounded';
import { useRouter } from 'next/router'

const useStyles = makeStyles((theme) => ({
    centerModal:{
        'top': '50%',
        'left': '50%',
        'transform': 'translate(-50%, -50%)',
    }
}))

export default function Login(props){
    const classes = useStyles();
    const router = useRouter()
    const [open, setOpen] = useState(false);
    const [ROOMID, setROOMID] = useState();

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    function createRoom() {
        fetch('/api/createRoom')
            .then(response=>response.json())
            .then(data=>{
                //router.push('/rooms/'+data.roomID)
                setROOMID(data.roomID)
                handleOpen()
            })
    }
    return (
        <>
        <Grid container justify="center" alignItems="center" style={{height:'100%'}}>
            <Card style={{marginBottom:'10%'}}>
                {/* TODO: implement join existing room */}
                <CardContent style={{textAlign:"center"}}>
                    Login page!
                    <br/>
                    <br/>
                    <TextField placeholder="Room ID"/>
                    <br/>
                    <br/>
                    <Button variant="contained" color="primary">
                        Join existing one
                    </Button>
                    <br/>
                    <br/>
                    <Divider/>
                    <br/>
                    <Button onClick={createRoom} variant="contained" style={{backgroundColor: "#337e8b", color:'white'}}>
                        Create new room
                    </Button>
                    <br/>
                    <br/>
                    Note: This is a DEMO. 
                    <br/>
                    Database resets every 15 minutes.
                </CardContent>
            </Card>
        </Grid>
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Grid container justify="center" alignItems="center" style={{height:'100%'}}>
                <Card>
                    <CardContent>
                        Your new room has been created <span><DoneAllRoundedIcon fontSize="small" style={{ color: 'rgb(37 141 41)', 'verticalAlign': 'bottom' }}/></span>
                        <br/>
                        Room's URL:
                        <br/>
                        <Link href={'/rooms/' + ROOMID} color="initial">
                            {process.browser &&
                                window.location.href + 'rooms/' + ROOMID
                            }
                            
                        </Link>
                    </CardContent>
                </Card>
            </Grid>
        </Modal>
        </>
    )
}