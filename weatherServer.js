var http 		= require('http')
	, getPath 	= 'http://10.0.0.35';

http.get(getPath, function callback(resp) {
	resp.setEncoding('utf8')

	resp.on('data', function(data){
		console.log(data)
		return weatherObject(data);
	})
	resp.on('error', function(error){
		console.log(error)
	})
})

const weatherObject = data => {

}
