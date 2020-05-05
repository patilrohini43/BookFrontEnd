import React, { useState } from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    navBar:{
        width:'100%',
        height: '5vh',
        backgroundColor:'#282c34',
        marginTop:'45vh',
    },
}));
export default function Footbar(){
    const classes = useStyles();
    return(
        <BottomNavigation  className={classes.navBar}>
        <div styles={{display:'flex',justifyContent:'center'}}>
        <Typography variant="caption" display="block" color="white">CopyRight @Bridgelabz</Typography>
        </div>
    </BottomNavigation>
    )
}