/*==========================================

  ** Yatch details page view

  ==========================================*/

$(document).ready(function(){
    
    $('.vert-accordion-toggle').each(function() {
        var self = $(this);
        $(self).click(function() {
            $(self).closest('.vert-accordion').siblings('.vert-accordion').find('.accordion-content-wrap').css('opacity','0');
            setTimeout(function(){ $(self).siblings('.vert-accordion-list').find('.accordion-content-wrap').css('opacity','1') }, 500); 
            
            var index = $(self).closest('.vert-accordion').index();
            $('.accordion-images-wrapper').find('.accordion-image').eq(index).css('opacity','1');
            $('.accordion-images-wrapper').find('.accordion-image').eq(index).siblings('div').css('opacity','0');
            
            $('.dest-blocks,.dest-block-wrapper,.dest-block-title').removeClass('all-view');
            $('.dest-block .button-wrapper,.p-dest-block').fadeIn('slow');
        });
    });
    
    $('.accordion-content-wrap .button').each(function() {
        $(this).click(function() {
            $('.dest-blocks,.dest-block-wrapper,.dest-block-title').addClass('all-view');
            $('.dest-block .button-wrapper,.p-dest-block').fadeOut('fast');
        });
    });
    
});