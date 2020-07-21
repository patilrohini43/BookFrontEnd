import axios_service from './axios_service';

class cartService{

    baseUrl='http://localhost:8081/';
    constructor(){
        this.axios_service=new axios_service();
    }

    getCarts(){
        let url=this.baseUrl+'cart/getAllCart';
        let token={headers: {
            'content-type': 'application/json', 
            'token':localStorage.getItem('token')
          }}
        return this.axios_service.get(url,true,token)
    }

    addToCart(id){
        let url=this.baseUrl+'cart/addtoCart/'+id;
        let data=null
        let token={headers: {
            'content-type': 'application/json', 
            'token':localStorage.getItem('token')
          }}
        return this.axios_service.post(url,data,true,token)
    }
}
export default new cartService()