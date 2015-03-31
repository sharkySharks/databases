var mysql = require('mysql');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".

var db = mysql.createConnection({
	host: 'localhost',
	password: '',
	user: 'root',
	database:'chat' // <--do we have to refer to it more directly?? 
					// does this make it connected?
});

db.connect();

exports = db;

