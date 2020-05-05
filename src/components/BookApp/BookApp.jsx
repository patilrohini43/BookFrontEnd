
import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import styles from '../BookApp/BookApp.module.scss';
import * as httpService from '/home/rohini/Pictures/Reactproject/bookstore/src/service/httpService.js'
import Snackbar from '@material-ui/core/Snackbar';

class BookApp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            age: '',
            bookData: [],
            message: '',
            open: false,
            isVisible: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClose = this.handleChange.bind(this)

    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleClose = (event) => {
        console.log("bjhuh")
        this.setState({
            open: false,
        })
    }

    mouseEnter = (event) => {
        this.setState({
            isVisible: true
        })
    }

    mouseLeave = (event) => {
        this.setState({
            isVisible: false
        })
    }

    addToCart = (value) => {
        console.log("book Id" + value)
        httpService.postAxios('cart/addtoCart/' + value+"?cartId=73")
            .then((response) => {
                console.log(response.data)
                console.log(response.data.statusMessage + "messss")
                this.setState({
                    bookData: response.data,
                    open: true,
                    message: response.data.statusMessage,
                })
                console.log(this.state.bookData + "data" + this.state.message)
            }).catch(function (error) {
                console.log(error);
            })
    }



    render() {
        var url = `http://localhost:8081/bookname/bookListImages/${this.props.value.bookId}`
        return (
            // <div style={{display:'flex',flexDirection:'row',marginTop:'2%'}}>
            <div className={styles.mainDiv}>
                {this.state.isVisible
                    ? <Card className={styles.titleCard} onMouseLeave={this.mouseLeave}>{this.props.value.bookDetail}</Card>
                    : <Card className={styles.mainCard} >
                        <div className={styles.cardMediaDiv} onMouseEnter={this.mouseEnter} >
                            {/* <CardMedia
                        style={{ height: '9em', width: '7em' ,display:'-webkit-inline-box',marginTop:'1em'}}
                        image={require(`${this.props.image}`)}
                        title="Contemplative Reptile"
                    /> */}

                            <img style={{ height: '9em', width: '7em', display: '-webkit-inline-box', marginTop: '1em' }} src={url} alt="item" />
                        </div>

                        <CardContent className={styles.cardContent}>
                            <Typography variant="subtitle2">
                                {this.props.value.bookName}
                            </Typography>
                            <Typography variant="caption" display="block" color="textSecondary">
                                {this.props.value.author}
                            </Typography>
                            <Typography variant="caption" display="block" color="black">
                                Rs.{this.props.value.price}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button variant="outlined" style={{ backgroundColor: 'brown', width: '7em' }} onClick={this.addToCart.bind(this, this.props.value.bookId)}><span className={styles.button}>Add To Bag</span></Button>
                            <Button variant="outlined" style={{ width: '7em' }}><span className={styles.button}>WishList</span></Button>
                        </CardActions>
                    </Card>
                }
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    open={this.state.open}
                    autoHideDuration={6000}
                    message={this.state.message}
                    onClose={() => this.setState({open: false})}
                />
            </div>

        )
    }
}
export default BookApp
