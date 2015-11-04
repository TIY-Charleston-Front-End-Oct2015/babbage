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
    $('#initialButton').on('click', function(event){
      console.log("this is happening - initialbutton");
      event.preventDefault();
      //$('.nav').addClass('hidden');
      $('section').toggleClass('hidden');
      //  $('.signIn').addClass('hidden');
        // $('.chats').toggleClass('hidden');
      //  $('.mainPage').removeClass('hidden');
        var $name = $('input[name="user"]').val();
        chatPage.setUser($name);
        chatPage.grabChatFromServer();
      });
    //Submitting form functionality
    $('body').on('submit','#chatMessage', function(event){
      event.preventDefault();
      console.log("this is happening - submit chatmessage");
      var newChat = {
        userName: chatPage.currentUser,
        //img: $('input[name="image"]').val(),
        msg: $('input[name="msg"]').val(),
      };
      console.log("newly created chat", newChat);
      $('input[type="text"]').val('');
      chatPage.sendChatToServer(newChat);

    });


    // $('.chats').on('click','.delete',function (event) {
    $('.chatBox').on('click','.delete',function (event) {
      console.log("this is happening - delete chat message");
            var $deleteBtn = $(this);
            var chatID = $deleteBtn.closest('article').data('index');
            chatPage.deleteChat(chatID,$deleteBtn);
    });


  },

  createNewChat: function(event){
    event.preventDefault();
    var newChat = {
      userName: chatPage.currentUser,
      //img: $('input[name="image"]').val(),
      msg: $('input[name="msg"]').val()
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
        chatPage.grabChatFromServer();
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
    var chatsHTML = "";
    _.each(data.reverse(), function (currVal, idx, arr) {
      if (currVal.userName === chatPage.currentUser){
        var chatsTemplateCurrUser = _.template($('#chatTmplCurrUser').html());
        chatsHTML += chatsTemplateCurrUser(currVal);
      } else {
        var chatsTemplate = _.template($('#chatTmpl').html());
        chatsHTML += chatsTemplate(currVal);

  }
});
$('.chatBox').html(chatsHTML);
  },


  url: "https://tiny-tiny.herokuapp.com/collections/perlman/",
  currentUser: "",
  deleteChat: function(chatID, $button) {
    $.ajax({
      method: 'DELETE',
      url: chatPage.url + chatID,
      success: function(data) {
        console.log("DELETED", data);
        $($button).closest('article').remove();
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
