$(function () {

  $('section').bind('inview', function (event, visible) {
    if (visible) {
      $(this).addClass('inview');
    } else {
      $(this).removeClass('inview');
    }
  });

  smoothScroll(500);

});


function smoothScroll (duration) {
	$('a[href^="#"]').click(function(event) {

	    var target = $( $(this).attr('href') );

	    if( target.length ) {

	        event.preventDefault();
	        $('html, body').animate({
	            scrollTop: target.offset().top
	        }, duration);
	    }
	});
}

$(window).scroll(function(){
  var wScroll = $(this).scrollTop();

  if($('.section-1').hasClass('inview')){
    var $section = $('.section-1');
    $section.find('.title,').css({
      'transform' : 'translate(0px, '+ wScroll / 10 +'%)'
    });
  }

  if($('.section-2').hasClass('inview')){
    var $section = $('.section-2'),
        offset2 = $section.offset().top,
        equasion = Math.abs((wScroll - (offset2 * 2)) / 20);

    $section.find('.title,').css({
      'transform' : 'translate(0px, '+ equasion +'%)'
    });
  }

  if($('.section-3').hasClass('inview')){
    var $section = $('.section-3'),
        offset3 = $section.offset().top,
        equasion = Math.abs((wScroll - (offset3 * 2)) / 35);

    $section.find('.title').css({
      'transform' : 'translate(0px, '+ equasion +'%)'
    });
  }


  if($('.section-4').hasClass('inview')){
    var $section = $('.section-4'),
        offset3 = $section.offset().top,
        equasion = Math.abs((wScroll - (offset3 * 2)) / 20);

    $section.find('.title').css({
      'transform' : 'translate(0px, '+ equasion +'%)'
    });
  }

  if($('.section-5').hasClass('inview')){
    var $section = $('.section-5'),
        offset3 = $section.offset().top,

        equasion = Math.abs((wScroll - (offset3 * 2)) / 20);

    $section.find('.title').css({
      'transform' : 'translate(0px, -'+ equasion +'%)'
    });
  }


});





/**
 * Plugin: element in view
 * author Remy Sharp
 * url http://remysharp.com/2009/01/26/element-in-view-event-plugin/
 */
(function ($) {
    function getViewportHeight() {
        var height = window.innerHeight; // Safari, Opera
        var mode = document.compatMode;

        if ( (mode || !$.support.boxModel) ) { // IE, Gecko
            height = (mode == 'CSS1Compat') ?
            document.documentElement.clientHeight : // Standards
            document.body.clientHeight; // Quirks
        }

        return height;
    }

    $(window).scroll(function () {
        var vpH = getViewportHeight(),
            scrolltop = (document.documentElement.scrollTop ?
                document.documentElement.scrollTop :
                document.body.scrollTop),
            elems = [];

        // naughty, but this is how it knows which elements to check for
        $.each($.cache, function () {
            if (this.events && this.events.inview) {
                elems.push(this.handle.elem);
            }
        });

        if (elems.length) {
            $(elems).each(function () {
                var $el = $(this),
                    top = $el.offset().top,
                    height = $el.height(),
                    inview = $el.data('inview') || false;

                if (scrolltop > (top + height) || scrolltop + vpH < top) {
                    if (inview) {
                        $el.data('inview', false);
                        $el.trigger('inview', [ false ]);
                    }
                } else if (scrolltop < (top + height)) {
                    if (!inview) {
                        $el.data('inview', true);
                        $el.trigger('inview', [ true ]);
                    }
                }
            });
        }
    });

    // kick the event to pick up any elements already in view.
    // note however, this only works if the plugin is included after the elements are bound to 'inview'
    $(function () {
        $(window).scroll();
    });
})(jQuery);
