$(document).ready(function(){
  chatPage.init();
});


var chatPage = {
  init: function(){
      chatPage.initStyling();
      chatPage.initEvents();
    },
  initStyling: function(){
    chatPage.grabChatFromServer();

  },
  initEvents: function(){

    //THECLICKHIDDENFUNCTION
    $('.btn').on('click', function(event){
      event.preventDefault();
      $('.nav').addClass('hidden');
        $(".footer").fadeIn(8000);
        $('.chat').fadeIn(4000);
        var $name = $('input[name="user"]').val();
        chatPage.setUser($name);
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
      userName: chatPage.currentUser,
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

  grabChatFromServer: function() {
    $.ajax({
      type: 'GET',
      url: chatPage.url,
      success: function(data) {
        console.log("SUCCESS: ", data);
        chatPage.loadChats(data);
      },
      failure: function(data) {
        console.log("FAILURE: ", data);
      }
    });
  },

  //once we GET chats we have to load into template here
  loadChats: function(data) {
    var chatsTemplate = _.template($('#chatTmpl').html());
    var chatsHTML = "";
    _.each(data, function (currVal, idx, arr) {
      chatsHTML += chatsTemplate(currVal);
    });
    $('.chatBox').html(chatsHTML);
    // $('.chatBox').append(chatsHTML);

  },


  url: "https://tiny-tiny.herokuapp.com/collections/perlman/",
  currentUser: "",
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
  },
  setUser: function(name){
    chatPage.currentUser = name;
  },
};
