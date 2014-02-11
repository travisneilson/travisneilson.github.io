// @codekit-prepend  "_vendor/modernizr-2.6.2-respond-1.1.0.min.js", "_vendor/jquery-1.9.1.min.js", "_vendor/jquery.masonry.min.js", "_vendor/jribbble.js", "_vendor/jquery.cookie.js", "_vendor/jquery.instagram.js", "_vendor/jquery.rss.js";


// js not used yet -> pinterest-rss.js

$(function() {

	
	// Deep Linking
	if(window.location.hash.toLowerCase() === "#articles") { clickedArticles(); }
	if(window.location.hash.toLowerCase() === "#work") { clickedWork(); }
	if(window.location.hash.toLowerCase() === "#photos") { clickedPhotos(); }
	if(window.location.hash.toLowerCase() === "#about") { clickedAbout(); }
	
	
	
	
	if($('body').hasClass('home')) {
    $('.loop-wrap').masonry({ itemSelector: '.unit', columnWidth: 251 });
    
    var arrHome = 2;
    
    $('.articles-link').click(function() {
      clickedArticles();
      return false;
    });
    
    function clickedArticles() {
      arrHome = 2;
      $('.icon-caret-left').css('top', arrHome + 'px' );
      $('.articles-link').parent().addClass('active').siblings().removeClass('active');
      $('.home-wrap > div').fadeOut('fast').filter('.loop-wrap').fadeIn('fast').masonry( 'reload' );
      window.location = '#articles';
      return false;
    }
    
    
    $('.work-link').click(function() {
      clickedWork();
      return false;
    });
    
    function clickedWork() {
      arrHome = 31;
      $('.icon-caret-left').css('top', arrHome + 'px' );
      $('.work-link').parent().addClass('active').siblings().removeClass('active');
      $('.work-wrap .projects, .work-wrap .shots').empty();
      showWork();
      $('.home-wrap > div').fadeOut('fast').filter('.work-positioner').fadeIn('fast');
      window.location = '#work';
    }
    
    
    
    $('.photos-link').click(function() {
      clickedPhotos();
      return false;
    });
    
    function clickedPhotos() {
      arrHome = 60;
      $('.icon-caret-left').css('top', arrHome + 'px' );
      $('.photos-link').parent().addClass('active').siblings().removeClass('active');
      $('.home-wrap > div').fadeOut('fast').filter('.instagram').fadeIn('fast');
      window.location = '#photos';
    }
    
    
    
    $('.about-link').click(function() {
      clickedAbout();
      return false;
    });
    
    function clickedAbout() {
      arrHome = 60;
      $('.icon-caret-left').css('top', arrHome + 'px' );
      $('.about-link').parent().addClass('active').siblings().removeClass('active');
      $('.home-wrap > div').fadeOut('fast').filter('.about-wrap').fadeIn('fast');
      window.location = '#about';
      return false;
    }
    
    
    
    function showWork() {
      /* First, Behance RSS */
      $(".behance.work-wrap .projects").rss("http://www.behance.net/travisneilson.xml", {
          limit: 12,
          ssl: true,
          layoutTemplate: '<div class="project-wrap">{entries}</div>',
          entryTemplate: '<a class="work-unit" href="{url}" target="_blank"><img src="{teaserImageUrl}" />' +
                         '<p>{title}</p><span>view this project on behance.com</span></a>',
          outputMode: 'json_xml'
        });
      
      /* now, Dribbble API */
      var shotpage = 0;
      dribbble();
      
      function dribbble(){
        shotpage ++;
        $.jribbble.getShotsByPlayerId('travisneilson', function(playerShots) {
          for (idx in playerShots.shots){
            var shot = playerShots.shots[idx];
            img = document.createElement('img');
            img.src = shot.image_teaser_url;
            link = document.createElement('a');
            link.href = shot.url;
            $(link).append(img).append('<p>' + shot.title + '</p><span>view this shot on dribbble.com</span>');
            $('.shots').append(link);  
          }
           //run again if not empty
          if (playerShots.shots.length) dribbble();    
        }, {page: shotpage});
        $('.shots a').attr('target', '_blank').addClass('work-unit');
      }
    }
    
    
    
    // Mailinglist in the sidebar junk
    
    $('.mailinglist-small input').focus(function() {
      $('.mailinglist-small').addClass('focused');
    });
    
    $('.mailinglist-small input').blur(function() {
      $('.mailinglist-small').removeClass('focused');
    });
    
    $(".mailinglist-small input").keyup(function() {
      var box=$(this).val();
      var main = box.length *100;
      var value= (main / 145);
      var count= 145 - box.length;
    
      if(box.length >= 14) {
        $('.mailinglist-small').addClass('hide-face');
      } else {
        $('.mailinglist-small').removeClass('hide-face');
      }
      return false;
    });
    
  }//END.hasClass('home');
  
  
  // Cookie mailing list
  var seen = $.cookie('seen');
  	
  	if (seen===null && $('body').hasClass('home')){
  	  $.cookie('seen', 'step1', { expires: 120, path: '/' });
  	  console.log('home origin');
  	}
  	
  	if (seen==="step1" && $('body').hasClass('post')){
  	  $.cookie('seen', 'step2', { expires: 120, path: '/' });
  	  console.log('home > single'); 
  	}
  	
  	if (seen==="step2" && $('body').hasClass('home')){
  	  $('.mailinglist-overlay').removeClass('hide');
  	  console.log('home > single > home');
    }
  
  	
  	$('.mailinglist-close span, #mc-embedded-subscribe').click(function() {
  	  $('.mailinglist-overlay').fadeOut('fast');
  	  $.cookie('seen', 'complete', { expires: 120, path: '/' });
  	});
  
  
}); //end.ready



























