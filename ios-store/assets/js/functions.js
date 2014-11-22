$( document ).ready(function() {

  $('.m-scooch').scooch();
  
  revealOverlay();
  descMore();

});



function revealOverlay() {
  
  // Open the Overlay
  $('.inset-scooch .m-item').not('.vid').click(function(){
    
    var $this = $(this),
        thisNum = $this.index();
        
    $('.overlay').addClass('revealed')
      .find('.m-scooch').scooch('move', thisNum);

  });
  
  // Close the Overlay
  $('.overlay-header a').click(function(){

    $('.overlay').removeClass('revealed');
    
    return false;

  });
  
}


$( window ).scroll(function(){
  
  var tabsFromTop = $('.tabs-spacer').offset().top+10,
      top = $('body').scrollTop();
  
  if(top > tabsFromTop) {
    
    $('.tabs-fixer').addClass('fixed');
    
  } else {
    
    if($('.tabs-fixer').hasClass('fixed')) {
    
      $('.tabs-fixer').removeClass('fixed');
    }
  }
});


function descMore(){
  
  var $desc = $('.description-text'),
      descHeight = $desc.height();
  
  if(descHeight > 95) {
    $desc.height('95px')
      .append('<span class="desc-more link">...More<span>');
  }
  
  $('.desc-more').click(function(){
    
    $desc.height('auto');
    $(this).remove();
    
  });
  
  
}














