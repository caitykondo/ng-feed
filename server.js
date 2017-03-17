const http = require('http');
const https = require('https');
const bodyParser = require('body-parser');

const express = require('express');
const app = express();
const PORT = process.env.PORT || 9000;
const CLIENT_ID = process.env.CLIENT_ID;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

let target_url = `https://api.instagram.com/v1/users/${CLIENT_ID}/media/recent/?access_token=${ACCESS_TOKEN}`;

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/api/instafeed', (req, res)=>{
  getPhotos(target_url);
});

function getPhotos(target_url){
  https.get(target_url, (res) =>{
    res.setEncoding('utf8');
    let body = '';
    res.on('data', (chunk) => {
      body += chunk;
    });
    res.on('end', () => {
      let json = JSON.parse(body);
      console.log(json);
    });

  });
}

app.listen(PORT, () => {
  console.log('server listening on', PORT);
});