
$(function () {
    $(".feed").feedMe({
        feedUrl: $(".feed").attr('rssurl'),
        feedCount: $(".feed").attr('feedcount')
    });
});

jQuery.fn.feedMe = function () {
    var e = $(this[0]);
    var args = arguments[0] || {};

    $.ajax({
        url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=' + args.feedCount + '&callback=?&q='
        + encodeURIComponent(args.feedUrl),
        dataType: 'json',
        crossDomain: 'false',
        beforeSend: function () {
            $(e).empty()
            .append("<img style=\"clear:both;float:left;padding-left:70px;\" src=\"images/blog-load.gif\" alt=\"loading feeds...\" />");
        },
        error: function () {
            $(e).empty()
            .append("<span style=\"clear:both;float:left;font-size:x-small;padding-left:10px;\">An error occured retrieving feeds.</span>");
        },
        success: function (data) {
            items = data.responseData.feed.entries;
            var html = '';
            for (var i = 0; i < items.length; i++) {
                html += "<div class=\"pin\">" + items[i].content + "</div>";
            }
            $(e).empty().append(html);
            $(".feed img").unwrap();
            $(".pin")
              .contents()
              .filter(function() {
                return this.nodeType == 3; //Node.TEXT_NODE
              }).remove();
            var $container = $('.feed');    
            $container.imagesLoaded( function(){
              $container.masonry({
                itemSelector : '.pin'
              });
            });
        }
    });
}

