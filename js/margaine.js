(function($) {
  /**
   * Scripts spécifiques à margaine.com
   */
  // Back to top link
  $(window).scroll(function() {
    if($(this).scrollTop() != 0) {
      $('#toTop').fadeIn();	
    } else {
      $('#toTop').fadeOut();
    }
  });

  $('#toTop').click(function() {
    $('body,html').animate({scrollTop:0},800);
  });
}(jQuery));

(function($) {
  $(".container").hide();
  $("#resume .box").click(function() {
  var id = $(this).attr("id");
  $(".box").slideUp("slow", function() {
    $("#" + id + "-container").slideDown("slow");
  });
  var closeButton = $("<img />")
    .addClass("closing-button")
    .attr({
      src: "/sites/default/files/resume/back-arrow.svg",
      alt: "Bouton de fermeture",
      title: "Bouton de fermeture",
      width: "128",
      height: "128"
    })
    .css({
      "cursor": "pointer",
      "float": "left",
    })
    .click(function() {
      $(".closing-button").slideUp("slow", function() {
        $(this).remove();
      });
      $("#" + id + "-container").slideUp("slow", function() {
        $(".box").slideDown("slow");
      });
    });
    $("#" + id + "-container")
      .prepend(closeButton)
    $(".closing-button")
      .hide()
      .slideDown();
    });
    $(".content .box-image").css({
      "border": "1px solid",
      "border-radius": "10px",
      "margin": "1em",
      "text-align": "center",
      "padding": "1em",
      "box-shadow": "5px 5px #bbb",
    });
    $(".content .box").css({
      "float": "left",
      "cursor": "pointer",
      "width": "25%",
    });
    $(".content .resume-text").css({
      "font-weight": "lighter",
      "text-align": "center",
      "display": "block",
    });
    $(".content .container h2").css("margin-top", "0.2em");
    $(".content #etat-civil p").css("margin", "0");
    $(".content #etat-civil").css({
      "text-align": "center",
      "border": "1px solid",
      "box-shadow": "5px 5px #bbb",
      "width": "50%",
      "margin-left": "25%",
      "padding-bottom": "1em",
      "border-radius": "10px",
      "background": "url(http://www.florianmargaine.com/sites/default/files/resume/me96x128.png) no-repeat"
    });
    $("#vcard").css({
      "text-align": "right",
      "margin-right": "1em"
    });
    $(".content #en-construction").css({
      "text-align": "center",
      "margin": "50px",
      "font-weight": "bold",
    });
    $(".content .container").css({
      "border": "1px solid",
      "border-radius": "5px",
      "box-shadow": "10px 10px #bbb",
      "width": "98%",
      "margin-top": "1em",
    });
    $(".content .container h2").css("margin-left", "1em");
    $(".content .container h3").css("margin-left", "3em");
    $(".content .container h4").css("margin-left", "5em");
    $(".content .container p").css("margin-left", "3em");
    
    var skills = [
    {
      "skill": "Informatique",
      "title": "yes",
    },
    {
      "skill": "&nbsp;&nbsp;Gestion de projet",
      "title": "yes",
    },
    {
      "skill": "&nbsp;&nbsp;&nbsp;&nbsp;Méthodes",
      "title": "yes",
    },
    {
      "skill": "PMI (Project Management Institute)",
      "level": "6",
    },
    {
      "skill": "Scrum",
      "level": "3",
    },
    {
      "skill": "CMMi",
      "level": "2",
    },
  ];
  $.each(skills, function(index, value) {
    var style = {};
    if (value.title == "yes") {
      style.weight = "bold";
      var levelButtons = $("<tr></tr>")
        .css("font-weight", style.weight)
        .append(
          $("<td></td>")
            .html(value.skill)
            .css("width", "30%")
        );
    }
    else {
      style.weight = "lighter";
      var levelButtons = $("<tr></tr>")
        .css("font-weight", style.weight)
        .append(
          $("<td></td>").text(value.skill)
        );
        for (var i = 0; i < 6; i++) {
          var txtColor;
          if (i < parseInt(value.level)) {
            txtColor = "#52D017";
          }
          else {
            txtColor = "black";
          }
          levelButtons.append(
            $("<td></td>")
              .css({
                "color": txtColor,
                "text-align": "center",
              })
              .attr("class", "competences-level")
              .html("&diams;")
          );
        }
    }
    $("#competences-container-tbody").append(levelButtons);
  });
  $("#competences-container thead th").css("text-align", "center");
}(jQuery));

