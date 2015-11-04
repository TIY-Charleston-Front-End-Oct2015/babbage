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

    //THECLICKHIDDENFUNCTION
    $('.btn').on('click', function(event){
      event.preventDefault();
      $('.nav').addClass('hidden');
        $(".footer").fadeIn(8000);
        $('.chat').fadeIn(4000);
    });

    //Submitting form functionality
    $('#chatMessage').on('submit', chatPage.createNewChat);


    $('.chats').on('click','.delete',function (event) {
            var $deleteBtn = $(this);
            var chatID = $deleteBtn.closest('article').data('index');
            chatPage.deleteChat(chatID,$deleteBtn);
          });

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
