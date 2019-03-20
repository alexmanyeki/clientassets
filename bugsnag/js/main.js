$(document).ready(function() {
  // Post page social Icons, when Clicked pop up a share dialog
  $('.social-icon').on('click', function(){
    var el = $(this);
    var platform = el.data('platform');
    var message = el.data('message');
    var url = el.data('url');

    if (platform == 'mail'){
      // Let mail use default browser behaviour
      return true;
    } else {
      var popUrl, newWindow;

      if( platform == 'twitter'){
        popUrl = 'http://twitter.com/home?status=' + encodeURI(message) + '+' + url;

      } else if(platform == 'facebook'){
        popUrl = 'http://www.facebook.com/share.php?u' + url + '&amp;title=' + encodeURI(message);
      }
      newWindow = window.open(popUrl,'name','height=500,width=600');
      if (window.focus) { newWindow.focus(); }

      return false;
    }
  });

  $('.Post-content').find('img').each(function(){
    $(this).parent().addClass("Post-image");
  });

});
