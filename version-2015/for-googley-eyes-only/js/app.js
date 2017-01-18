$(function() {

  viewSize();

  $('.next-btn').click(function() {
    if ($article.hasClass('step0')) { step1(); }
    else if ($article.hasClass('step1')) { step2(); }
    else if ($article.hasClass('step2')) { step3(); }
    else { step0(); }
  });

  $(document).keydown(function(e){
      if (e.keyCode == 37) {
         if ($article.hasClass('step0')) { step3(); }
         else if ($article.hasClass('step3')) { step2(); }
         else if ($article.hasClass('step2')) { step1(); }
         else { step0(); }
      }
  });

  $(document).keydown(function(e){
      if (e.keyCode == 39) {
         $('.next-btn').click();
      }
  });

  $menuItem.click(function() {
    var $this = $(this),
        newStep = $this.data('step');

    $this.addClass('active').siblings().removeClass('active');
    $('article').removeClass().addClass(newStep);
  });

  $('.project-target').click(function() {
    var $this = $(this);
    if ($this.hasClass('target1')) { $('.project1').addClass('unmasked').siblings().not('h1').hide(); }
    else if ($this.hasClass('target2')) {
      $('.project2').addClass('unmasked').siblings().not('h1').hide();
      //$('.project2 .graphic').css('background-image','url(../img/project2b.gif)');
    }
    else if ($this.hasClass('target3')) { $('.project3').addClass('unmasked').siblings().not('h1').hide(); }
  });

  $('.close-project').click(function() {
    $(this).parent().parent().parent().removeClass('unmasked');
    $('.plate3 .content-container').children().show(200);
    //$('.project2 .graphic').css('background-image','url(../img/project2b.jpg)');
    return false;
  });

}); //END.Ready



var $article = $('article'),
    $menuItem = $('.menu ul li');

function step0() {
  $article.removeClass().addClass('step0');
  $menuItem.removeClass().filter(':nth-child(1)').addClass('active');
}

function step1() {
  $article.removeClass().addClass('step1');
  $menuItem.removeClass().filter(':nth-child(2)').addClass('active');
}

function step2() {
  $article.removeClass().addClass('step2');
  $menuItem.removeClass().filter(':nth-child(3)').addClass('active');
}

function step3() {
  $article.removeClass().addClass('step3');
  $menuItem.removeClass().filter(':nth-child(4)').addClass('active');
}



function viewSize() {
  var $viewport = $('.viewport'),
      viewWidth = $viewport.width(),
      viewHeight = $viewport.height();
  $('section').width(viewWidth).height(viewHeight);
}

$(window).resize(function() {
  viewSize();
});
