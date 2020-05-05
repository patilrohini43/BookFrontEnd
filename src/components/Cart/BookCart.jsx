import React, { useState ,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ButtonGroup from "@material-ui/core/ButtonGroup";
import * as httpService from '/home/rohini/Pictures/Reactproject/bookstore/src/service/httpService.js'



const useStyles = makeStyles(theme => ({
    root: {
       
        marginTop:'2%',
        width:'30em',
        [theme.breakpoints.up('md')]: {
        minWidth: '50em',
        },
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
    buttonDiv:{
        display:'flex',
        flexDirection:'row',
    },
    mainDiv: {
        display: 'flex',
        justifyContent: 'flex-start',
        [theme.breakpoints.up('md')]: {
            marginLeft: theme.spacing(3),
        paddingLeft: '10%',
        paddingTop: '2%',
        },
    },
    titleCart: {
        display: 'flex',
        justifyContent: 'flex-start',
        paddingLeft:'2%',
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
    pos: {
        marginBottom: 12,
    },
}));
export default function BookCart() {
    const classes = useStyles();
    const [count, setCount] = useState(0);
    const [cartData, setCartData] = useState([]);
    const displayCounter = count > 0;


    useEffect(() => {
      getCart()
    } ,[])

   function getCart(){
               httpService.getAxios('cart/getAllCart/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjF9.SkJVXXp-unSNovqHE14ml3Kw7fcoLxLIdu4DZ5DLotQ')
            .then((response) => {
                console.log(response)
                console.log(response.data)
                response.data.map((item=>{
                    setCartData(item.items)
                }))
            }).catch(function (error) {
                console.log(error);
            })
    }

    function removeCart(cartId){
        console.log("hii"+cartId)
    }


    return (
        <div className={classes.mainDiv}>
            <div>
                <div>
                    
                       

                    <Card className={classes.root} >
                        <CardContent className={classes.cardContent}>
                            <Typography className={classes.titleCart} variant="h6" gutterBottom>My Cart </Typography>
                          <div>
                            {
                        cartData.map((item,key)=>                        
                            <div className={classes.image}  key={key}>
                        
                           
                                <div style={{ padding: '2%' }}>
                                    <img style={{ height: '9em', width: '7em' }} src={`http://localhost:8081/bookname/bookListImages/${item.book.bookId}`} alt="item" />
                                </div>
                                <div style={{ textAlign: 'start', padding: '2%' }}>
                                    <Typography variant="subtitle2"> {item.book.bookName}</Typography>
                                    <Typography variant="caption" display="block" color="textSecondary">{item.book.author}</Typography>
                                    <Typography variant="caption" display="block" color="black">  Rs.{item.book.price}</Typography>
                                 <div className={classes.buttonDiv}>
                                 <ButtonGroup size="small" aria-label="small outlined button group">
                                            <Button onClick={() => setCount(count + 1)}>+</Button>
                                            <Button >{count}</Button>
                                            =<Button onClick={() => setCount(count + 1)}>-</Button>
                                </ButtonGroup>

                                <Button size="small" style={{ marginLeft: '2%' }} onClick={removeCart(item.cartId)}>Remove</Button>
                                    
                                     </div>
                                </div>
                       
                            </div>
                             )}
                            </div>
                            
                        </CardContent>
                        <CardActions className={classes.cardAction}>
                            <Button size="small" variant="contained" color="primary" style={{width:'27%'}}>Place Order</Button>
                        </CardActions>
                    </Card>
            
                </div>

                <div className={classes.customerDiv}>
                    <Card className={classes.root}>
                        <CardContent>

                        </CardContent>
                        <CardActions className={classes.cardAction}>
                            <Button size="small" variant="contained" color="primary" style={{width:'27%'}}>Learn More</Button>
                        </CardActions>
                    </Card>
                </div>
            </div>
        </div>
    )
}