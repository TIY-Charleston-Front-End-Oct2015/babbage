$(document).ready(function(){
  chatPage.init();
});


var chatPage = {
  init: function(){
      chatPage.initStyling();
      chatPage.initEvents();
    },
  initStyling: function(){

  },
  initEvents: function(){
    //Submitting form functionality
    $('#chatMessage').on('submit', chatPage.createNewChat);
  },
  createNewChat: function(){
    event.preventDefault();
    var newChat = {
      userName: $('input[name="userName"]').val(),
      img: $('input[name="image"]').val(),
      msg: $('input[name="msg"]').val(),
    };
    $('input[type="text"]').val('');
    chatPage.sendChatToServer(newChat);

  },
  sendChatToServer: function(msg){
    console.log("Transmitting", msg);
    $.ajax({
      url: chatPage.url,
      method: 'POST',
      data: msg,
      success: function(response){
        console.log("success", response);
      },
      failure: function(response){
        console.log("failure", response);
      },
    });

  },
  url: "https://tiny-tiny.herokuapp.com/collections/perlman/",

};
