import React from 'react'
import BookApp from './BookApp';
import NavBar from '../NavBar/NavBar.jsx';
import * as httpService from '/home/rohini/Pictures/Reactproject/bookstore/src/service/httpService.js'
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import styles from '../BookApp/BookApp.module.scss';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Pagination from '@material-ui/lab/Pagination';
import cartService from '../../service/cartService';


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
            cartStatus: [],
            uniqueArray: [],
            cardData: [],
            sortLowToHigh: [],
            cartCount:0,
            image: '',
            selectValue: "",
            activePage: 1,
            totalPages: null,
            itemsCountPerPage: null,
            totalItemsCount: null,
            loading: false

        }
        //console.log("this list"+this.props.movies)
        console.log("this list" + this.props.valueData)
        this.handleChange = this.handleChange.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.goBack = this.goBack.bind(this);
    }

    componentDidMount() {

       this.getBook(this.state.activePage - 1)
       this.getCart()
    }

    componentDidUpdate() {
       // this.getCart()
      }


    getBook(page) {
        this.setState({
            loading:false
        })
        httpService.getAxios(`bookname/bookList?page=${page}&size=12`)
            .then((response) => {
                console.log(response.data)
                const totalPages = response.data.totalPages;
                const itemsCountPerPage = response.data.size;
                const totalItemsCount = response.data.totalElements;

                this.setState({ totalPages: totalPages })
                this.setState({ totalItemsCount: totalItemsCount })
                this.setState({ itemsCountPerPage: itemsCountPerPage })

                this.setState({
                    bookData: response.data.content,
                    loading: true
                })

                console.log(this.state.bookData + "data")
            }).catch(function (error) {
                console.log(error);
            })

    }



    handleChange = (event) => {
        var newValue = event.target.value
        this.setState({
            selectValue: newValue
        })
        console.log(newValue + "========" + this.state.activePage)
        httpService.getAxios(`bookname/sort/${newValue}?limit=12&offset=${this.state.activePage - 1}`)
            .then((response) => {
                var item = JSON.parse(JSON.stringify(response.data.content))
                this.setState({
                    bookData: item
                })
            })
    }


    handlePageChange(event, value) {
        console.log(value + "paaa");
        this.setState({ activePage: value })
        this.getBook(value - 1)
    }


    getCart=()=> {
       console.log("dattttttttttttttttttttt")
        cartService.getCarts()
            .then((response) => {
                console.log(response)
                console.log(response.data)
                 this.setState({
                     cartCount:response.data.length
                 })
                response.data.map(item => {
                    console.log(item.book.bookId+"dddbook")
                   return this.state.cartStatus.push(item.book.bookId)
                })
                this.setState({
                    cartData: response.data
                })
               
            }).catch(function (error) {
                console.log(error);
            })
    }

    goBack = () => {
        const { history } = this.props;
        if (history) history.push('/book');
    }
    loading = () =>
    {
        console.log(this.state.loading)
    }

    render() {
    
    console.log(this.state.cardData)
        console.log("hiiiiiiiiiiiiiiiiiiiii"+this.state.cartCount)
        let itemList = this.state.bookData
        let count=this.state.cartCount
        console.log("count"+count)
        return (
           
            <div className={styles.mainDivCard}>
                 <NavBar cartCount={count}/>
                  {this.loading()}
                  {this.state.loading ? '' : 'Loading'}
                <div className={styles.bookcountDiv}>
                    <div><Typography variant="h6" gutterBottom>Books <span style={{ fontSize: '10px', color: '#ACADAD' }}>(Showing 1 – {itemList.length} items of {this.state.totalItemsCount})</span></Typography></div>
                    <div>
                        <FormControl className={styles.formControl}>
                            <InputLabel style={{ fontSize: '12px' }} >Sort by relevance</InputLabel>
                            <Select
                                value={this.state.selectValue}
                                style={{ fontSize: '12px' }}
                                onChange={this.handleChange}

                            >

                                <MenuItem value="LowToHigh" style={{ fontSize: '12px' }}>Price:Low to High</MenuItem>
                                <MenuItem value="HighToLow" style={{ fontSize: '12px' }}>Price:High to Low</MenuItem>
                                <MenuItem value="arrivals" style={{ fontSize: '12px' }}>Newest Arrivals</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>

                <div className={styles.cardMainDiv}>
                    {itemList.map(item =>
                        <BookApp key={item.id} value={item} cartStatus={this.state.cartStatus} getCart={this.getCart} />
                    )}
                </div>
                <div className={styles.pagination}>
                    <Pagination
                        // hideNavigation
                        activePage={this.state.activePage}
                        itemsCountPerPage={this.state.itemsCountPerPage}
                        totalItemsCount={this.state.totalItemsCount}
                        count={this.state.totalPages}
                        itemClass='page-item'
                        linkClass='btn btn-light'
                        onChange={this.handlePageChange}
                    />
                </div>
            </div>
            // </div>
        )
    }
}
export default BookList