
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

class BookApp extends React.Component {
    constructor(props){
        super(props)
        this.state={
            age:'',
            bookData:[],
            isVisible:false,
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
          });
    }

    mouseEnter = (event) =>{
        this.setState({
            isVisible:true
        })
    }

    mouseLeave = (event) =>{
        this.setState({
            isVisible:false
        })
    }

    render() {
        //let itemList=this.props
        // console.log("Hiiiii"+itemList)
        console.log(this.props.value.bookName+"props value")
        return ( 
            // <div style={{display:'flex',flexDirection:'row',marginTop:'2%'}}>
            <div className={styles.mainDiv}>
            {this.state.isVisible
            ? <Card className={styles.titleCard} onMouseLeave={this.mouseLeave}>{this.props.value.bookDetail}</Card>
            :<Card className={styles.mainCard} >
                <div className={styles.cardMediaDiv} onMouseEnter={this.mouseEnter} >
                <CardMedia
                        style={{ height: '9em', width: '7em' ,display:'-webkit-inline-box',marginTop:'1em'}}
                        image={require('/home/rohini/Pictures/Reactproject/bookstore/src/images/java.jpeg')}
                        title="Contemplative Reptile"
                    />
                 </div>
                
                    <CardContent className={styles.cardContent}>
                        <Typography variant="subtitle2">
                       { this.props.value.bookName}
                     </Typography>
                     <Typography variant="caption" display="block"  color="textSecondary">
                          {this.props.value.author}
                     </Typography>
                     <Typography variant="caption" display="block" color="black">
                         Rs.{this.props.value.price}
                     </Typography>
                    </CardContent>
                <CardActions>
                <Button variant="outlined" style={{backgroundColor:'brown',width:'7em'}}><span className={styles.button}>Add To Bag</span></Button>
                <Button variant="outlined"  style={{width:'7em'}}><span className={styles.button}>WishList</span></Button>
                </CardActions>
            </Card>
            } 
            </div>  
            // </div>
        )
    }
}
export default BookApp
