import React from 'react'
import BookApp from './BookApp';
import * as httpService from '/home/rohini/Pictures/Reactproject/bookstore/src/service/httpService.js'
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import styles from '../BookApp/BookApp.module.scss';
import Tooltip from '@material-ui/core/Tooltip';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Pagination from '@material-ui/lab/Pagination';
import { withRouter } from 'react-router-dom';


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
            selectValue: "",
            activePage: 1,
            totalPages: null,
            itemsCountPerPage: null,
            totalItemsCount: null

        }
        //console.log("this list"+this.props.movies)
        console.log("this list" + this.props.valueData)
        this.handleChange = this.handleChange.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.goBack = this.goBack.bind(this);
    }

    componentDidMount() {
        var token = `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjF9.SkJVXXp-unSNovqHE14ml3Kw7fcoLxLIdu4DZ5DLotQ`
        localStorage.setItem('token', token);
         this.getBook(this.state.activePage)
    }

     getBook(page){
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
                bookData: response.data.content
            })
            console.log(this.state.bookData + "data")
        }).catch(function (error) {
            console.log(error);
        })

    }



    handleChange = (event) => {
        var newValue = event.target.value
        this.setState({
            selectValue:newValue
        })
        console.log(newValue+"========"+this.state.activePage)
        httpService.getAxios(`bookname/sort/${newValue}?limit=12&offset=${this.state.activePage-1}`)
        .then((response) =>{
            var item=JSON.parse(JSON.stringify(response.data.content))
            this.setState({
                                bookData: item
                            })
        })
    }


  handlePageChange(event,value) {
    console.log(value+"paaa");
    this.setState({activePage: value})
    this.getBook(value-1)
    }

    goBack = () => {
      const { history } = this.props;
      if(history) history.push('/book');
    }
    
    render() {
        const { history } = this.props;     
        let itemList = this.state.bookData
        return (
            <div className={styles.mainDivCard}>
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
                        {itemList.map(item => <BookApp key={item.id} value={item} />)}
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