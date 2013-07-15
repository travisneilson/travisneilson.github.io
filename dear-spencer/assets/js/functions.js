// @codekit-prepend "jquery-1.9.1.min.js";

$(function() {
  
  $('article h1, article h2, article h3').each(function() {
    var $this = $(this),
        yOffset = parseInt($this.position().top) + 'px',
        label = $this.html(),
        tag = $this[0].tagName,
        html = '<span data-offset="'+yOffset+'"'+
               'class="'+tag+'"'+
               '>'+label+'</span>';
    
    $('.page-article nav').append(html);
    
  });
  
  
  $('.page-article nav span').click(function() {
    $this = $(this),
    getOffset = $this.data('offset');
    
    console.log(getOffset);
    
    $('body,html').animate({scrollTop: getOffset}, 200);
  });
  
}); // END Ready