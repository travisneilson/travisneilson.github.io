$( document ).ready(function() {

  var $nav = $('nav'),
      navTop = $nav.offset().top;

  scrolly($nav, navTop);
  
});



function scrolly($nav, navTop) {

$(window).scroll(function() {
    

    windowScroll = $(this).scrollTop();
      
  if ( windowScroll > navTop) {
  		$nav.addClass('fixed'); 
  } else {
    //$nav.removeClass('fixed'); 
  }
    
    console.log(windowScroll, navTop)
  
  var top = $('body').scrollTop();
  if (top > navTop) {
    $nav.addClass('fixed');
  }
  else {
    if($nav.hasClass('fixed')) {
      $nav.removeClass('fixed'); }
  }
    
});

}