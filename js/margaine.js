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

