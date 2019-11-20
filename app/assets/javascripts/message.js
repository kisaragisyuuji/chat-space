$(function(){
    function buildHTML(message){
        var messageImage = (message.image !== null) ? `<img class ="image_size", src="${message.image}">` : ""
        
        var html = `
          <p class = "upper-user-name">
            ${message.user_name}
          </p>
          <p class = "created-at">
            ${message.date}
          </p>
          <p class = "upper-content">
            ${message.content}
          </p>
          <p class = "user-image">
            ${messageImage}
          </p>`
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
});