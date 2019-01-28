$(document).ready(function () {


  $(".saveArticle").on("click", function () {
    let id = $(this).parents("li").data("article-id");
    console.log(id);
    $.ajax({
      method: "PUT",
      url: `/api/articles/${id}`,
      data: {
        saved: true
      }
    }).then(function (response) {
      location.reload();
    });
  });

  $(".deleteArticle").on("click", function () {
    const id = $(this).parents("li").data("article-id");
    console.log(id);
    $.ajax({
      method: "DELETE",
      url: `/api/articles/${id}`
    }).then(function (response) {
      console.log(response);
      location.reload();
    });
  });

  $(".editNote").on("click", function () {
    $(this).siblings("form").show();
    $(this).hide();
  });

  $(".editForm").on("submit", function (event) {
    event.preventDefault();
    const id = $(this).data("note-id");
    const text = $(this).children("input").val().trim();
    $.ajax({
      method: "PUT",
      url: `/api/notes/${id}`,
      data: { text }
    }).then(function (response) {
      location.reload();
    });

  });

  $(".addForm").on("submit", function (event) {
    event.preventDefault();
    const articleId = $(this).data("article-id");
    const text = $(this).children("input").val().trim();

    $.ajax({
      method: "POST",
      url: "/api/notes",
      data: {
        articleId,
        text
      }
    }).then(function (response) {
      location.reload();
    })
  })

});
// $(".clear")