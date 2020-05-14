import React from 'react'
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import styles from '../SearchBooks/SearchBooks.module.scss';



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
       //  window.location.href = `/searchBook/:`+this.state.searchValue
      }
    

       getSearchList() {
        console.log(this.state.searchValue)
        //const history=useHistory()
      // this.props.history.push(`/searchBook/?name=`+this.state.searchValue)
      
        window.location.href = `/searchBook/?name=`+this.state.searchValue
      // browserHistory.push( `/searchBook/?name=`+this.state.searchValue)
    }   

    render(){
        return(
           
           
            <div className={styles.search}>
                <div onClick={this.getSearchList} style={{marginLeft:'2%'}}><SearchIcon className={styles.SearchIcon} /></div>
                <InputBase
                 placeholder="Search…"
                 type="text"
                 value={this.state.searchValue}
                 onChange={ this.handleChange }
                 className={{
                 root: styles.inputRoot,
                 input: styles.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                />
             </div>
        
        )
    }
}

export default SearchBook