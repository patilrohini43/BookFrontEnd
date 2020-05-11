import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import * as httpService from '/home/rohini/Pictures/Reactproject/bookstore/src/service/httpService.js'
import Typography from '@material-ui/core/Typography';
import { useForm } from "react-hook-form";
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Card from '@material-ui/core/Card';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1.5),
            width: '20em',
        },
    },
    mainDiv: {
        display: 'flex',
        justifyContent: 'flex-start',

    },
    radioGroup:{
        display: 'flex',
        flexDirection: 'row',
    },
    radio:{
        '& .MuiTypography-body1':{
            fontSize:'12px'
        },
    },
    formLabel:{
        '& .MuiFormLabel-root':{
            fontSize:'12px'
        },
    },
    textField: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '20em',
            [theme.breakpoints.up('md')]: {
                margin: theme.spacing(1),
                width: '42em',
            },
        },
    },
    radioDiv:{
        marginLeft:'4em',
        [theme.breakpoints.up('md')]: {
            marginLeft:'1em',
        },
        
    },
    buttonForm:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'center;',
    }

}));

function CustomerDetails(props) {
    const classes = useStyles();
  //  const [value, setValue] = React.useState('female');
    const { register, handleSubmit, errors } = useForm();
    const [customerDetails, setCustomerDetails] = useState(
        { Name: '', mobileNumber: '', pinCode: '', address: '', locality: '', city: '' ,landMark:'',type:''});  
      const [showLoading, setShowLoading] = useState(false);  
      const [openForm,setOpenForm] = useState(false);


    // const handleChange = (event) => {
    //     setValue(event.target.value);
    // };


   const onChange = (e) => {  
    e.persist();  
    console.log(e.target.name+"======"+e.target.value)
    setCustomerDetails({...customerDetails, [e.target.name]: e.target.value});  
    console.log(customerDetails+"details")
  } 

  const onSubmit = (event) => {
      console.log(event);
      const data={
          Name:customerDetails.name,
          pinCode:customerDetails.pinCode,
          mobileNumber:customerDetails.mobileNumber,
          address:customerDetails.address,
          city:customerDetails.city,
          locality:customerDetails.locality,
          landMark:customerDetails.landMark,
          type:customerDetails.type
      }
      props.addCustomerDetails(data)
      restData()
  }

  const closeForm=()=>{
    setOpenForm(false)
  }

  function showForm(){
    setOpenForm(true)
}


  const restData=()=>{
      const rest= { Name: '', mobileNumber: '', pinCode: '', address: '', locality: '', city: '' ,landMark:'',type:''}
      setCustomerDetails(rest)
  }
  

    return (
        <div className={classes.mainDiv}>
            {openForm
           ? <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} >
                <div className={classes.root} >
                    <TextField id="outlined-basic" className={classes.textSize} variant="outlined"
                        size="small"
                        name="Name" id="Name" placeholder="Name" value={customerDetails.Name} onChange={ onChange }
                        inputProps={{ style: { fontSize: '12px' } }}
                    />

                    <TextField id="outlined-basic"
                     placeholder="Phone No"
                     variant="outlined"
                     size="small"
                     name="mobileNumber" id="mobileNumber" value={customerDetails.mobileNumber} onChange={ onChange }
                     inputProps={{ style: { fontSize: '12px' } }}
                    />
                </div>
                <div className={classes.root}>
                    <TextField id="outlined-basic" placeholder="PinCode" variant="outlined" size="small"
                      name="pinCode" id="pinCode" value={customerDetails.pinCode} onChange={ onChange }
                        inputProps={{ style: { fontSize: '12px' } }}
                    />
                    <TextField id="outlined-basic" placeholder="Locality" variant="outlined" size="small"
                      name="locality" id="locality" value={customerDetails.locality} onChange={ onChange }
                        inputProps={{ style: { fontSize: '12px' } }}
                    />
                </div>
                <div className={classes.textField}>
                    <TextField id="outlined-basic" placeholder="Address" variant="outlined"
                      name="address" id="address" value={customerDetails.address} onChange={ onChange }
                        inputProps={{ style: { fontSize: '12px' } }}
                    />
                </div>
                <div className={classes.root}>
                    <TextField id="outlined-basic" placeholder="City/Town" variant="outlined" size="small"
                      name="city" id="city" value={customerDetails.city} onChange={ onChange }
                        inputProps={{ style: { fontSize: '12px' } }}
                    />
                    <TextField id="outlined-basic" placeholder="LandMark" variant="outlined" size="small"
                      name="landMark" id="landMark" value={customerDetails.landMark} onChange={ onChange }
                        inputProps={{ style: { fontSize: '12px' } }}
                    />
                </div>
                <div className={classes.radioDiv}>
                    <div style={{display:'flex'}}>
                    <Typography variant="subtitle2"> Gender</Typography>                           
                     </div>   
                    <div>
                    <RadioGroup className={classes.radioGroup} aria-label="gender" name="type" value={customerDetails.type} onChange={onChange}>
                        <FormControlLabel value="home" control={<Radio />} label="Home" className={classes.radio} />
                        <FormControlLabel value="work" control={<Radio />} label="Work"  className={classes.radio} />
                        <FormControlLabel value="other" control={<Radio />} label="Other"  className={classes.radio} />
                    </RadioGroup>
                    </div>
                </div>
               <div className={classes.buttonForm}>
               <Button variant="contained" type="submit" color="primary" style={{width:'25%',marginRight:'3%'}} >Submit</Button>
                <Button variant="contained" color="primary" onClick={closeForm} style={{width:'25%'}} >Close</Button>
                   </div>
                </form>
                :
                <CardActions>
                    <Fab size="small" color="secondary" aria-label="add"  onClick={showForm}> <AddIcon /> </Fab><span>Add Address</span>
                </CardActions>
            }
        </div>
    )
}

export default CustomerDetails  