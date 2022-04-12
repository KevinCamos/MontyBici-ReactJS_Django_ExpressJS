const fetch = require("node-fetch");
const { Headers } = require('node-fetch');

exports.get_user_token = async (token) =>{
    return fetch('http://localhost:8000/api/auth/user/', { 
        method: 'GET', 
        headers: new Headers({
          'Authorization': token, 
          'Content-Type': 'application/x-www-form-urlencoded'
        }),
      }).then(response => response.status===200
        ?response.json()
        :{status:404}
      )
      .then(data => {
        console.log(data)
          return data;
      });

}