$(document).ready(function() {


  $(".scrape-btn").on("click", function() {
      $.get("/api/articles/scrape").then(function(data) {
          console.log(data.length);
          $("#modal-text").text( `${data}`);
          showModal();
      })
  });

  $(".save-article").on("click", function() {
      var id = $(this).parents("li").data("article-id");
      console.log("save article clicked." + id);

      $.ajax({
          method: "PUT",
          url: `/api/articles/${id}`,
          data: { saved: true }
      }).then(function(data) {
          location.reload();
      });
  });

  $(".add-form").on("submit", function(event) {
      event.preventDefault();
      var text = $(this).children("input").val().trim();
      console.log(text);
      var articleId = $(this).data("article-id");

      $.ajax({
          method: "POST",
          url: `/api/notes/`,
          data: { 
              text,
              articleId
          }
      }).then(function(data) {
          location.reload();
      });
  });

  $(".edit-form").on("submit", function(event) {
      event.preventDefault();
      var text = $(this).children("input").val().trim();
      var id = $(this).data("note-id");
      $.ajax({
          method: "PUT",
          url: `/api/notes/${id}`,
          data: {
              text
          }
      }).then(function(data) {
          location.reload();
      });
  });

  $(".delete-note").on("click", function() {
      var id = $(this).parents("div").siblings("div").children("div.a-summary").data("note-id");
      $.ajax({
          method: "DELETE",
          url: `/api/notes/${id}`
      }).then(function(data) {
          location.reload();
      });
  });

  $(".add-note").on("click", function() {
      $(".add-modal").css("display", "block");
      var id = $(this).parents("div").parents("li").data("article-id");
      console.log(id);
      $(".add-form").attr("data-article-id", id);

      $("window").on("click", function() {
          $(".add-modal").style.display = "none";
      })
  });

  $(".edit-note").on("click", function() {
      $(".edit-modal").css("display", "block");
      var id = $(this).parents("div").siblings("div.a-content").children("div.a-summary").data("note-id");
      $(".edit-form").attr("data-note-id", id);

      $("window").on("click", function() {
          $(".edit-modal").style.display = "none";
      })
  });

  $(".delete-article").on("click", function () {
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

  $(".clear-btn").on("click", function() {
    $.get("/api/articles/clear").then(function(data) {
      
      $("#modal-text").text("You successfully cleared all articles!");
      showModal();
      location.reload();
  })


      $.ajax({
          method: "DELETE",
          url: `/api/clear`
      }).then(function(data) {
          location.reload();
      });
  });

  function showModal() {
      $(".modal").css("display", "block");

      $("window").on("click", function() {
          $(".modal").style.display = "none";
      });
  }

  $(".close").on("click", function() {
      $(".modal").css("display", "none");
  });
});