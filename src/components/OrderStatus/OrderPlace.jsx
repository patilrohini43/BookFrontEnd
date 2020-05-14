import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom"


const useStyles = makeStyles(theme => ({
    tableDiv: {
        // paddingRight: '3em',
        // paddingLeft: '3em',
        // [theme.breakpoints.up('md')]: {
        //     paddingRight: '16em',
        //     paddingLeft: '16em',
        // },
        display: 'flex',
         justifyContent: 'center',
    },
    buttonDiv: {
        marginTop: '2em',
    },
    orderTitle: {
        display: 'flex',
        width: '15em',
    },
    outerorderTitle: {
        display: 'flex',
        justifyContent: 'space-around',
    },
    addressTitle: {
        width: '20em',
        textAlign: 'start',
        marginLeft:'3em'
    },
    root: {
        marginTop: '3em',
    },
    table:{
        width:'50em'
    }
}));

export default function OrderPlace() {
    const classes = useStyles();
    const history = useHistory();
    const goBack = () => history.push('/book');
    return (
        <div className={classes.root}>
            <Typography variant="h6" gutterBottom> Order Placed SuccessFully</Typography>
            <div className={classes.outerorderTitle}>
                <div className={classes.orderTitle}>
                    <Typography variant="subtitle2" gutterBottom> hurry!!! your order is confirmed the order id is 2 save the id for further communication</Typography>
                </div>
            </div>
            <div className={classes.tableDiv}>
                <table style={{ border: ' 1px solid black', borderCollapse: 'collapse' }} className={classes.table}>
                    <tr >
                        <th style={{ height: '50px', backgroundColor: '#f5f5f5' }}>Email us</th>
                        <th style={{ height: '50px', backgroundColor: '#f5f5f5' }}>Contact us</th>
                        <th style={{ height: '50px', backgroundColor: '#f5f5f5' }}>Address</th>
                    </tr>

                    <tr>
                        <td style={{ border: ' 1px solid black', height: '5em' }}>admin@bookstore.com</td>
                        <td style={{ border: ' 1px solid black' }}>8574964152</td>
                        <td style={{ border: ' 1px solid black' }}><p className={classes.addressTitle}>Malhotra Chambers, First Floor, Govandi East, Mumbai, Maharashtra 400088</p></td>
                    </tr>
                </table>
            </div>
            <div className={classes.buttonDiv}>
                <Button size="small" variant="contained" color="primary" style={{ width: '20%' }}  onClick={goBack}>Continue</Button>
            </div>
        </div>
    )
}