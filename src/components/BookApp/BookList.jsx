import React from 'react'
import BookApp from './BookApp';
import * as httpService from '/home/rohini/Pictures/Reactproject/bookstore/src/service/httpService.js'
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import styles from '../BookApp/BookApp.module.scss';
import Tooltip from '@material-ui/core/Tooltip';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';



class BookList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedOption: [
                {
                    value: '',
                }
            ],
            bookData: [],
            imageData: [],
            sortLowToHigh: [],
            image: '',
            selectValue: ""
        }
        //console.log("this list"+this.props.movies)
        console.log("this list" + this.props.valueData)
        this.handleChange = this.handleChange.bind(this);
        this.goBack = this.goBack.bind(this);
    }

    componentDidMount() {
        httpService.getAxios('bookname/bookList')
            .then((response) => {
                console.log(response.data)
                this.setState({
                    bookData: response.data
                })
                console.log(this.state.bookData + "data")
            }).catch(function (error) {
                console.log(error);
            })
    }



    handleChange = (event) => {
        var newValue=event.target.value
        this.setState({
            selectValue: newValue
        },
        () => {
            console.log(this.state.selectValue+"=============00000")
            if (this.state.selectValue === "low") {
                console.log("trueeeee")
                let sortedProductsAsc;
                sortedProductsAsc = this.state.bookData.sort((a, b) => {
                    console.log(a.bookId + "===========")
                    return parseInt(a.price) - parseInt(b.price);
                })
                this.setState({
                    bookData: sortedProductsAsc
                })
            }else if(this.state.selectValue === "high"){
                let sortedProductsDes;
                sortedProductsDes = this.state.bookData.sort((a, b) => {
                    console.log(a.bookId + "===========")
                    return parseInt(b.price) - parseInt(a.price);
                })
                this.setState({
                    bookData: sortedProductsDes
                })
            }
        })

        console.log(this.state.selectValue + "==========" + event.target.value)
    }

    goBack=()=>{
        window.location.reload(false);
    }
    render() {

        console.log(this.state.selectValue + "==========")
        console.log("this list" + this.props.valueData + "============" + this.props.serachValue)
        let itemList = this.state.bookData
       // let sortData = this.state.sortLowToHigh
       // console.log(sortData+"sooooo")
        let image = this.state.image
        console.log("item" + image)
        return (
            <div className={styles.mainDivCard}>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <div><Typography variant="h6" gutterBottom>Books <span style={{ fontSize: '10px', color: '#ACADAD' }}>(128 items)</span></Typography></div>
                    <div>
                        <FormControl   className={styles.formControl}>    
                        <InputLabel   style={{ fontSize: '12px' }} >Sort by relevance</InputLabel> 
                        <Select
                                value={this.state.selectValue}
                                style={{ fontSize: '12px' }}
                                onChange={this.handleChange}

                            >
                                {/* <MenuItem value="" disabled style={{ fontSize: '12px' }}>Sort by relevance</MenuItem> */}
                                <MenuItem value="low" style={{ fontSize: '12px' }}>Price:Low to High</MenuItem>
                                <MenuItem value="high" style={{ fontSize: '12px' }}>Price:High to Low</MenuItem>
                                <MenuItem value="arrivals" style={{ fontSize: '12px' }}>Newest Arrivals</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>
                {/* <div > */}
                <div styles={{display:'flex',flexDirection:'row',justifyContent:'flex-start'}}>
                {this.props.serachValue
                       ?<div className={styles.buttonBack}><Tooltip title="Go Back" arrow><Button onClick={this.goBack}>Back <b></b></Button></Tooltip></div> 
                       :null
                   } 
                   
                </div>
                {this.props.serachValue
                    ? <div className={styles.cardMainDiv}>
                        {this.props.valueData.map(item => <BookApp key={item.id} value={item} />)}
                    </div>
                    : <div className={styles.cardMainDiv}>
                        {itemList.map(item => <BookApp key={item.id} value={item} />)}
                    </div>
                }
            </div>
            // </div>
        )
    }
}
export default BookList