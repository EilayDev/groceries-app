import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {Card, CardContent, Grid, Button, Divider} from '@material-ui/core';

export default function Login(){
    return (
        <Grid container justify="center" alignItems="center" style={{height:'100%'}}>
            <Card style={{marginBottom:'10%'}}>
                <CardContent style={{textAlign:"center"}}>
                    Login page!
                    <br/>
                    <br/>
                    <Button variant="contained" color="secondary">
                        Join existing one
                    </Button>
                    <br/>
                    <br/>
                    <Divider />
                    <br/>
                    <Button variant="contained" color="primary">
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