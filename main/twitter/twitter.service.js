require('dotenv').config()
const db = require('_helpers/db');
const CronJob = require("cron").CronJob;
const axios = require('axios');

module.exports ={
    getTrends,
    whioIDStore,
    getCountries,
    getTrendsByID
}

// const client = new Twitter({
//     appKey: process.env.API_KEY,
//     appSecret: process.env.API_SECRET,
//     accessToken: process.env.ACCESS_TOKEN,
//     accessSecret: process.env.ACCESS_SECRET,
// });

 

async function getTrends(WOEIDs) {
  console.log(WOEIDs)
  //   const WOEID =  {"woeid":WOEIDs}
    const response = await axios.post('https://twitter-trends.vercel.app/api/trends'  , {"woeid":WOEIDs})
    const res  = response.data[0].trends
    // console.log(res)
    let tweetarr = [];
    for (let i in res) {
      var tweetlist = {
        "Hashtag": res[i].name,
        'url': res[i].url,
        'tweetvolume': res[i].tweet_volume,
        'tweetquery': res[i].query,
      };
      tweetarr.push(tweetlist);
    }
    // await db.twitter.create(tweetarr)
    const instances = tweetarr.map(data => db.twitter.build(data));
    const savedtweetData = await Promise.all(instances.map(instance => instance.save())); 
    return savedtweetData;
}



async function whioIDStore() {
    const response = await axios.get('https://gist.githubusercontent.com/Zavanven/e606abc72ffbc13417a8315ec8543fda/raw/fe2d6b6302eecfdb31e7106f74afdb163c3b5989/woeid_countries_list.json');
    const res = response.data;
    let arr = [];
    for (let i in res) {
      var listdata = {
        "countryName": res[i].country,
        'woeID': res[i].woeid
      };
      arr.push(listdata);
    }
    const instances = arr.map(data => db.countries.build(data));
    const savedData = await Promise.all(instances.map(instance => instance.save()));
    // console.log(savedData);
    return savedData;
}
  

async function getCountries() {
    const data = await db.countries.findAll();

    if(!data)
        throw 'No Country Found'
    
    return data
}



async function getTrendsByID(id) {
  const data  =  await db.twitter.findByPk(id);
  let res  = data;

  return res
}


