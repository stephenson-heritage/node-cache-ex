var express = require('express');
var router = express.Router();
const cache = require("../models/cache");

const fountain = require("../models/fountain");

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/fountains', async function (req, res) {
  let data = await cache.fetchUrl("https://services.arcgis.com/G6F8XLCl5KtAlZ2G/arcgis/rest/services/Public_Drinking_Water_Fountains/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson");


  res.json(data);
});

router.get('/fountains/:lng,:lat', async function (req, res) {
  let data = await fountain.getClosest({ lat: req.params.lat, long: req.params.lng }, 20);
  res.json(data);
});

module.exports = router;
