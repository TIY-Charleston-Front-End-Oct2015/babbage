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

  },
  createNewChat: function(user, img, msg){
    var newChat = {
      userName: user,
      img: img,
      msg: msg
    };
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
