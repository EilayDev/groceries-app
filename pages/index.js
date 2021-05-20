import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {Card, CardContent, Grid, Button, Divider, TextField} from '@material-ui/core';
import { useRouter } from 'next/router'

export default function Login(props){
    const router = useRouter()

    async function createRoom() {
        await fetch('/api/createRoom')
            .then(response=>response.json())
            .then(data=>{
                router.push('/rooms/'+data.roomID)
            })
    }
    return (
        <Grid container justify="center" alignItems="center" style={{height:'100%'}}>
            <Card style={{marginBottom:'10%'}}>
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
    )
}