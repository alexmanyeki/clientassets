$(document).ready(function() {
  $(window).on("scroll resize", function() {
      if ($(this).width() >= 767) {
          var darkMode = function() {
                  $('.logo-dark').css('opacity', '0');
                  $('.logo-light').css('opacity', '1');
                  $('.nav-link.negative').css('color', 'white');
                  $('.menu-button-toggle .hamburger-line').css('background-color', 'white');
              },
              lightMode = function() {
                  $('.logo-dark').css('opacity', '1');
                  $('.logo-light').css('opacity', '0');
                  $('.nav-link.negative').css('color', 'black');
                  $('.menu-button-toggle .hamburger-line').css('background-color', 'black');
              },
              ScrollSpy = function(changed) {

                  var pad = 100;
                  var offsets = [];
                  var targets = [];
                  var activeTarget = null;
                  var changedCallback = changed || $.noop();

                  function init() {
                      $(document.body).find("[data-theme]").map(function() {
                          var $el = $(this);
                          return [
                              [$el.offset().top, $el[0]]
                          ];
                      }).sort(function(a, b) {
                          return a[0] - b[0]
                      }).each(function() {
                          offsets.push(this[0])
                          targets.push(this[1])
                      });
                  }

                  function activate(target) {
                      activeTarget = target;
                      clear();
                      changedCallback.call(target, $(target).data('theme'));
                  }

                  function clear() {
                      $("[data-theme]").removeClass('active_section');
                  }

                  function getScrollHeight() {
                      return window.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
                  }

                  function spy() {
                      var scrollTop = $(window).scrollTop() + pad;
                      var scrollHeight = getScrollHeight();
                      var maxScroll = pad + scrollHeight - $(window).height();

                      if (scrollTop >= maxScroll) {
                          return activeTarget != (i = targets[targets.length - 1]) && activate(i);
                      }

                      if (activeTarget && scrollTop < offsets[0]) {
                          activeTarget = null;
                          return clear();
                      }

                      for (i = offsets.length; i--;) {
                          activeTarget != targets[i] &&
                              scrollTop >= offsets[i] &&
                              (offsets[i + 1] === undefined || scrollTop < offsets[i + 1]) &&
                              activate(targets[i]);
                      }
                  }

                  $(window).scroll(spy);
                  $(window).resize(spy);
                  init();
                  spy();
              };

          $(function($) {
              ScrollSpy(function(theme) {
                  if (theme == 'dark') {
                      darkMode();
                  } else if (theme == 'light') {
                      lightMode();
                  }
              });
          });
      }
  });
});