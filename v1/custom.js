//===================================
//Vimeo Video API
//===================================

window._chatlio = window._chatlio||[];
!function(){ var t=document.getElementById("chatlio-widget-embed");if(t&&window.ChatlioReact&&_chatlio.init)return void _chatlio.init(t,ChatlioReact);for(var e=function(t){return function(){_chatlio.push([t].concat(arguments)) }},i=["configure","identify","track","show","hide","isShown","isOnline", "page"],a=0;a<i.length;a++)_chatlio[i[a]]||(_chatlio[i[a]]=e(i[a]));var n=document.createElement("script"),c=document.getElementsByTagName("script")[0];n.id="chatlio-widget-embed",n.src="https://w.chatlio.com/w.chatlio-widget.js",n.async=!0,n.setAttribute("data-embed-version","2.2");
n.setAttribute('data-widget-options', '{"embedInline": true}');
n.setAttribute('data-widget-id','5c828c61-935b-4e2a-55d7-8ae21decc52f');
c.parentNode.insertBefore(n,c);
}();


//====================================
//Declare Webflow IX for all functions that require it
//====================================

var ix = Webflow.require('ix');


//====================================
//Start Document Ready
//====================================

$(document).ready(function () {
    var nC = $('.choice-neutral');
    var aC = $('.choice-a');
    var bC = $('.choice-b');
    var aTrigger = $('[name="ChoiceA"]');
    var bTrigger = $('[name="ChoiceB"]');

    $(nC).show(); $(aC).hide(); $(bC).hide();
    $(aTrigger,bTrigger).prop('checked', false);

    $(aTrigger).change(function() {
    if($(this).is(":checked")) {
      $(nC).hide(); $(aC).show(); $(bC).hide();
      $(bTrigger).prop('checked', false);
      $(this).parent().css('background-color','#29339b');
      $('.choice-b-trigger').css('background-color','rgba(255, 58, 32, 0.7)');
    } else {
      $(nC).show(); $(aC).hide(); $(bC).hide();
      $(this).parent().css('background-color','rgba(41, 51, 155, 0.7)');
    }
    });

    $(bTrigger).change(function() {
    if($(this).is(":checked")) {
      $(nC).hide(); $(aC).hide(); $(bC).show();
      $(aTrigger).prop('checked', false);
      $(this).parent().css('background-color','#ff3a20');
      $('.choice-a-trigger').css('background-color','rgba(41, 51, 155, 0.7)');
    } else {
      $(nC).show(); $(aC).hide(); $(bC).hide();
      $(this).parent().css('background-color','rgba(255, 58, 32, 0.7)');
    }
    });

    var secNav = $('.progress-bar-wrapper');
    var showSecNav = {"type":"load","stepsA":[{"display":"block"},{"wait":"1ms"},{"opacity":1,"transition":"opacity 350ms ease 0"}],"stepsB":[]};
    var hideSecNav = {"type":"load","stepsA":[{"opacity":0,"transition":"opacity 100ms ease 0"},{"wait":"1ms"},{"display":"none"}],"stepsB":[]};
    var winH = $(window).height(); // Get the window height.
//    var winH2 = ($(window).height() * 1.005 );

    $(window).scroll(function () {
        if ($(this).scrollTop() >= winH) {
            ix.run(showSecNav, secNav);
        } else {
            ix.run(hideSecNav, secNav);
        }
    }).resize(function () { // If the user resizes the window
        winH = $(this).height(); // get the new height value
    });

    $('.choice-triggers').each(function () {
        $(this).click(function () {
            $('html, body').scrollTop($(this).closest('.edition-choice-block').offset().top - 30);
        });
    });

    $('.scroll-prompt').click(function(){
        $("html, body").animate({ scrollTop: $(window).height()}, 600);
        return false;
    });

    $(window).scroll(function() {

        var $scrollPrompt = $('.scroll-prompt');
        var $logo = $('#navHome,.sections-nav');

        var elementHide = {"type":"scroll","stepsA":[{"opacity":0,"transition":"opacity 200 ease 0"},{"wait":"1ms"},{"display":"none"}],"stepsB":[]};
        var elementShow = {"type":"scroll","stepsA":[{"display":"block"},{"wait":"1ms"},{"opacity":1,"transition":"opacity 200 ease 0"}],"stepsB":[]};

        //Hide Arrow Down on Scrolling 30px Using Webflow's Native IX
        if ($(this).scrollTop() >= 30) {
            ix.run(elementHide, $scrollPrompt);
        } else {
            ix.run(elementShow, $scrollPrompt);
        }
        //Show or hide home logo on scroll
        if ($(this).scrollTop() >= (winH / 3.5)) {
            ix.run(elementShow, $logo);
        } else {
            ix.run(elementHide, $logo);
        }
    });
  
    
    $("div.progress-bar-title").text(function (index, currentText) {
        return currentText.substr(0, 70) + '...';
    });
    
    $(window).resize(function () {
        if ($(window).width() <= 991) {
            $('.addthis_button_twitter').attr({
                href: "https://twitter.com/intent/tweet?",
                target: "_blank",
                onclick: "window.open('https://twitter.com/intent/tweet?text=%20Check%20up%20this%20awesome%20content' + encodeURIComponent(document.title) + ':%20 ' + encodeURIComponent(document.URL)); return false;"
            });
            
            $('.addthis_button_facebook').attr({
                href: "https://www.facebook.com/sharer/sharer.php?u=&t=",
                target: "_blank",
                onclick: "window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(document.URL) + '&t=' + encodeURIComponent(document.URL)); return false;"
            });
            
            $('.addthis_button_email').attr({
                href: "mailto:?subject=&body=:%20",
                target: "_blank",
                onclick: "window.open('mailto:?subject=' + encodeURIComponent(document.title) + '&body=' + encodeURIComponent(document.URL)); return false;"
            });
            
            $('.addthis_button_more').hide();
        } else {
            $('.addthis_toolbox a').attr({
                href: "#",
                target: "",
                onclick: ""
            });
            $('.addthis_button_more').show();
        }
    });

});

//====================================
//End Document Ready
//====================================

$(window).load(function(){
  $(window).scroll(function() {
    var docheight = $('.edition-content').height(),
    winheight = $(window).height(),
    wintop = $(window).scrollTop() - winheight;
    var totalScroll = (wintop/(docheight-winheight))*100;
    $(".progress-bar").css("width",totalScroll+"%");
  });
});



//=============================================================
// Fixed Scroll Dependecies and Functions
//=============================================================


(function(a){a.isScrollToFixed=function(b){return !!a(b).data("ScrollToFixed")};a.ScrollToFixed=function(d,i){var m=this;m.$el=a(d);m.el=d;m.$el.data("ScrollToFixed",m);var c=false;var H=m.$el;var I;var F;var k;var e;var z;var E=0;var r=0;var j=-1;var f=-1;var u=null;var A;var g;function v(){H.trigger("preUnfixed.ScrollToFixed");l();H.trigger("unfixed.ScrollToFixed");f=-1;E=H.offset().top;r=H.offset().left;if(m.options.offsets){r+=(H.offset().left-H.position().left)}if(j==-1){j=r}I=H.css("position");c=true;if(m.options.bottom!=-1){H.trigger("preFixed.ScrollToFixed");x();H.trigger("fixed.ScrollToFixed")}}function o(){var J=m.options.limit;if(!J){return 0}if(typeof(J)==="function"){return J.apply(H)}return J}function q(){return I==="fixed"}function y(){return I==="absolute"}function h(){return !(q()||y())}function x(){if(!q()){var J=H[0].getBoundingClientRect();u.css({display:H.css("display"),width:J.width,height:J.height,"float":H.css("float")});cssOptions={"z-index":m.options.zIndex,position:"fixed",top:m.options.bottom==-1?t():"",bottom:m.options.bottom==-1?"":m.options.bottom,"margin-left":"0px"};if(!m.options.dontSetWidth){cssOptions.width=H.css("width")}H.css(cssOptions);H.addClass(m.options.baseClassName);if(m.options.className){H.addClass(m.options.className)}I="fixed"}}function b(){var K=o();var J=r;if(m.options.removeOffsets){J="";K=K-E}cssOptions={position:"absolute",top:K,left:J,"margin-left":"0px",bottom:""};if(!m.options.dontSetWidth){cssOptions.width=H.css("width")}H.css(cssOptions);I="absolute"}function l(){if(!h()){f=-1;u.css("display","none");H.css({"z-index":z,width:"",position:F,left:"",top:e,"margin-left":""});H.removeClass("scroll-to-fixed-fixed");if(m.options.className){H.removeClass(m.options.className)}I=null}}function w(J){if(J!=f){H.css("left",r-J);f=J}}function t(){var J=m.options.marginTop;if(!J){return 0}if(typeof(J)==="function"){return J.apply(H)}return J}function B(){if(!a.isScrollToFixed(H)||H.is(":hidden")){return}var M=c;var L=h();if(!c){v()}else{if(h()){E=H.offset().top;r=H.offset().left}}var J=a(window).scrollLeft();var N=a(window).scrollTop();var K=o();if(m.options.minWidth&&a(window).width()<m.options.minWidth){if(!h()||!M){p();H.trigger("preUnfixed.ScrollToFixed");l();H.trigger("unfixed.ScrollToFixed")}}else{if(m.options.maxWidth&&a(window).width()>m.options.maxWidth){if(!h()||!M){p();H.trigger("preUnfixed.ScrollToFixed");l();H.trigger("unfixed.ScrollToFixed")}}else{if(m.options.bottom==-1){if(K>0&&N>=K-t()){if(!L&&(!y()||!M)){p();H.trigger("preAbsolute.ScrollToFixed");b();H.trigger("unfixed.ScrollToFixed")}}else{if(N>=E-t()){if(!q()||!M){p();H.trigger("preFixed.ScrollToFixed");x();f=-1;H.trigger("fixed.ScrollToFixed")}w(J)}else{if(!h()||!M){p();H.trigger("preUnfixed.ScrollToFixed");l();H.trigger("unfixed.ScrollToFixed")}}}}else{if(K>0){if(N+a(window).height()-H.outerHeight(true)>=K-(t()||-n())){if(q()){p();H.trigger("preUnfixed.ScrollToFixed");if(F==="absolute"){b()}else{l()}H.trigger("unfixed.ScrollToFixed")}}else{if(!q()){p();H.trigger("preFixed.ScrollToFixed");x()}w(J);H.trigger("fixed.ScrollToFixed")}}else{w(J)}}}}}function n(){if(!m.options.bottom){return 0}return m.options.bottom}function p(){var J=H.css("position");if(J=="absolute"){H.trigger("postAbsolute.ScrollToFixed")}else{if(J=="fixed"){H.trigger("postFixed.ScrollToFixed")}else{H.trigger("postUnfixed.ScrollToFixed")}}}var D=function(J){if(H.is(":visible")){c=false;B()}};var G=function(J){(!!window.requestAnimationFrame)?requestAnimationFrame(B):B()};var C=function(){var K=document.body;if(document.createElement&&K&&K.appendChild&&K.removeChild){var M=document.createElement("div");if(!M.getBoundingClientRect){return null}M.innerHTML="x";M.style.cssText="position:fixed;top:100px;";K.appendChild(M);var N=K.style.height,O=K.scrollTop;K.style.height="3000px";K.scrollTop=500;var J=M.getBoundingClientRect().top;K.style.height=N;var L=(J===100);K.removeChild(M);K.scrollTop=O;return L}return null};var s=function(J){J=J||window.event;if(J.preventDefault){J.preventDefault()}J.returnValue=false};m.init=function(){m.options=a.extend({},a.ScrollToFixed.defaultOptions,i);z=H.css("z-index");m.$el.css("z-index",m.options.zIndex);u=a("<div />");I=H.css("position");F=H.css("position");k=H.css("float");e=H.css("top");if(h()){m.$el.after(u)}a(window).bind("resize.ScrollToFixed",D);a(window).bind("scroll.ScrollToFixed",G);if("ontouchmove" in window){a(window).bind("touchmove.ScrollToFixed",B)}if(m.options.preFixed){H.bind("preFixed.ScrollToFixed",m.options.preFixed)}if(m.options.postFixed){H.bind("postFixed.ScrollToFixed",m.options.postFixed)}if(m.options.preUnfixed){H.bind("preUnfixed.ScrollToFixed",m.options.preUnfixed)}if(m.options.postUnfixed){H.bind("postUnfixed.ScrollToFixed",m.options.postUnfixed)}if(m.options.preAbsolute){H.bind("preAbsolute.ScrollToFixed",m.options.preAbsolute)}if(m.options.postAbsolute){H.bind("postAbsolute.ScrollToFixed",m.options.postAbsolute)}if(m.options.fixed){H.bind("fixed.ScrollToFixed",m.options.fixed)}if(m.options.unfixed){H.bind("unfixed.ScrollToFixed",m.options.unfixed)}if(m.options.spacerClass){u.addClass(m.options.spacerClass)}H.bind("resize.ScrollToFixed",function(){u.height(H.height())});H.bind("scroll.ScrollToFixed",function(){H.trigger("preUnfixed.ScrollToFixed");l();H.trigger("unfixed.ScrollToFixed");B()});H.bind("detach.ScrollToFixed",function(J){s(J);H.trigger("preUnfixed.ScrollToFixed");l();H.trigger("unfixed.ScrollToFixed");a(window).unbind("resize.ScrollToFixed",D);a(window).unbind("scroll.ScrollToFixed",G);H.unbind(".ScrollToFixed");u.remove();m.$el.removeData("ScrollToFixed")});D()};m.init()};a.ScrollToFixed.defaultOptions={marginTop:0,limit:0,bottom:-1,zIndex:1000,baseClassName:"scroll-to-fixed-fixed"};a.fn.scrollToFixed=function(b){return this.each(function(){(new a.ScrollToFixed(this,b))})}})(jQuery);


$('.article-nav-inner').scrollToFixed();

$('.progress-bar-wrapper').scrollToFixed({
  marginTop: 0,
  fixed: function() { $(this).css('opacity','1'); },
  postFixed: function() { $(this).css('opacity','0'); },
});

$('.edition-content-fixed-1').scrollToFixed({
  marginTop: 90,
  limit: $('.edition-content-fixed-2').offset().top - $('.edition-content-fixed-1').outerHeight()
});

$('.edition-content-fixed-2').scrollToFixed({
  marginTop: 90,
  limit: $('.edition-fixed-limiter').offset().top - $('.edition-content-fixed-2').outerHeight()
});
