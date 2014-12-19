$(function() {
  
  $('.poem-target').click(function() {
    return false;
  });
  
});


$(window).scroll(function() {

  var windowScroll = $(this).scrollTop();
  
  $('.bunny > div').css({
    'top' : "-" + windowScroll + "px",
    'left' : "-" + windowScroll + "px",
    'right' : "-" + windowScroll + "px"
  });
    
});



  
