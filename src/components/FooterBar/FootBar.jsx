import React, { useState } from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    navBar:{
       // width:'100%',
        height: '5vh',
        backgroundColor:'#282c34',
      //  marginTop:'88vh',
    },
    footTag:{
        fontSize:'12px',
        color:'white',
        marginTop:'3%'
    },
    footerDiv:{
        display:'flex',
        justifyContent:'center'
    }
}));
export default function Footbar(){
    const classes = useStyles();
    return(
        <BottomNavigation  className={classes.navBar}>
        <div className={classes.footerDiv}>
        <Typography variant="caption" display="block" className={classes.footTag}>CopyRight @Bridgelabz</Typography>
        </div>
    </BottomNavigation>
    )
}