//importamos fetch
const fetch = require("node-fetch");
const { Headers } = require('node-fetch');

// import fetch from 'node-fetch';
// import {Headers} from 'node-fetch';

exports.get_user_token = async (token) =>{
    return fetch('http://localhost:8000/api/stations/station/', { 
        method: 'GET', 
        headers: new Headers({
          // 'Authorization': 'Token '+token, 
          'Content-Type': 'application/x-www-form-urlencoded'
        }),
      }).then(response => response.json())
      .then(data => {
  console.log(data)
          return data;
      });

}