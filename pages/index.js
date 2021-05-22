import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {Card, CardContent, Grid, Button, Divider, TextField, Modal, Link, Snackbar} from '@material-ui/core';
import DoneAllRoundedIcon from '@material-ui/icons/DoneAllRounded';
import Alert from '@material-ui/lab/Alert';
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
    const [roomValue, setRoomValue] = useState();
    const [alertStatus, setAlertStatus] = useState();

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const inputHandler = (e) => {
        setRoomValue(e.target.value)
    }
    
    function joinRoom(){
        fetch('/api/getRoomStatus/' + roomValue)
            .then(response => {
                if(response.status == '200'){
                    // Go to room
                    router.push('/rooms/'+roomValue)
                }
                else {
                    // Room doesnt exist
                    setAlertStatus(true)
                }
            })
    }
    function createRoom() {
        fetch('/api/createRoom')
            .then(response=>response.json())
            .then(data=>{
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
                    <TextField onChange={inputHandler} placeholder="Room ID"/>
                    <br/>
                    <br/>
                    <Button variant="contained" color="primary" onClick={joinRoom}>
                        Join existing one
                    </Button>
                    <br/>
                    <br/>
                    <Snackbar open={alertStatus}>
                        <Alert severity="error">Room doesn't exist!</Alert>
                    </Snackbar>
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