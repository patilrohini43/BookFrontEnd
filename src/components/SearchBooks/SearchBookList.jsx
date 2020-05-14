import React, { useState,useEffect } from 'react';
import * as httpService from '/home/rohini/Pictures/Reactproject/bookstore/src/service/httpService.js'
import BookApp from '../BookApp/BookApp';
import { useHistory } from "react-router-dom"
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles(theme => ({
   
    buttonBack: {
        display: 'flex',
        justifyContent: 'flex-start',
    },
    searchDiv:{
        marginTop:'2%',
        paddingLeft:'12em',
        paddingRight:'12em'
    },
    cardMainDiv:{
            display: 'flex',
            flexDirection: 'row',
            marginTop: '2%',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
    },
    root:{
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    }
  
}));

export default function SearchBookList(){
const classes = useStyles();
const [searchData, setSearchData] = useState([]);
const history = useHistory();
const goBack = () => history.push('/book');

    useEffect(() => {
        let name = (new URLSearchParams(window.location.search)).get("name")
        console.log(name+"searchh")
       getSearchList(name)
    }, [])

  

    const getSearchList=(name)=>{
        httpService.getAxios(`bookname/searchBook/${name}`)
        .then((response) =>{
            var item=JSON.parse(JSON.stringify(response.data))
            setSearchData(item)
        })
    }   


    return(
        <div className={classes.searchDiv} >
        <div className={classes.buttonBack}><Tooltip title="Go Back" arrow><Button onClick={goBack}>Back <b></b></Button></Tooltip></div>
        <div className={classes.cardMainDiv}>
        {searchData.map(item => <BookApp key={item.id} value={item} />)}
         </div>   
    </div>
    )
}