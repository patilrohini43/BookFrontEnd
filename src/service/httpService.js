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