const http   		= require('http');
const getPath 	= 'http://10.0.0.35';
const redis     = require('redis');
const client    = redis.createClient();

http.get(getPath, function callback(resp) {
	resp.setEncoding('utf8')

	resp.on('data', function(data){
		console.log(data);
		return weatherObject(data);
	})
	resp.on('error', function(error){
		console.log('ERR', error)
	})
})

const weatherObject = data => {

}


client.on('connect', () => {
  console.log('redis connection...')
});
