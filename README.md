# Weather App
a simple node app using <DB> to store weather data from my ourWeather Station picked up from [Switch Doc Labs](https://github.com/switchdoclabs/OurWeatherWeatherPlus)

First, install our packages...

`$ npm install`

This is a simple flatfile verion. Instead of bothering with days of wrestling with mysql for beginners. You'll need to know a little about [JSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON) and Node's [FS Module](https://nodejs.org/api/fs.html#fs_file_system). I highly recommend brushing over the material listed. :)

you'll want to create an empty file and call it `weather.json`. Put it in the db folder for the server to write to.

Then to start server...

`$ npm start`

Currently it's only logging to the console and serving a simple page. but it's coming along. working on getting db connections working.

I'm also concurrently working on the [MySql branch](https://github.com/zerosquadron/weatherApp/tree/mysql) and am hoping to have a [Mongo branch](https://github.com/zerosquadron/weatherApp/tree/mongodb) started soon.
