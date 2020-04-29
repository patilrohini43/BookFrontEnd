import React from 'react'
import BookApp from './BookApp';
import * as httpService from '/home/rohini/Pictures/Reactproject/bookstore/src/service/httpService.js'
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import Typography from '@material-ui/core/Typography';
import styles from '../BookApp/BookApp.module.scss';


class BookList extends React.Component {
    constructor(){
        super()
        this.state={
            age:'',
            bookData:[],
        }
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        httpService.getAxios('bookname/bookList')
        .then((response) =>{
            console.log(response.data)
            this.setState({
                bookData:response.data
            })
            console.log(this.state.bookData+"data")
        }).catch(function (error) {
            console.log(error);
            })
    
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
          });
    }

    render(){
       let itemList= this.state.bookData
       console.log("item"+itemList)
        return (
            <div style={{marginTop:'2%'}}>
                 <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
            <div><Typography variant="h6" gutterBottom>Books <span style={{fontSize:'10px',color:'#ACADAD'}}>(128 items)</span></Typography></div>
            <div>
            <FormControl>
        <NativeSelect
          value={this.state.age}
          style={{fontSize:'12px'}}
          name="age"
          onChange={this.handleChange}
          inputProps={{ 'aria-label': 'age' ,
          }}
        >           
          <option value="" disabled style={{fontSize:'12px'}}>Sort by relevance</option>
          <option value={10} style={{fontSize:'12px'}}>Price:Low to High</option>
          <option value={20} style={{fontSize:'12px'}}>Price:High to Low</option>
          <option value={30} style={{fontSize:'12px'}}>Newest Arrivals</option>
        </NativeSelect>
      </FormControl>
      </div>
            </div>
            <div className={styles.cardMainDiv}>
            {itemList.map(item => <BookApp key={item.id} value={item} />)}
            </div>
            </div>
        )
    }
}
    export default BookList