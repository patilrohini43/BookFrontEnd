import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { InputAdornment } from '@material-ui/core';
import styles from '../Login/Login.module.scss';
import * as httpService from '/home/rohini/Pictures/Reactproject/bookstore/src/service/httpService.js'
import { RemoveRedEye } from '@material-ui/icons';


class Login extends React.Component{

    constructor(props) {
        super(props);
        
    
        this.state = {
          hidden: true,
          email:"",
          password: "",
        };
      
        this.loginData = this.loginData.bind(this);
        this.toggleShow = this.toggleShow.bind(this);
      }

      loginData(e) {
         this.setState({
            [e.target.name]: e.target.value,
        })
      
      }



onSubmit(e) {
    e.preventDefault();     
    var data={
        email:this.state.email,
        password:this.state.password,
      }

      httpService.put('/user/login',data).then((response)=>{
      localStorage.setItem('token',response.headers["token"])
      window.location.href = `/book`
     
    })

}
    
      toggleShow() {
        this.setState({ hidden: !this.state.hidden });
      }
    
      componentDidMount() {
        if (this.props.password) {
          this.setState({ password: this.props.password });
        }
      }
    
    

render() {
    return <form onSubmit={this.onSubmit.bind(this)}>
            <div className={styles.mainDiv} >
             <div className={styles.imageDiv}>
                <img className={styles.image} src={require("/home/rohini/Pictures/Reactproject/bookstore/src/images/l.jpeg")} alt="" />
             </div>
            <div className={styles.fieldDiv}>
                <h1>Sign In</h1>
            <div className={styles.field}>
            <TextField required id="email" name="email" label="Enter your email" onChange={this.loginData}  variant="outlined" style={{marginTop:"3%"}} />
            <TextField  type={this.state.hidden ? "password" : "text"}  label="Enter your password" name="password"
                        value={this.state.password} onChange={this.loginData} 
                       InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <RemoveRedEye
                             onClick={this.toggleShow}
                            />
                          </InputAdornment>
                        ),
                      }}
                       variant="outlined" style={{marginTop:"3%"}} />
            <div className={styles.forgotButton}>
            <Button href="#text-buttons" color="primary"style={{fontSize:"12px"}} >
             Forgot Password
            </Button>
            </div>
            <div className={styles.Button}>
            <Button variant="contained" type="submit" color="primary" className={styles.buttonField}>Submit</Button>  
             </div>                
            </div>
            </div>
          </div>
          </form>
}

}

export default Login;