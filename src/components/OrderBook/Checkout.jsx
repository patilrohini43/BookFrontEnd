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
import CustomerDetails from '../CustomerForm/CustomerDetails';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import Divider from '@material-ui/core/Divider';
import bookService from '/home/rohini/Pictures/Reactproject/bookstore/src/service/bookService';


const useStyles = makeStyles(theme => ({
    root: {

        marginTop: '2%',
        width: '30em',
        [theme.breakpoints.up('md')]: {
            minWidth: '50em',
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
        display: 'flex',
        justifyContent: 'flex-start',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            paddingLeft: '10%',
            paddingTop: '2%',
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
    orderTitle: {
        display: 'flex',
        justifyContent: 'flex-start',
    },
    pos: {
        marginBottom: 12,
    },
}));
export default function Checkout() {
    const classes = useStyles();
    const [count, setCount] = useState(0);
    const [orderPrice, setOrderPrice] = useState([]);
    const [cartData, setCartData] = useState([]);
    const [customerData, setCustomerData] = useState([]);
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState('');
    const [openForm, setOpenForm] = useState(false);
    const [value, setValue] = React.useState({
        addressId: ''
    });
    const [orderId, setOrderID] = useState('')
    const [error, setError] = React.useState(false);
    const [helperText, setHelperText] = React.useState('Choose wisely');


    useEffect(() => {
        // getCart()
        getAddressDetail()
    }, [])

    const handleRadioChange = (e) => {
        console.log(e.target.name + "======" + e.target.value)
        setValue({ ...value, [e.target.name]: e.target.value });
    };


    // function getCart() {
    //     httpService.getAxios('cart/getAllCart/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjF9.SkJVXXp-unSNovqHE14ml3Kw7fcoLxLIdu4DZ5DLotQ')
    //         .then((response) => {
    //             console.log(response)
    //             console.log(response.data)
    //             response.data.map((item => {
    //                 setCartData(item.items)
    //             }))
    //         }).catch(function (error) {
    //             console.log(error);
    //         })
    // }

    function getOrderDetails(orderId) {
        console.log(orderId)
        httpService.get('order?orderId=' + orderId)
            .then((response) => {
                console.log(response)
                console.log(response.data)
                setOrderPrice(response.data)
               // setCartData(response.data)
                response.data.map((item) => {
                    console.log(item.cart.items)
                    setCartData(item.cart.items)
                    item.cart.items.map((items) => {
                        console.log(items.cartId+"nooo"+JSON.stringify(items.book))
                      console.log(items.book.bookId)
                    })
                })
            }).catch(function (error) {
                console.log(error);
            })
    }

    function getAddressDetail() {
       // httpService.get('user/addressList')
       bookService.getAddress()
            
            .then((response) => {
                console.log(response)
                console.log(response.data)
                setCustomerData(response.data)
            }).catch(function (error) {
                console.log(error);
            })
    }

    const removeCart = (value) => {
        console.log("hii" + value)
        httpService.deleteAxios('cart/deleteFromCart/' + value)
            .then((response) => {
                console.log(response.data.statusMessage)
                setMessage(response.data.statusMessage)
                setOpen(true)
                console.log(cartData)
                let newData = cartData.filter(item => item.cartId !== value)
                setCartData(newData)

            }).catch(function (error) {
                console.log(error);
            })
    }

    const incrementCount = (id) => {
        httpService.putAxios('cart/increMentQuantity/' + id)
            .then((response) => {
                console.log(response.data.statusMessage)
                setOpen(true)
                setMessage(response.data.statusMessage)
            })
        // getCart()
    }

    const decrementCount = (id) => {
        httpService.putAxios('cart/decreMentQuantity/' + id)
            .then((response) => {
                console.log(response.data.statusMessage)
                setOpen(true)
                setMessage(response.data.statusMessage)
            })
        // getCart()
    }

    const addCustomerDetails = (data) => {
        console.log(data + "dddddddddddd" + JSON.stringify(data))
        httpService.postAxios('user/adderssDetail/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjF9.SkJVXXp-unSNovqHE14ml3Kw7fcoLxLIdu4DZ5DLotQ', data)
            .then((response) => {
                console.log(response)
                console.log(response.data)
            }).catch(function (error) {
                console.log(error);
            })
    }

    const createOrder = () => {
        var cartId = localStorage.getItem('cartId')
        console.log(cartId + "address" + value.addressId)
        httpService.post('order?addressId=' + value.addressId + '&cartId=' + cartId, null)
            .then((response) => {
                console.log(response)
                console.log(response.data.statusMessage)
                setOpen(true)
                setOpenForm(true)
                setMessage(response.data.statusMessage)
                getOrderDetails(response.data.token)
            }).catch(function (error) {
                console.log(error);
            })
    }
    function showForm() {
        setOpenForm(true)
    }

  const OrderPlace=(orderId)=>{
       // window.location.href = `/orderPlace`
        console.log(orderId)
        httpService.put('order?orderId='+orderId,null)
        .then((response) => {
            console.log(response)
            console.log(response.data.statusMessage)
            setOpen(true)
            setOpenForm(true)
            setMessage(response.data.statusMessage)
            window.location.href = `/orderPlace`
        }).catch(function (error) {
            console.log(error);
        })
    }

    const history = useHistory();
    const goBack = () => history.push('/book');


    return (
        <div className={classes.mainDiv}>
            <div><div className={classes.buttonBack}><Tooltip title="Go Back" arrow><Button onClick={goBack}>Back <b></b></Button></Tooltip></div>
                <div className={classes.customerDiv}>
                    <Card className={classes.root}>
                        <CardContent>
                           <Typography variant="subtitle2"className={classes.orderTitle} >Delivery Address</Typography>
                         
                            {
                                customerData.map((item, key) =>
                                    <div>
                                        <div className={classes.paper} key={key}>
                                            <div className={classes.buttonDiv}>
                                                <RadioGroup aria-label="quiz" name="addressId" value={value.addressId} >
                                                    <FormControlLabel name="addressId"
                                                        onClick={handleRadioChange}
                                                        key={String(item.addressId)}
                                                        value={String(item.addressId)}
                                                        control={<Radio color="primary" />}
                                                    // control={<Radio />}
                                                    />
                                                </RadioGroup>
                                                <div className={classes.typoDiv}>
                                                    <div className={classes.typo2Div}>
                                                        <Typography variant="subtitle2" gutterBottom style={{ marginRight: '2em' }}>Name:<Typography variant="caption" gutterBottom style={{ marginRight: '2em' }}>{item.name}</Typography></Typography>

                                                    </div>
                                                    <div className={classes.typoDiv}>
                                                        <Typography variant="subtitle2" gutterBottom >Type:<Typography variant="caption" gutterBottom style={{ marginRight: '2em' }}>{item.type}</Typography></Typography>
                                                        <Typography variant="subtitle2" gutterBottom>Mobile Phone:<Typography variant="caption" gutterBottom >{item.mobileNumber}</Typography></Typography>
                                                        <Typography variant="subtitle2" gutterBottom>Address<Typography variant="caption" gutterBottom >{item.address}</Typography></Typography>
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <Button size="small">Edit</Button>
                                            </div>
                                        </div>
                                        <Divider variant="middle" />
                                    </div>

                                )
                            }

                        </CardContent>
                        <CardActions className={classes.cardAction}>
                            <Button size="small" variant="contained" color="primary" style={{ width: '27%' }} onClick={createOrder}>Continue</Button>
                        </CardActions>
                    </Card>
                </div>
                <div className={classes.customerDiv}>
                    <Card className={classes.root}>
                        <CardContent>
                            <CustomerDetails addCustomerDetails={addCustomerDetails} />
                        </CardContent>
                        {/* <CardActions className={classes.cardAction}>
                            <Button size="small" variant="contained" color="primary" style={{ width: '27%' }}>Learn More</Button>
                        </CardActions> */}
                    </Card>
                </div>

                <div>
                    <Card className={classes.root} >
                        <CardContent className={classes.cardContent}>
                            <Typography className={classes.titleCart} variant="subtitle2" gutterBottom>Order Summary </Typography>

                            <div>
                                {
                                    cartData.map((item, key) =>
                                        <div className={classes.image} key={key}>


                                            <div style={{ padding: '2%' }}>
                                                <img style={{ height: '9em', width: '7em' }} src={`http://localhost:8081/bookname/bookListImages/${item.book.bookId}`} alt="item" />
                                            </div>
                                            <div style={{ textAlign: 'start', padding: '2%' }}>
                                                <Typography variant="subtitle2"> {item.book.bookName}</Typography>
                                                <Typography variant="caption" display="block" color="textSecondary">{item.book.author}</Typography>
                                                <Typography variant="caption" display="block" color="black">  Rs.{item.book.price}</Typography>
                                                <div className={classes.buttonDiv}>
                                                    {/* <ButtonGroup size="small" aria-label="small outlined button group">
                                                        <Button onClick={incrementCount.bind(null, item.cartId)}>+</Button>

                                                        <Button >{item.quantity}</Button>

                                                        <Button onClick={decrementCount.bind(null, item.cartId)}>-</Button>
                                                    </ButtonGroup> */}
                                                     <Typography variant="caption" display="block" color="black">Quantity Item:{item.quantity}</Typography>
                                                    <Button size="small" style={{ marginLeft: '2%' }} onClick={removeCart.bind(null, item.cartId)}>Remove</Button>

                                                </div>
                                            </div>

                                        </div>
                                    )}
                            </div>
                         

                        </CardContent>
                        {
                            orderPrice.map(item=>
        
                        <CardActions className={classes.cardAction}>
                             <Typography  variant="subtitle2" gutterBottom>Total Price:{item.totalPrce}</Typography>
                            <Button size="small" variant="contained" color="primary" style={{ width: '27%' }} onClick={OrderPlace.bind(null,item.orderId)}>Continue</Button>
                        </CardActions>
                              )
                            }
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