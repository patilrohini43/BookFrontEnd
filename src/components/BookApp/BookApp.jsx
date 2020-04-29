
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import styles from '../BookApp/BookApp.module.scss';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import { fontSize } from '@material-ui/system';

class BookApp extends React.Component {
    constructor(props){
        super(props)
        this.state={
            age:'',
            isVisible:false,
        }
        this.handleChange = this.handleChange.bind(this);
        //this.mouseEnter = this.mouseEnter.bind(this);
        //this.mouseLeave = this.mouseLeave.bind(this);
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
          });
    }

    mouseEnter = (event) =>{
        console.log("enter")
        this.setState({
            isVisible:true
        })
    }

    mouseLeave = (event) =>{
        console.log("leave")
        this.setState({
            isVisible:false
        })
    }

    render() {
        return (
            <div style={{display:'flex',flexDirection:'column',marginTop:'2%'}}>
                
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


            <div className={styles.mainDiv}>
            {this.state.isVisible
            ? <Card className={styles.titleCard} onMouseLeave={this.mouseLeave}>I am shown when someone hovers over the div above.</Card>
            :<Card className={styles.mainCard}>
                <div className={styles.cardMediaDiv} onMouseEnter={this.mouseEnter} >
                <CardMedia
                        style={{ height: '9em', width: '7em' ,display:'-webkit-inline-box',marginTop:'1em'}}
                        image={require('/home/rohini/Pictures/Reactproject/bookstore/src/images/java.jpeg')}
                        title="Contemplative Reptile"
                    />
                 </div>
                
                    <CardContent className={styles.cardContent}>
                        <Typography variant="subtitle2">
                           Java
                     </Typography>
                     <Typography variant="caption" display="block"  color="textSecondary">
                          by Jemmis
                     </Typography>
                     <Typography variant="caption" display="block" color="black">
                         Rs.1500
                     </Typography>
                    </CardContent>
                <CardActions>
                <Button variant="outlined" style={{backgroundColor:'brown',width:'7em'}}><span className={styles.button}>Add To Bag</span></Button>
                <Button variant="outlined"  style={{width:'7em'}}><span className={styles.button}>WishList</span></Button>
                </CardActions>
            </Card>
            }
           
            </div>
            </div>

        )
    }

}
export default BookApp



// {this.state.isVisible
//     ? <Card className={styles.titleCard}>I am shown when someone hovers over the div above.</Card>
//     : <CardMedia
//    style={{ height: '9em', width: '7em' ,display:'-webkit-inline-box',marginTop:'1em'}}
//    image={require('/home/rohini/Pictures/Reactproject/bookstore/src/images/java.jpeg')}
//    title="Contemplative Reptile"
// />