const http   		= require('http');
const getPath 	= 'http://10.0.0.35';

http.get(getPath,  (resp) => {
	resp.setEncoding('utf8')

	resp.on('data', (data) => {
		console.log(data);
		return weatherObject(data);
	})
	resp.on('error', (error) => {
		console.log('ERR', error)
	})
})

const weatherObject = data => {

}
