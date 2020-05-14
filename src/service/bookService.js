import axios_service from './axios_service';

class bookService{

    baseUrl='http://localhost:8081/';
    constructor(){
        this.axios_service=new axios_service();
    }

    getAddress(){
        let url='http://localhost:8081/user/addressList';
        let token={headers: {
            'content-type': 'application/json', 
            'token':localStorage.getItem('token')
          }}
        return this.axios_service.get(url,true,token)
    }
}
export default new bookService()