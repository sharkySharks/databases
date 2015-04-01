var models = require('../models');
var bluebird = require('bluebird');


var userFields =['username'];
var messageFields = ['username', 'text', 'roomname'];

module.exports = {
  messages: {
      	//calls method from model to access data
    get: function (req, res) {
    	models.messages.get(function(err, results){
    		if (err) {
    			throw err;
    		} else {
    		  res.status(200).send(JSON.stringify(results)); 
    		}
    	});

  	}, // a function which handles a get request for all messages
    	// calls method from the model to send data to the database
    post: function (req, res) {
    	var params = [req.body[text], req.body[username], req.body[roomname]];
    	models.messages.post(params, function(err, results){
    		if (err) {
    			throw err;
    		} else {
    		  res.json(results);
    		}
    	});

    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
    	models.users.get(function(err, results){
    		if (err) {
    			throw err;
    		} else {
    		  res.json(results);
    		}
    	})
    },
    post: function (req, res) {
    	var params = [ req.body[username] ];

    	models.users.post(params, function(err, results){
    		if (err) {
    			throw err;
    		} else {
    		  res.json(results);
    		}
    	})
    }
  },

  rooms: {
    // Ditto as above
    get: function (req, res) {
    	models.rooms.get(function(err, results){
    		if (err) {
    			throw err;
    		} else {
    		  res.json(results);
    		}
    	})
    },
    post: function (req, res) {
    	var params = [ req.body[roomname] ];

    	models.rooms.post(params, function(err, results){
    		if (err) {
    			throw err;
    		} else {
    		  res.json(results);
    		}
    	})
    }
  }
};

