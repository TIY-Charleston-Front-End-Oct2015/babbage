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

    $('.chats').on('click','.delete',function (event) {
            var $deleteBtn = $(this);
            var chatID = $deleteBtn.closest('article').data('index');
            chatPage.deleteChat(chatID,$deleteBtn);
          });

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

  deleteChat: function(chatID) {
    $.ajax({
      method: 'DELETE',
      url: chatPage.url + chatID,
      success: function(data) {
        console.log("DELETED", data);
        $(this).closest('article').remove();
      },
      failure: function(data) {
        console.log("ERROR", data);
      }
    });
  }
};
