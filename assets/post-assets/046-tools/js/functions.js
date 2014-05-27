$(function() {

});


$(window).scroll(function() {

    slidingHead();
    
});


function slidingHead() {
  windowScroll = $(this).scrollTop();
  $('.bunny > div').css({
    'top' : "-" + windowScroll + "px",
    'left' : "-" + windowScroll + "px",
    'right' : "-" + windowScroll + "px"
  });
}