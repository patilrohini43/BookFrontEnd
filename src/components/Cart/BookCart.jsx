import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ButtonGroup from "@material-ui/core/ButtonGroup";
import * as httpService from '/home/rohini/Pictures/Reactproject/bookstore/src/service/httpService.js'
import Snackbar from '@material-ui/core/Snackbar';
import Tooltip from '@material-ui/core/Tooltip';
import { useHistory } from "react-router-dom"
import NavBar from '../NavBar/NavBar.jsx';
import Skeleton from "@material-ui/lab/Skeleton";
import cartService from '../../service/cartService.js';



const useStyles = makeStyles(theme => ({
    root: {

        marginTop: '2%',
        width: '30em',
        [theme.breakpoints.up('md')]: {
            minWidth: '50em',
            marginBottom: '2%',
        },
    },
    dividerFullWidth: {
        margin: `5px 0 0 ${theme.spacing(2)}px`,
    },
    dividerInset: {
        margin: `5px 0 0 ${theme.spacing(9)}px`,
    },

    cardAction: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    cardContent: {
        display: 'flex',
        flexDirection: 'column',
        //justifyContent:'flex-start'
    },
    image: {
        display: 'flex',
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },
    buttonDiv: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: '2%'
    },
    paper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: '2%'
        // '& > *': {
        //   margin: theme.spacing(1),
        //   width:'100%',
        //   height: theme.spacing(10),
        // },
    },
    mainDiv: {
        //     display: 'flex',
        //   justifyContent: 'flex-start',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            paddingLeft: '10%',

        },
    },
    typoDiv: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    typo2Div: {
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'space-between'
    },

    titleCart: {
        display: 'flex',
        justifyContent: 'flex-start',
        paddingLeft: '2%',
        fontSize: '16px'
    },
    cartDiv: {
        height: 'fit-content',
        maxHeight: '60vh',
        overflowY: 'scroll',

    },
    customerDiv: {
        marginTop: '3%',
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    buttonBack: {
        display: 'flex',
        justifyContent: 'flex-start',
    },
    pos: {
        marginBottom: 12,
    },
}));
export default function BookCart(props) {
    const classes = useStyles();
    const [cartData, setCartData] = useState([]);
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState('');

    const[cartCount,setCartCount]=useState(0)
    const [loading ,setLoading]=useState(true)


    useEffect(() => {
        getCart()
        getAddressDetail()
    }, [])


    function getCart() {
        cartService.getCarts()
            .then((response) => {
                console.log(response)
                console.log(response.data)
                setCartCount(response.data.length)
                setCartData(response.data)
                setLoading(false)
            }).catch(function (error) {
                console.log(error);
            })
    }

    function getAddressDetail() {
        httpService.get('user/addressList')
            .then((response) => {
                console.log(response)
                console.log(response.data)
            
            }).catch(function (error) {
                console.log(error);
            })
    }

    const removeCart = (value) => {
        httpService.deleteAxios('cart/deleteFromCart/' + value)
            .then((response) => {
                setMessage(response.data.statusMessage)
                setOpen(true)
                let newData = cartData.filter(item => item.cartId !== value)
                setCartData(newData)
                getCart()
            }).catch(function (error) {
                console.log(error);
            })
    }

    const incrementCount = (id) => {
        httpService.putAxios('cart/increMentQuantity/' + id)
            .then((response) => {
                setOpen(true)
                setMessage(response.data.statusMessage)
            })
        getCart()
    }

    const decrementCount = (id) => {
        httpService.putAxios('cart/decreMentQuantity/' + id)
            .then((response) => {
                setOpen(true)
                setMessage(response.data.statusMessage)
            })
        getCart()
    }



    const history = useHistory();
    const goBack = () => history.push('/book');


    return (
        <div className={classes.mainDiv}>
            <NavBar cartCount={cartCount} />
            <div><div className={classes.buttonBack}><Tooltip title="Go Back" arrow><Button onClick={goBack}>Back <b></b></Button></Tooltip></div>

                <div>

                    <Card className={classes.root} >
                        <CardContent className={classes.cardContent}>
                            {
                                loading ? (
                                    <React.Fragment>
                                        <Skeleton animation="wave" height={20} width="5em" />
                                    </React.Fragment>
                                ) : (
                                        <Typography className={classes.titleCart} variant="subtitle2" gutterBottom>My Cart ({cartData.length})</Typography>
                                    )
                            }

                            <div className={classes.cartDiv}>
                                {
                                    ( loading ? Array.from(new Array(3)) : cartData).map((item, key) => 
                                   // cartData.map((item, key) =>

                                        <div className={classes.image} key={key}>
                                            {
                                                loading ? (
                                                    <Skeleton
                                                        animation="wave"
                                                        style={{ width: '7em', height: '12em', marginTop: '-2em' }}
                                                    />
                                                ) : (
                                                        <div style={{ padding: '2%' }}>
                                                            <img style={{ height: '9em', width: '7em' }} src={`http://localhost:8081/bookname/bookListImages/${item.book.bookId}`} alt="item" />
                                                        </div>
                                                    )}

                                            <div style={{ textAlign: 'start', padding: '2%' }}>
                                                {loading ? (
                                                    <React.Fragment>
                                                        <Skeleton
                                                            animation="wave"
                                                            height={10}
                                                        // style={{ marginBottom: 6 }}
                                                        />
                                                        <Skeleton animation="wave" height={15} width="12em" />
                                                    </React.Fragment>
                                                ) : (
                                                        <div>
                                                            <Typography variant="subtitle2"> {item.book.bookName}</Typography>
                                                            <Typography variant="caption" display="block" color="textSecondary">{item.book.author}</Typography>
                                                            <Typography variant="caption" display="block" color="black">  Rs.{item.book.price}</Typography>
                                                        </div>
                                                    )}
                                                <div className={classes.buttonDiv}>
                                                    {loading ? (
                                                        <React.Fragment>
                                                            <Skeleton
                                                                animation="wave"
                                                                height={10}
                                                                style={{ marginBottom: 6 }}
                                                            />
                                                            <Skeleton animation="wave" height={10} width="80%" />
                                                        </React.Fragment>
                                                    ) :
                                                        (<ButtonGroup size="small" aria-label="small outlined button group">
                                                            <Button onClick={incrementCount.bind(null, item.cartId)}>+</Button>

                                                            <Button >{item.quantity}</Button>

                                                            <Button onClick={decrementCount.bind(null, item.cartId)}>-</Button>
                                                        </ButtonGroup>
                                                        )}
                                                    <div>
                                                        {
                                                            loading ? (
                                                                <React.Fragment>

                                                                    <Skeleton animation="wave" height={15} width="5em" style={{ marginTop: "1em" }} />
                                                                </React.Fragment>

                                                            ) : (
                                                                    <Button size="small" style={{ marginLeft: '2%' }} onClick={removeCart.bind(null, item.cartId)}>Remove</Button>
                                                                )
                                                        }

                                                    </div>
                                                </div>

                                            </div>



                                        </div>


                                    )}
                            </div>

                        </CardContent>
                        <CardActions className={classes.cardAction}>
                            {
                                loading ? (
                                    <Skeleton
                                        animation="wave"
                                        variant="Rectangle"
                                        style={{width:"10em"}}
                                        height={20}
                                    />
                                )
                                    : (
                                        <Button size="small" variant="contained" color="primary" style={{ width: '27%' }} onClick={event => window.location.href = `/checkout`}>Place Order</Button>
                                    )
                            }

                        </CardActions>
                    </Card>

                </div>
            </div>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                open={open}
                onClose={() => setOpen(false)}
                autoHideDuration={3000}
                message={message}
            />
        </div>
    )
}


// export default function BookCart() {
//     console.log("jiiiii")
//     return (
//         <div>
//             <Media loading />
//             <Media />
//         </div>
//     );
// }
