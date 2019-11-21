$(function() {
  // 一致する奴がいる場合
  function addUser(user) {
    var html = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">${user.name}</p>
        <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
      </div>
    `;
    // HTMLを送る（作成した
    $("#user-search-result").append(html);
  }
  // 一致する奴いない場合
  function addNoUser() {
    var html = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">ユーザーが見つかりません</p>
      </div>
    `;
    $("#user-search-result").append(html);
  }
  // 削除ボタン押したときの処理よ
  function addDeleteUser(name, id) {
    var html = `
    <div class="chat-group-user clearfix" id="${id}">
      <p class="chat-group-user__name">${name}</p>
      <div class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn" data-user-id="${id}" data-user-name="${name}">削除</div>
    </div>`;
    // 作成されたHTMLぶち込むよ
    $(".js-add-user").append(html);
  }
  function addMember(userId) {
    // userのidをinputタグの初期値にし、name使ってgroupコントロらのraramsで受け取る用意
    var html = `<input value="${userId}" name="group[user_ids][]" type="hidden" id="group_user_ids_${userId}" />`;
    // 作ったinputをデリートで作ったhtmlにbuち込むぜ
    $(`#${userId}`).append(html);
  }
  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    $.ajax({
      type: "GET",
      url: "/users",
      data: { keyword: input},
      dataType: "json"
    })
    // JBファイルの配列を引数にdone
      .done(function(users) {
        // 検索の情報消す
        $("#user-search-result").empty();
        // 検索に一致するやついる場合
        if (users.length !== 0) {
          // users配列、foreachで分解してaddUserに送る
          users.forEach(function(user) {
            addUser(user);
          });
          // 文字入力ない場合終了よ
        } else if (input.length == 0) {
          return false;
          // 検索に一致するやついない場合addNOに送るよ
        } else {
          addNoUser();
        }
      })
      // エラーのとき
      .fail(function() {
        alert("通信エラーです。ユーザーが表示できません。");
      });
    });
    // 追加ボタンクリックイベント
    $(document).on("click", ".chat-group-user__btn--add", function() {
      console.log
      // クリックされたHTMLのデータは代入するわ
      const userName = $(this).attr("data-user-name");
      const userId = $(this).attr("data-user-id");
      // クリックの親要素消して、検索結果から消す
      $(this)
        .parent()
        .remove();
        // 削除ボタンのHTML呼び出しにとばす
      addDeleteUser(userName, userId);
      // ユーザーをグループに登録処理
      addMember(userId);
    });
    // チャットメンバー削除
    $(document).on("click", ".chat-group-user__btn--remove", function() {
      // 親要素ごと検索結果から消す
      $(this)
        .parent()
        .remove();
    });
});
