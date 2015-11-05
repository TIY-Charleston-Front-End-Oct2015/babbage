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
        $('#loggedInAs').html(chatPage.currentUser);
        chatPage.grabChatFromServer();
      });
    //Submitting form functionality
    $('#chatMessage').on('submit', chatPage.createNewChat);


    // $('.chats').on('click','.delete',function (event) {
    $('.chatBox').on('click','.delete',function (event) {
      console.log("this is happening - delete chat message");
            var $deleteBtn = $(this);
            var chatID = $deleteBtn.closest('article').data('index');
            chatPage.deleteChat(chatID,$deleteBtn);
    });

    $('header').on('dblclick','#loggedInAs', function(){
      $(this).toggleClass('invisible');
      $(this).siblings('form').toggleClass('invisible');
      $('input[name="edittodo"]').val(chatPage.currentUser);
    });
    $('header').on('submit', '.edit-form', function(event){
      event.preventDefault();
      var oldName = chatPage.currentUser;
      console.log(oldName);
      chatPage.currentUser = $('input[name="edittodo"]').val();
      $(this).toggleClass('invisible');
      $(this).siblings('span').toggleClass('invisible');
      $('#loggedInAs').html(chatPage.currentUser);
      var newName = chatPage.currentUser;
      console.log(newName);
      $.ajax({
        type: 'GET',
        url: chatPage.url,
        success: function(data) {
          chatPage.currentServerData = data;
          chatPage.editUserEverywhere(oldName,newName);
        },
        failure: function(data) {
          console.log("FAILURE: ", data);
        }
      });

    });
  },

  createNewChat: function(event){
    event.preventDefault();
    var message = "";
    if ($('input[name="msg"]').val() === ""){
      message = "Bro!";
    }
    else if($('input[name="msg"]').val() === "sb"){
      message = "Sup, Bro?!";
    }
    else{
      message = $('input[name="msg"]').val();
    }
    var newChat = {
      userName: chatPage.currentUser,
      //img: $('input[name="image"]').val(),
      msg: message
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
  editUserEverywhere: function(oldName, newName){
    _.each(chatPage.currentServerData, function(currVal, idx, arr){
        if(currVal.userName === oldName){
          var editedChat = {
            _id: currVal._id,
            userName: newName,
            msg: currVal.msg
          };
          $.ajax({
            type: 'PUT',
            url: chatPage.url + currVal._id,
            data: editedChat,
            async: false,
            success: function(resp){
              console.log("Success");
            },
            failure: function(resp){
              console.log("Failure");
            }
          });
        }

    });
    chatPage.grabChatFromServer();
 },
 currentServerData : [],
};
