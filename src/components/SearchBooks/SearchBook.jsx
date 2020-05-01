import React from 'react'
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import * as httpService from '/home/rohini/Pictures/Reactproject/bookstore/src/service/httpService.js'
import styles from '../SearchBooks/SearchBooks.module.scss';
import BookApp from '../BookApp/BookApp';
import BookList from  '../BookApp/BookList.jsx';

// const useStyles = makeStyles(theme => ({
//     root: {
//         position: 'fixed',
//         bottom: theme.spacing(2),
//         right: theme.spacing(2),
//     },
//     title: {
//         display: 'none',
//         [theme.breakpoints.up('sm')]: {
//             display: 'block',
//         },
//     },

//     searchDiv: {
//         display: 'flex',
//         justifyContent: 'space-around',
//         width: '100em',
//     },
//     leftDiv: {
//         display: 'flex',
//     },
//     bookDiv:{
//         display:'none',
//         flexDirection:'row',
//         [theme.breakpoints.up('sm')]: {
//             display:'flex',
//         },
//     },
//     navDiv: {
//         display: 'flex',
//         justifyContent: 'space-around',
//     },
//     search: {
//         position: 'relative',
//         display:'flex',
//         borderRadius: theme.shape.borderRadius,
//         backgroundColor: 'whitesmoke',
//         flexDirection:'row',
//         // '&:hover': {
//         //   backgroundColor: fade(theme.palette.common.white, 0.50),
//         // },
//         marginRight: theme.spacing(2),
//         marginLeft: 0,
//         [theme.breakpoints.up('sm')]: {
//             marginLeft: theme.spacing(3),
//             width:'30em',
//         },
//     },

//     bookImage: {
//         width: '21%',
//     },
//     searchIcon: {
//         padding: theme.spacing(0, 0),
//         height: '100%',
//         position: 'absolute',
//        // pointerEvents: 'none',
//         display: 'flex',
//         alignItems: 'center',
//         color: '#707070',
//         justifyContent: 'center',
//     },
//     inputRoot: {
//         color: 'inherit',
//     },
//     inputInput: {
//         padding: theme.spacing(1, 1, 1, 0),
//        // marginLeft:'-10em',
//         // vertical padding + font size from searchIcon
//         paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
//         color: '#707070',
//         transition: theme.transitions.create('width'),
//         [theme.breakpoints.up('md')]: {
//             width: '20ch',
//            // marginLeft:'-3em'
//         },
//     },

// }));

class SearchBook extends React.Component
{
    constructor(props){
        super(props);
        this.state={
            searchData:[],
            searchValue:'',
        }
        this.handleChange = this.handleChange.bind(this)
        this.getSearchList = this.getSearchList.bind(this)
    }


    handleChange(event) {
        event.preventDefault()
        var name=event.target.value
        console.log(name)
        this.setState({
            searchValue:name
          });
         console.log(this.state.searchValue)
      }
    

      getSearchList() {
        console.log(this.state.searchValue)
        this.props.search(this.state.searchValue)
        // httpService.getAxios(`bookname/searchBook/${this.state.searchValue}`)
        // .then((response) =>{
        //     console.log("Image"+response)
        //     var item=JSON.parse(JSON.stringify(response.data))
        //     console.log(item)
        //     this.setState({
        //         searchData:item
        //     })
        //     localStorage.setItem("searchData", JSON.stringify(this.state.searchData));
        //     console.log(this.state.searchData)
        // })
    }   

    render(){
        return(
           
            <div>
            <div className={styles.search}>
                <button value="hello!" onClick={this.getSearchList}><SearchIcon /></button>
                <InputBase
                 placeholder="Search…"
                 type="text"
                // name="searchValue"
                 value={this.state.searchValue}
                 onChange={ this.handleChange }
                 className={{
                 root: styles.inputRoot,
                 input: styles.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                />
             </div>
             {/* {
                 this.state.searchData.map(item=> <BookApp key={item.bookId} value={item} />)
             } */}
             </div>
           
        )
    }
}

export default SearchBook