(function(){

  window.app = {
    existingRooms:['lobby'],
    server: 'http://127.0.0.1:3000/',
    init: function(){

    },
    send: function(data){
      $.ajax({
        url: app.server,
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (data) {
          app.fetch()
          console.log("Success! ", data.results);
        },
        error: function (data) {
          console.error('chatterbox: Failed to send message');
          console.log("Error: ", data);
        }
      });
    },

    fetch: function(){
      $.ajax({
        url: app.server,
        type: 'GET',
        contentType: 'application/json',
        success: function (data) {
          console.log(data)
          
          app.populateMessages(data)
          app.populateRooms(data)
        
        },
        error: function (data) {
          console.error('chatterbox: Failed to retrieve');
        }
      });
    },

    populateMessages: function(data){
      app.clearMessages()
      for (var i=0;i<data.results.length;i++){
        var room = data.results[i].roomname || 'lobby';
        if (room===$("#roomSelect option:selected").text()){
          app.addMessage(data.results[i])
        }
      }
    },

    clearMessages: function(message){
      $("#chats").empty()
    },

    addMessage: function(message){
      var user = message.username
      var chat = "<div class='chat'><div class='username "+user+"'>"+user+"</div><div class='text'>"+message.text+"</div></div>"
      $("#chats").append(chat)
    },

    populateRooms:function(data){
      var rooms=[]

        for (var i=0;i<data.results.length;i++){
          var room = data.results[i].roomname || 'lobby';
          rooms.push(room);
        }
        
        for (var i=0;i<rooms.length;i++){
          if (app.existingRooms.indexOf(rooms[i]) ===-1){
            app.addRoom(rooms[i])
            app.existingRooms.push(rooms[i])            
          }
        }
    },

    addRoom: function(rooms){
      $("#roomSelect").append("<option>"+rooms+"</option>")
    },

    addFriend: function(context){
      var classHolder=$(context).attr('class').split(" ")
      $("."+classHolder[1]).addClass("friend")
    },

    submitHandler: function(){

      var userName = window.location.href.split('username=')[1];
      var message = {
        username: userName,
        text:$("#message").val(),
        roomname:$("#roomSelect option:selected").text()
      }
      app.send(message)
    }
  }

app.fetch()
setInterval(function(){app.fetch()},3000)

  $(document).ready(function(){


    $(document).on('click', '.username', function(){
      var context=this
      app.addFriend(context)
    })

    $(".submit").click(function(){
      app.submitHandler() 
    })

    $("#roomSelect").change(function(){
        app.fetch()
      });
    
  })

})();