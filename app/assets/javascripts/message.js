$(document).on('turbolinks:load', function() {
  var buildMessageHTML = function(message) {

      imageHTML = message.image.url ?  `<img src="${message.image.url}">` : ''

      var html = `<div class="message" data-message-id='${message.id}'>
                    <div class="upper-info">
                      <p class="upper-info__user">
                        ${message.user_name}
                      </p>
                      <p class="upper-info__date">
                        ${message.created_at} 
                      </p>
                    </div>
                    <div class="lower-info">
                      <p class="message__text">
                        ${message.content}
                        ${ imageHTML }
                      </p>
                    </div>
                  </div>`
    return html;
    }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildMessageHTML(message);
      $('.messages').append(html)
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      $('#new_message')[0].reset();
      $('.form__submit').removeAttr('disabled');
    })
    .fail(function(){
      alert('error');
    })
    return false;
  })

  var reloadMessages = function() {
    last_message_id = $('.message:last').data('message-id');
    console.log(last_message_id)
    $.ajax({
      url: '/groups/:group_id/api/messages',
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      var insertHTML = '';
      messages.forEach(function(message){
        insertHTML = buildMessageHTML(message);
        $('.messages').append(insertHTML)
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      });
    })
    .fail(function(){
      console.log('error');
    })
  };
  var url = location.href
  if ( url == "http://localhost:3000/groups/:group_id/api/messages") {
    setInterval(reloadMessages, 5000);
  }  
});
