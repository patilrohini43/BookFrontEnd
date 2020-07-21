
import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import styles from '../BookApp/BookApp.module.scss';
import Snackbar from '@material-ui/core/Snackbar';
import { Paper } from '@material-ui/core';
import Popover from '@material-ui/core/Popover';
import cartService from '../../service/cartService.js';


class BookApp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            age: '',
            bookData: [],
            cartStatus: [],
            uniqueArray: [],
            cardData: [],
            data: false,
            message: '',
            anchor: '',
            open: false,
            isVisible: false,
            loading: true ,
        }
    
        this.handlePopoverOpen = this.handlePopoverOpen.bind(this);
        this.handlePopoverClose = this.handlePopoverClose.bind(this);


    }



    handlePopoverOpen = (event) => {
        this.setState({
            anchor: event.currentTarget
        })
    };


    handlePopoverClose = () => {
        this.setState({
            anchor: null
        })
    };


    addToCart = (value) => {
        console.log("book Id" + value)
        cartService.addToCart(value)
            .then((response) => {
                console.log(response.data)
                console.log(response.data.statusMessage + "messss")
                this.setState({
                    bookData: response.data,
                    open: true,
                    message: response.data.statusMessage,
                })
                this.props.getCart()
                console.log(this.state.bookData + "data" + this.state.message)
            }).catch(function (error) {
                console.log(error);
            })
    }



    render() {
       // console.log(this.props.cartStatus+"status===========")
        const open = Boolean(this.state.anchor);
        // var url=`https://books.google.com/books/content?id=Wj81DwAAQBAJ&printsec=frontcover&img=1&zoom=5%27`
        var url = `http://localhost:8081/bookname/bookListImages/${this.props.value.bookId}`
        return (
            <div>
                <div className={styles.mainDiv}>
                    <Popover
                        id="mouse-over-popover"
                        className={styles.popover}
                        classes={{
                            paper: styles.paper,
                        }}
                        open={open}
                        anchorEl={this.state.anchor}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        onClose={this.handlePopoverClose}
                        disableRestoreFocus
                    >
                        <div style={{ padding: '2%' }}>
                            <Typography variant="subtitle2" display="block" gutterBottom>Book Details</Typography>
                            <Typography variant="caption" display="block" gutterBottom>{this.props.value.bookDetail}</Typography>
                        </div>
                    </Popover>

                    <Card className={styles.mainCard} >

                        {this.props.value.quantity !== 0
                            ? null
                            : <div className={styles.outOfStockDiv}>
                                <Paper elevation={3} className={styles.paperClass}>
                                    <Typography variant="overline" display="block" gutterBottom>Out Of Stock</Typography>
                                </Paper>


                            </div>
                        }
                        <div className={styles.cardMediaDiv}
                            aria-owns={open ? 'mouse-over-popover' : undefined}
                            aria-haspopup="true"
                            onMouseEnter={this.handlePopoverOpen}
                            onMouseLeave={this.handlePopoverClose}
                        >

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
                            {this.props.value.quantity === 0
                                //? <Button variant="outlined" style={{ backgroundColor: 'brown', width: '7em' }} onClick={this.addToCart.bind(this, this.props.value.bookId)}><span className={styles.button}>Add To Bag</span></Button>
                                ? <Button variant="outlined" style={{ backgroundColor: 'brown', width: '7em', opacity: '0.8' }} onClick={this.addToCart.bind(this, this.props.value.bookId)} disabled ><span className={styles.button}>Add To Bag</span></Button>
                                : null
                            }

                            {
                                this.props.value.quantity !== 0 && !this.props.cartStatus.includes(this.props.value.bookId)
                                    ? <Button variant="outlined" style={{ backgroundColor: 'brown', width: '7em' }} onClick={this.addToCart.bind(this, this.props.value.bookId)}><span className={styles.button}>Add To Bag</span></Button>
                                    : null
                            }
                            {/* { uniqueArray.map(id =>
                                        this.props.value.bookId == id

                                            ? <Button variant="outlined" style={{ backgroundColor: '#dc004e', width: '7em' }} onClick={event =>  window.location.href='/viewCart'} ><span className={styles.button}>Go To Cart</span></Button>
                                            :null
                                    )
                                   
                                   }
                             */}

             
                               { this.props.cartStatus.includes(this.props.value.bookId)

                                    ? <Button variant="outlined" style={{ backgroundColor: '#dc004e', width: '7em' }} onClick={event => window.location.href = '/viewCart'} ><span className={styles.button}>Go To Cart</span></Button>
                                    : null
                            

                            }




                            <Button variant="outlined" style={{ width: '7em' }}><span className={styles.button}>WishList</span></Button>
                        </CardActions>
                    </Card>




                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        open={this.state.open}
                        autoHideDuration={6000}
                        message={this.state.message}
                        onClose={() => this.setState({ open: false })}
                    />
                </div>
            </div>

        )
    }
}
export default BookApp
