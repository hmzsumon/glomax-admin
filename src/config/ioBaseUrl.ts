let ioBaseUrl = '';
if (process.env.NODE_ENV === 'development') {
	// Code specific to development mode
	ioBaseUrl = 'http://localhost:5000';
	console.log('Running in development mode');
} else {
	ioBaseUrl = 'https://glomax-b74ed84442c8.herokuapp.com';
	// Code specific to production mode
	console.log('Running in production mode');
}
console.log('baseUrl', ioBaseUrl);
export default ioBaseUrl;
