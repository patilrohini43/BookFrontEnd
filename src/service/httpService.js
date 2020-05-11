import axios from 'axios';

const baseUrl='http://localhost:8081/'

  export function getAxios(url)
  {
     const URL = baseUrl+url;
    return axios(URL, {
      method: 'GET',
     // data:'',
      headers: {
        'content-type': 'application/json', 
      },
    })
  }

  export function postAxios(url,data)
  {
     const URL = baseUrl+url;
    return axios(URL, {
      method: 'POST',
      data:data,
      headers: {
        'content-type': 'application/json', 
      },
    })
  }


  export function putAxios(url)
  {
     const URL = baseUrl+url;
    return axios(URL, {
      method: 'PUT',

    })
  }

  export function deleteAxios(url)
  {
     const URL = baseUrl+url;
    return axios(URL, {
      method: 'DELETE',

    })
  }



  ///User
  export function get(url)
  {
     const URL = baseUrl+url;
    return axios(URL, {
      method: 'GET',
     // data:'',
      headers: {
        'content-type': 'application/json', 
        'token':localStorage.getItem('token')
      },
    })
  }

  export function post(url,data)
  {
     const URL = baseUrl+url;
    return axios(URL, {
      method: 'POST',
      data:data,
      headers: {
        'content-type': 'application/json', 
        'token':localStorage.getItem('token')
      },
    })
  }
