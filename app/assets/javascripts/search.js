$(function(){

var search_list = $("#user-search-result");

var chat_group = $("#chat-group-users");

function appendUser(user) {
  var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.user_name}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.user_id}" data-user-name="${user.user_name}">追加</a>
              </div>`
  search_list.append(html);
}

function appendErrMsgToHTML(msg) {
  var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">一致するユーザーは見つかりません</p>
              </div>`
  search_list.append(html);
}

function appendChatMember(user_name, user_id) {
  var html = `<div class='chat-group-user clearfix js-chat-member' id='${user_id}'>
                <input name='group[user_ids][]' type='hidden' value='${user_id}'>
                <p class='chat-group-user__name'>${user_name}</p>
                <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
              </div>`
  chat_group.append(html);
}

  $("#user-search-field").on("keyup", function(){
    var input = $("#user-search-field").val();

    $.ajax({
      type: 'GET',
      url: '/users/search',
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(users) {
      $("#user-search-result").empty();
      if (input.length !== 0) {
        users.forEach(function(user){
          appendUser(user);
        });
        if (users.length === 0) {
          appendErrMsgToHTML("一致するユーザーが見つかりません");
        }
      }
    })
    .fail(function() {
      alert('ユーザー検索に失敗しました');
    })
  });
  $(function() {
    $(document).on('click', '.user-search-add' , function() {
      $("#user-search-result").remove();
      var user_name = $(this).data('user-name');
      var user_id = $(this).data('user-id');
      appendChatMember(user_name, user_id);
    });
  });
  $(function() {
    $(document).on('click', '.user-search-remove' , function() {
      var parent = $(this).parent();
      var siblings = $(this).siblings();
      $(this).remove();
      parent.remove();
      siblings.remove();
    });
  });
});


