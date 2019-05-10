$(document).on('turbolinks:load', function() {
  function buildHTML(message){
    var img = ""
    if (message.image.url != null) {
      img = `<img src="${message.image.url}">`
    }
    var html = `<div class="message">
                  <div class="upper-info">
                    <p class="upper-info__user">
                       ${message.user_name}
                    </p>
                    <p class="upper-info__date">
                       ${message.strftime} 
                    </p>
                  </div>
                  <div class="lower-info">
                    <p class="message__text">
                      ${message.content}
                      ${ img }
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
      var html = buildHTML(message);
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
});
