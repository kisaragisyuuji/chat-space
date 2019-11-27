$(function(){
    function buildHTML(message){
        var messageImage = (message.image !== null) ? `<img class ="image_size", src="${message.image}">` : ""
         
        var html = `<div class="message" data-message-id="${message.id}">
          <div class ="upper-message">
            <div class = "upper-message__user-name">
              ${message.user_name}
            </div>
            <div class = "upper-message__date">
              ${message.date}
            </div>
          </div>
          <div class = "lower-message">
            <div class = "lower-message__content">
              ${message.content}
            </div>
            <div class = "lower-message__image">
              ${messageImage}
            </div>
          </div>
        </div>`
        return html;
    }
  $('.new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');

    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
      .done(function(message){
        var html = buildHTML(message);
        $('.mainmessage').append(html);
        $('.mainmessage').animate({scrollTop: $('.mainmessage')[0].scrollHeight}, 'fast');
        $('form')[0].reset();
        $('.submit').prop('disabled',false);
      })
      .fail(function(){
        alert('error')
        $('.submit').prop('disabled', false);
      })
  })
    var reloadMessages = function() {
      if (window.location.href.match(/\/groups\/\d+\/messages/)){
        var last_message_id = $('.message:last').data("message-id");
        console.log(last_message_id);
      $.ajax({
        url : "api/messages",
        type: "GET",
        dataType: 'json',
        data: {last_id: last_message_id}
      })
      .done(function(messages) {
        var insertHTML = '';
          messages.forEach(function (message){
            insertHTML = buildHTML(message);
            $('.mainmessage').append(insertHTML);
            $('.mainmessage').animate({scrollTop: $('.mainmessage')[0].scrollHeight}, 'fast');
          console.log("成功");
        })
      })
      .fail(function() {
        alert('自動更新に失敗しました');
        console.log("失敗");
      });
    }

  };
setInterval(reloadMessages, 7000);
console.log("７秒");
});