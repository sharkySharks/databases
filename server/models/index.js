var db = require('../db');


module.exports = {
  messages: {
    get: function (callback) {
      var qString = 'select messages.message_id \
      , messages.message_text \
      , messages.user_id \
      , messages.rooms_id \
      from messages \
      left join users \
      on (messages.user_id = users.user_id) \
      order by messages.message_id desc';
      db.query(qString, function(err, data){
        if (err) {
          callback(err);
        } else {
          callback(data);
        }
      });
    }, // a function which produces all the messages
    post: function (params, callback) {
      var qString = 'insert into messages(message_text, user_id, rooms_id) \
        values(?, (select user_id from users where user_name = ? limit 1),\
        (select room_id from rooms where room_name = ? limit 1))';
      db.query(qString, function(err, data){
        if (err) throw err;
        callback(data);
      })
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function (callback) {
      var qString = 'select * from users';
      db.query(qString, function(err, data){
        if (err) {
          callback(err);
        } else {
          callback(data);
        }
      });
    },

    post: function (params, callback) {
      var qString = 'insert into users(user_name) values (?)';
      db.query(qString, function(err, data){
        if (err) throw err;
        callback(data);
      })
    }
  },

  rooms: {
    // Ditto as above.
    get: function (callback) {
      var qString = 'select * from rooms';
      db.query(qString, function(err, data){
        if (err) {
          callback(err);
        } else {
          callback(data);
        }
      });
    },

    post: function (params, callback) {
      var qString = 'insert into rooms(room_name) values (?)';
      db.query(qString, function(err, data){
        if (err) throw err;
        callback(data);
      })
    }
  }
};

