import React, { useState,useEffect } from 'react';
import * as httpService from '/home/rohini/Pictures/Reactproject/bookstore/src/service/httpService.js'
import BookApp from '../BookApp/BookApp';
import { useHistory } from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Pagination from '@material-ui/lab/Pagination';



const useStyles = makeStyles(theme => ({
   
    buttonBack: {
        display: 'flex',
        justifyContent: 'flex-start',
    },
    searchDiv:{
        paddingLeft:'2em',
        paddingRight:'2em',
        [theme.breakpoints.up('md')]: {
            paddingLeft:'12em',
        paddingRight:'12em',
        },
    },
    bookcountDiv:{
        display:'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cardMainDiv:{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            minHeight: '100vh',
            [theme.breakpoints.only('sm')]: {
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                minHeight: '70vh',
            },
            [theme.breakpoints.only('md')]: {
                minHeight: '70vh',
            },
            [theme.breakpoints.down('xs')]: {
                display: 'flex',
                flexWrap: 'wrap',
                flexDirection:'column',
                justifyContent: 'space-between',
                minHeight: '70vh',
            },
            
    },
    root:{
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    },
    formControl:{
        width: '20em',
        fontSize: '7px',
    },
    pagination:{
        display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '2em',
    marginBottom:'2em'
}

  
}));

export default function SearchBookList(){
const classes = useStyles();
const [selectValue,setSelectValue]=useState('unSorted')
const [name,setName]=useState('')
const [searchData, setSearchData] = useState([]);
const [activepage,setActivePage]=useState(0)
const [totalpage,setTotalPage]=useState(null)
const [itemsCountPerPage,setitemsCountPerPage]=useState(null)
const [totalItemsCount,settotalItemsCount]=useState(null)



const history = useHistory();
const goBack = () => history.push('/book');


    useEffect(() => {
        let name = (new URLSearchParams(window.location.search)).get("name")
        console.log(name+"searchh")
        setName(name)
        getSearchList(name,activepage,selectValue)
    }, [])

  

    const getSearchList=(name,page,selectValue)=>{
       // http://localhost:8081/bookname/searchBook/a/0/8
       console.log(page+"dddddddddddd")
        httpService.getAxios(`bookname/searchBook/${name}/${page}/12/${selectValue}`)
        .then((response) =>{
           /// var item=JSON.parse(JSON.stringify(response.data))
           console.log(response)
         
           setTotalPage(response.data.totalPages)
           setitemsCountPerPage(response.data.size)
           settotalItemsCount(response.data.totalElements)
           setSearchData(response.data.content)
        })
    }   

    const handleChange = (event) => {
        var newValue = event.target.value
       setSelectValue(newValue)
       getSearchList(name,activepage-1,newValue)
    }

   const handlePageChange = (event,value) =>  {
        console.log(value+"paaa")
        setActivePage(value)
        console.log(activepage+"acccccc")
        getSearchList(name,value-1,selectValue)
        }




    return(
        <div className={classes.searchDiv} >
            <div className={classes.bookcountDiv}>
                    <div><Typography variant="h6" gutterBottom>Books <span style={{ fontSize: '10px', color: '#ACADAD' }}>({totalItemsCount} items)</span></Typography></div>
                    <div>
                        <FormControl className={classes.formControl}>
                            <InputLabel style={{ fontSize: '12px' }} >Sort by relevance</InputLabel>
                            <Select
                                value={selectValue}
                                style={{ fontSize: '12px' }}
                                onChange={handleChange}

                            >
                                <MenuItem value="LowToHigh" style={{ fontSize: '12px' }}>Price:Low to High</MenuItem>
                                <MenuItem value="HighToLow" style={{ fontSize: '12px' }}>Price:High to Low</MenuItem>
                                <MenuItem value="arrivals" style={{ fontSize: '12px' }}>Newest Arrivals</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>
        <div className={classes.buttonBack}><Tooltip title="Go Back" arrow><Button onClick={goBack}>Back <b></b></Button></Tooltip></div>
       {searchData == null
        ?<div>No Items Available</div>
        :<div>
        <div className={classes.cardMainDiv}>
        {searchData.map(item => <BookApp key={item.id} value={item} />)}
         </div>
       
         <div className={classes.pagination}>
                    <Pagination
                       // hideNavigation
                        activePage={activepage}
                        itemsCountPerPage={itemsCountPerPage}
                        totalItemsCount={totalItemsCount}
                        count={totalpage}
                        itemClass='page-item'
                        linkClass='btn btn-light'
                        onChange={handlePageChange}
                    />
                </div>
                </div>
       }
    </div>
    )
}