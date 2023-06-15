const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize');
const authorizeAdmin = require('_middleware/authorizeAdmin');
const twitterService  = require('./twitter.service');
require('dotenv').config()



router.post('/trends' , getTrends)
router.get( '/trends/:id' ,  getTrendsByID)
router.get('/getWHOID', whioIDStore )
router.get('/getCountry' , getCountries)
module.exports = router;



async function getTrends(req, res ,next) {
  twitterService.getTrends(req.body.woeid)
  // console.log(req.body)
  .then((data) => res.json(data))
  .catch(next)
}


async function whioIDStore(req, res, next) {
  twitterService.whioIDStore(req.body)
  .then((data) => res.send(data))
  .catch(next)
}


function getCountries(res,res,next) {
  twitterService.getCountries()
    .then((data) => res.json(data))
    .catch(next)
}




function getTrendsByID(req, res, next) {
  twitterService.getTrendsByID(req.params.id)
  .then(users => res.json(users))
  .catch(next);
}





// async function getTrends(req, res, next) {
//   const bearerToken = 'AAAAAAAAAAAAAAAAAAAAAD%2FKnwEAAAAAMZfcYo3jPc0XAfS7arUO8Namr58%3D9bn5h41ZkqNAH4bi79qxmRE95rcACC96TYmBFhsLTNLaEbrnGD'; // Your Twitter API v2.1 bearer token
//   console.log(bearerToken)
//   try {
//     console.log('try')
//     const response = await axios.get(`https://api.twitter.com/1.1/trends/place.json?id=2295019`, {
//       headers: { Authorization: `Bearer ${bearerToken}`},
//       // params: { },
//     });
//     console.log(params)
//     console.log(response.data); // Handle the response data as per your requirements
//   } catch (error) {
//     console.error(error.message);
//   }
// }
  



















// const clients = new Twitter.TwitterApi
// const client = new Twitter({
//     consumer_key: process.env.API_KEY,
//     consumer_secret: process.env.API_SECRET,
//     access_token_key: process.env.ACCESS_TOKEN,
//     access_token_secret: process.env.ACCESS_TOKEN_SECRET,
//     bearer_token: process.env.BEARER_TOKEN
// });












// function getTrends(req, res, next) {
//     // twitterService.getTrends(req.query.id)
//     // // console.log(req.query)
//     //     .then((data) => res(data))
//     //     .catch(next)
  
// }




// async function getTrends(req, res, next) {
//   try {
//     const id = req.query.id;
//     const trends = await client.get('trends/place.json', {
//       id: 2295019
//     });
//     console.log(trends);
//   } catch (error) {
//     // Handle the error
//     console.error(error);
//     // Optionally, you can also send an error response to the client
//     res.status(500).json({ error: 'An error occurred' });
//   }
// }



// const axios = require('axios');
// async function getTrends(req, res, next) {
//     const options = {
//       method: 'GET',
//       url: 'https://onurmatik-twitter-trends-archive-v1.p.rapidapi.com/download',
//       params: {
//         country: 'US',
//         date: '2017-09-03'
//       },
//       headers: {
//         'X-RapidAPI-Key': '054d32c234msh87fbe80f6c97dd6p191e21jsn04897bf98ec6',
//         'X-RapidAPI-Host': 'onurmatik-twitter-trends-archive-v1.p.rapidapi.com'
//       }
//     };

//     try {
//       const response = await axios.request(options);
//       console.log(response.data);
//     } catch (error) {
//       console.error(error);
//     }
// }