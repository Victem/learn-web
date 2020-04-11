const express = require('express')
const router = express.Router()
const virustrackerService = require('../../services/virusTrackerService')

const countriesGeoData = require('capitals-coordinates').rawData
const capitalsCoordinates = require('../../data/country-capitals.json')
const path = 'virustracker'


const capitalsGeoData  = {}
capitalsCoordinates.forEach(item=> {
  const countryData = {
    name: item.CountryName,
    capital: item.CapitalName,
    code: item.CountryCode,
    lat: +item.CapitalLatitude,
    long: +item.CapitalLongitude
  }
  capitalsGeoData[countryData.code] = countryData
})
/* const countries = {}
const countryNames = []
countriesGeoData.forEach(item=> {
  countryNames.push({ country: item.properties.country, capital: item.properties.capital})
  const country = {
    name: item.properties.country,
    lat: item.geometry.coordinates[0],
    long: item.geometry.coordinates[1]
  }

  const aliaces = {
    'Brunei': 'Brunei Darussalam',
    'Republic of the Congo': 'Congo',
    'Democratic Republic of the Congo' : 'Democratic Republic of Congo',
    'Czech Republic': 'Czechia',
    'North Korea': 'Korea',
    'Laos': 'Lao',
    'Israel': 'Palestine'
  }
  country.name = aliaces[country.name] || country.name
  countries[`${country.name}`] = {
    lat: country.lat,
    long: country.long
  }
})
countryNames.filter(n=> n.capital === "Jerusalem")
  .forEach(item=> console.log(item))
//console.log(countries) */

router.get(`/${path}/global`, (req, res)=> {
  console.log(`********** get country global stats BEGIN **********`)
  virustrackerService({
    url: '/free-api',
    method: 'get',
    params: {
      global: 'stats'
    }
  }).then(response=> {
    console.log(`********** get country global stats END **********`)
    res.status(200).send(response.data.results);
  }).catch(error=> {
    console.log(error)
  });
});


router.get(`/${path}/country/:code`, (req, res)=> {

  const { code } = req.params;
  // const code = req.params.code;
  console.log(`********** get country data ${code} BEGIN **********`)
  const params = code === 'ALL'
    ? { countryTotals: code}
    : { countryTotal: code }

  virustrackerService({
    url: '/free-api',
    method: 'get',
    params: params
  }).then(response=> {
    if( code === 'ALL' ) {
      const countryitems = response.data.countryitems[0]
      const data = []
      for (const key in countryitems) {
        const intKey = +key
        const ignore = ['DP']
        if (countryitems.hasOwnProperty(key) && Number.isInteger(intKey)) {

          const country = countryitems[intKey]
          if(!ignore.some(c=> c === country.code)) {
            const coordinates = capitalsGeoData[country.code]
            country.long = coordinates.long
            country.lat = coordinates.lat
            data.push(country)
          }
        }
      }
      console.log(`********** get country data ${code} END **********`)
      res.status(200).send(data)
    } else {
      const countrydata = response.data.countrydata[0]

      const data = {
        ourid: countrydata.info.ourid,
        title: countrydata.info.title,
        code: countrydata.info.code,
        source: countrydata.info.ourid,
        total_cases: countrydata.total_cases,
        total_recovered: countrydata.total_cases,
        total_unresolved: countrydata.total_unresolved,
        total_deaths: countrydata.total_deaths,
        total_new_cases_today: countrydata.total_new_cases_today,
        total_new_deaths_today: countrydata.total_new_deaths_today,
        total_active_cases: countrydata.total_active_cases,
        total_serious_cases: countrydata.total_serious_cases,
        total_danger_rank: countrydata.total_danger_rank,
      }
      const geoData = capitalsGeoData[data.code]
      data.lat = geoData.lat
      data.long = geoData.long
      console.log(`********** get country data ${code} END **********`)
      res.status(200).send(data)
    }
  }).catch(error=> {
    console.log(error);
  });
});

router.get(`/${path}/timeline`, (req, res)=> {
  console.log('********** get timeline data BEGIN **********')
  virustrackerService({
    baseURL: '',
    url: 'https://thevirustracker.com/timeline/map-data.json',
    method: 'get'
  }).then(response=> {

    const { data } = response.data
    //console.log(data)
    const result = [];
    const ignore = ['DP', 'MSZ', ]
    data.forEach((item,index)  => {
      if(!ignore.some(c=> c === item.countrycode)) {
        //console.log(`Country code ${item.countrycode}`)
        const geoData = capitalsGeoData[item.countrycode]
        //console.log(`geoData ${geoData}`)
        item.lat = geoData.lat
        item.long = geoData.long
        result.push(item)
      }
    })
    console.log('********** get timeline data END **********')
    res.status(200).send(result)
  }).catch(error => {
    console.log(error)
  });
});

router.get(`/${path}/timeline/:code`, (req, res)=> {
  const { code } = req.params;
  virustrackerService({
    url: '/free-api',
    method: 'get',
    query: {
      countryTimeline: code
    }
  });
});

module.exports = router;
