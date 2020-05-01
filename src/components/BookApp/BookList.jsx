import React from 'react'
import BookApp from './BookApp';
import * as httpService from '/home/rohini/Pictures/Reactproject/bookstore/src/service/httpService.js'
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import Typography from '@material-ui/core/Typography';
import styles from '../BookApp/BookApp.module.scss';


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


        // if (this.state.selectValue === 'low') {
        //     console.log("trueeeee")
        //     let sortedProductsAsc;
        //     sortedProductsAsc = this.state.bookData.sort((a, b) => {
        //         console.log(a.bookId + "===========")
        //         return parseInt(a.price) - parseInt(b.price);
        //     })
        //     this.setState({
        //         sortLowToHigh: sortedProductsAsc
        //     })
        // }

        // this.getData()

    }

    // getData(){
    //     console.log("update"+this.state.selectValue)
    //     if (this.state.selectValue === "low") {
    //         console.log("trueeeee")
    //         let sortedProductsAsc;
    //         sortedProductsAsc = this.state.bookData.sort((a, b) => {
    //             console.log(a.bookId + "===========")
    //             return parseInt(a.price) - parseInt(b.price);
    //         })
    //         this.setState({
    //             sortLowToHigh: sortedProductsAsc
    //         })
    //     }
    // }

    render() {

        console.log(this.state.selectValue + "==========")
        console.log("this list" + this.props.valueData + "============" + this.props.serachValue)
        let itemList = this.state.bookData
       // let sortData = this.state.sortLowToHigh
       // console.log(sortData+"sooooo")
        let image = this.state.image
        console.log("item" + image)
        return (
            <div style={{ marginTop: '2%', paddingLeft: '9%', paddingRight: '9%' }}>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <div><Typography variant="h6" gutterBottom>Books <span style={{ fontSize: '10px', color: '#ACADAD' }}>(128 items)</span></Typography></div>
                    <div>
                        <FormControl>
                            <NativeSelect
                                value={this.state.selectValue}
                                style={{ fontSize: '12px' }}
                                onChange={this.handleChange}
                                inputProps={{
                                    'aria-label': 'age',
                                }}
                            >
                                <option value="" disabled style={{ fontSize: '12px' }}>Sort by relevance</option>
                                <option value="low" style={{ fontSize: '12px' }}>Price:Low to High</option>
                                <option value="high" style={{ fontSize: '12px' }}>Price:High to Low</option>
                                <option value="arrivals" style={{ fontSize: '12px' }}>Newest Arrivals</option>
                            </NativeSelect>
                        </FormControl>
                    </div>
                </div>
                {/* <div > */}
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