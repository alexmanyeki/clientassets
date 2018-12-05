/*==========================================
    ** MAIN JS v.02
    
    ** Custom Global JS Functions
    ** This file serves as a base from which other JS files in this package (search.js, villas.js, etc...) refer to
    ** Non-obvious functions have been commented for ease of reference

==========================================*/


    //Call Webflow IX library ( https://forum.webflow.com/t/how-to-trigger-webflow-interactions-using-javascript/3777 )
var ix = Webflow.require('ix'),
    showItem = {"type":"load","stepsA":[{"display":"block"},{"wait":"1ms"},{"opacity":1,"transition":"opacity 350ms ease 0"}],"stepsB":[]},
    hideItem = {"type":"load","stepsA":[{"opacity":0,"transition":"opacity 350ms ease 0"},{"wait":"1ms"},{"display":"none"}],"stepsB":[]},
    
    
    //function that creates a responsive bg image from a responsive image's src 
    fadeinBg = function(){
        $('[data-image="source"]').each(function() {
            var self = $(this);
            if ($(self).length > 0 && !$(self).get(0).complete) {
                $(self).on('load', function() {
                    var newbgsrc = $(self).prop('currentSrc');
                    setTimeout(function() {
                        $(self).siblings('[data-image="bg"]').css({'background-image': 'url(' + newbgsrc + ')','opacity': '1'});
                    }, 100);
                });
            } else if ($(self).length < 0 && $(self).get(0).complete) {
                setTimeout(function() {
                    $(self).siblings('[data-image="bg"]').css({'background-image': 'url(https://uploads-ssl.webflow.com/5ad5be8d291246b4021357cd/5af3e1d62d1960a0b177ccc8_placeholder.svg)','opacity': '1'});
                }, 100);
            } else {
                var newbgsrc = $(self).prop('currentSrc');
                setTimeout(function() {
                    $(self).siblings('[data-image="bg"]').css({ 'background-image': 'url(' + newbgsrc + ')', 'opacity': '1' });
                }, 100);
            }
        });
        return fadeinBg;
    },
    
    
    //function that show more info on mouseover on a listing / info card
    showhover = function(){
        $('.full-height-link').each(function() {
            var self = $(this);
            $(self).hover(function() {
                ix.run(showItem, $(self).find('.hover-content-overlay') );
            }, function() {
                ix.run(hideItem, $(self).find('.hover-content-overlay') );
            });
        });
        
        return showhover;
    },
    

    //function that calls fancybox/lightbox functionality on an element
    showGallery = function(){
        $('[data-fancybox]').fancybox({
            protect: true,
            hash: false
        });
        return showGallery;
    },
    
    
    //function that gets and converts realtime currency depending on currency type in myVR
    getCurrency = function(){
        var currencyData = JSON.parse(sessionStorage.getItem('currencyData'));
        $('[data-currency]').each(function() {
            var dataCurrType = $(this).data('currency'),
                currRate = $(this).text(),
                convertedRate = currRate * currencyData[dataCurrType];

            $(this).siblings('.conv-rate').text( $('<div>' + Math.round(convertedRate) + '</div>').text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") );
            $(this).siblings('.conv-rate').css('display','inline');
            $(this).remove();
        });
        return getCurrency;
    };

    
//Small function that adds days to calendar dates
Date.prototype.addDays = function(days) {
    var dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() + days);
    return dat;
}





//====== BEGIN DOCUMENT READY ======//

$(document).ready(function() {
    
    fadeinBg();
    
    //Fn to add commas to currency/numbers
    $.fn.commaDigits = function() {
        return this.text($(this).text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
    }

    //Fn to strip HTML tags from element
    $.fn.stripTags = function() { 
      return this.replaceWith(this.html().replace(/<\/?[^>]+>/gi, ''));
    };
    
    //Change navbar styles on scroll
    $(window).scroll(function() {
      if ($(this).width() >= 992 && $(this).scrollTop() >= 30) {
          $('.navbar ').css('height','62px');
          $('.logo ').css('height','27px');
          $('.logo-image').fadeOut('fast');
          $('.logo-image-small').fadeIn('fast');
          $('.top-menu').fadeOut('fast');
          $('.nav-link').css('letter-spacing','1.5px');
          $('.container.search-form').css('margin-top','118px');
          $('.search-bg').css('margin-top','62px');
          $('.search-content').css('margin-top','238px');
          $('.map-wrapper-inner,.av-wrapper-inner').css('padding-top','62px');
      } else {
          $('.navbar,.top-menu,.logo,.logo-image,.logo-image-small,.nav-link,.container.search-form,.search-bg,.search-content,.map-wrapper-inner,.av-wrapper-inner').removeAttr('style');
      }
    });
    


    $('.scroll-down').click(function(){
        var self = $(this);
        $('html, body').animate({ scrollTop: $(self).closest('.hero').next().offset().top - 62 }, 700);
    });
    
    
   //============ SEARCH ============//
    $('.search-field').keyup(function() {
      var empty = false;
      if ($(this).val() === '') { empty = true; }
      if (empty) {
        $(this).siblings('.search-submit').css({'pointer-events':'none','opacity':'0.45'});
        $('#noLiveResults').fadeOut(200);
        $('.live-search-heading').css('opacity','1');
      } else {
        $(this).siblings('.search-submit').css({'pointer-events':'all','opacity':'1'});
      }
    });
    
    $('#searchForm').submit(function(e){
        e.preventDefault();

        var searchString = $("#searchField").val();
        var loc = '/search-results?keyword=' + searchString;
        var decodedUrl = decodeURIComponent(loc);
        location.href = decodedUrl;

        return false;
    });

    
    $(".nav-link.search-icon").click(function() {
        var clicks = $(this).data('clicks');
        if (clicks) {
            $('body').css('overflow','auto');
            $('.close-search-icon').css('opacity','0');
            $('.logo,.burger-btn').css({'opacity':'1','pointer-events':'all'});
            setTimeout(function() {
                $('.navbar').css('background-color', 'rgba(255, 255, 255, 0.92)');
                $('.open-search-icon').css('opacity', '1')
            }, 500);
        } else {
            $('body').css('overflow','hidden');
            $('.open-search-icon').css('opacity','0');
            $('.logo,.burger-btn').css({'opacity':'.3','pointer-events':'none'});
            setTimeout(function() {
                $('.navbar').css('background-color', 'transparent');
                $('.close-search-icon').css('opacity', '1');
            }, 350);
        }
        $(this).data("clicks", !clicks);
        
        

        myvr.properties({group: 'Featured'}).then(function(data) {
            var props = data.results,
                propsCount = props.length,
                featuredOutput = '';
            
            props.forEach(function(object) { for (var key in object) { if (object[key] == null) object[key] = ''; } }); 

            for (var i = 0; i < propsCount; i++) {

                var apiRate = $('<div>' + props[i].lowestRate + '</div>').text(),
                    actualRate = $('<div>' + props[i].lowestRate + '</div>').text().slice(0,-2),
                    formattedRate = actualRate.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");

                featuredOutput += `
                    <div class="third-block-wrap live-search-result" data-ix="show-content-hover">
                        <a href="/luxury-villas/villa?name=${props[i].slug}" data-image="parent" class="full-height-link listing-featured w-inline-block">
                            <div data-image="bg" class="bg-wrapper"></div>
                            <img src="http:${props[i].photo.smallUrl}" data-image="source" class="full-width-image">
                            <div class="hover-content-overlay live-search" data-ix="initial-invisible">
                                <div class="block-overlay-content">
                                    <div class="view-details-listings">view details</div>
                                </div>
                            </div>
                        </a>
                        <div class="listing-details recents">
                            <div>${props[i].name}</div>
                            <div class="live-result-smaller">${props[i].city}</div>
                            <div class="live-result-smaller">FROM $<span data-currency="${props[i].currency}">${actualRate}</span><span class="conv-rate"></span></div>
                        </div>
                    </div>
                `;

                $('#featuredListings').html(featuredOutput);

            }

        }).always(function(){
            $('#searchPh').remove();
            fadeinBg();
            showhover();
        });
        
    });
    
    
    
   //============ DROPDOWNS ============//    
    $('[data-filter="location"],[data-filter="collection"]').each(function() {
        $(this).click(function() {
            $('#filterToggleText').text( 'Filter ' + $(this).text() );
            $(this).closest('.w-dropdown').triggerHandler('w-close');
        });
    });
    
    $('[data-filter="map-view"]').each(function() {
        $(this).click(function() {
            $('#filterToggleText').text( $(this).text() );
            $(this).closest('.w-dropdown').triggerHandler('w-close');
        });
    });
    
    $('[data-sort-by]').each(function() {
        $(this).click(function() {
            $(this).closest('.w-dropdown').find('.sort-value').text( $(this).text() );
            $(this).closest('.w-dropdown').triggerHandler('w-close');
        });
    });

    $('[data-collapse="true"] .select-droplink').each(function() {
        $(this).click(function() {
            $(this).closest('.w-dropdown').triggerHandler('w-close');
            $(this).closest('.w-dropdown').find('.dd-select-text').text($(this).text());
        });
    });
    

    

    //============ TABS ============//
    $(".w-tab-link").each(function() {
        $(this).click(function() {
            var self = $(this);
            $('html, body').animate({ scrollTop: $(self).closest('[data-scroll="top"]').offset().top - 40 }, 500);
        });
    });
    
    
    //============ PROPERTIES (Yachts/ Great Estates) ============//
    $('#linkOverview, #linkServices, #linkReserve').click(function() {
        $('html, body').animate({ scrollTop: $(".hero").offset().top }, 700);
    });
    
    $('.button-wrapper.load-more').click(function() {
        $('html, body').animate({ scrollTop: $(this).offset().top -200 }, 700);
    });
    
    
    //============ PAGE ACTIONS ============//
    $('#printPage').click(function() {
        window.print();
    });

    
    
    //============ GLOBAL BOOKING CALENDAR ============//
    
    $('.av-open').click(function() {
        $(this).css('display','none');
        $(this).siblings('.av-close').css('display','block');
        $('.av-wrapper').css('margin-left','0px');
    });
    
    $('.av-close').click(function() {
        $(this).css('display','none');
        $(this).siblings('.av-open').css('display','block');
        $('.av-wrapper').css('margin-left','-450px');
    });
    
    $('.av-open-mobile').click(function() {
        setTimeout(function(){ $('.av-close-mobile').css('opacity','1') },700);
        $('.av-wrapper').css('margin-left','0%');
    });
    
    $('.av-close-mobile').click(function() {
        $(this).css('opacity','0');
        $('.av-wrapper').css('margin-left','-100%');
    });
    
    var av_m_names = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"),
        av_now = new Date(), av_d = av_now.getDate(), av_m = av_now.getMonth(), av_y = av_now.getFullYear(),
        av_bdy = ('0' + av_d).slice(-2);

    var avPopulateArrival = function() {
            $('[data-collapse="av-arrive"]').find('.av-booking-date-day').text(av_bdy);
            $('[data-collapse="av-arrive"]').find('.av-booking-month-year').text(av_m_names[av_m] + ', ' + av_y);
            return avPopulateArrival;
        },
        avPopulateDeparture = function(){
            var departDateDefault = av_now.addDays(1), av_d = departDateDefault.getDate(), av_m = departDateDefault.getMonth(), av_y = departDateDefault.getFullYear(), av_bdy = ('0' + av_d).slice(-2);
            $('[data-collapse="av-depart"]').find('.av-booking-date-day').text(av_bdy);
            $('[data-collapse="av-depart"]').find('.av-booking-month-year').text(av_m_names[av_m] + ', ' + av_y);
            return avPopulateDeparture;
        },
        avPopulateArrivalChanged = function(){
            var oldDate = new Date($(".av-arrive-date-input").val()), av_d = oldDate.getDate(), av_m = oldDate.getMonth(), av_y = oldDate.getFullYear(), av_bdy = ('0' + av_d).slice(-2);
            $('[data-collapse="av-arrive"]').find('.av-booking-date-day').text(av_bdy);
            $('[data-collapse="av-arrive"]').find('.av-booking-month-year').text(av_m_names[av_m] + ', ' + av_y);
            return avPopulateArrivalChanged;
        },
        avPopulateMinDays = function(){
            var oldDate = new Date($(".av-arrive-date-input").val()), newDepartDate = oldDate.addDays(1), av_d = newDepartDate.getDate(), av_m = newDepartDate.getMonth(), av_y = newDepartDate.getFullYear(), av_bdy = ('0' + av_d).slice(-2);
            $('[data-collapse="av-depart"]').find('.av-booking-date-day').text(av_bdy);
            $('[data-collapse="av-depart"]').find('.av-booking-month-year').text(av_m_names[av_m] + ', ' + av_y);
            return avPopulateMinDays;
        },
        avPopulateDepartureChanged = function(){
            var oldDate = new Date($(".av-depart-date-input").val()), av_d = oldDate.getDate(), av_m = oldDate.getMonth(), av_y = oldDate.getFullYear(), av_bdy = ('0' + av_d).slice(-2);
            $('[data-collapse="av-depart"]').find('.av-booking-date-day').text(av_bdy);
            $('[data-collapse="av-depart"]').find('.av-booking-month-year').text(av_m_names[av_m] + ', ' + av_y);
            return avPopulateDepartureChanged;
        };

    
    $(".av-arrive-date-input").flatpickr({
        inline: true,
        minDate: "today",
        defaultDate: "today",
        onReady: function(){
            avPopulateArrival();
        },
        onChange: function() {
            avPopulateArrivalChanged();
            avPopulateMinDays();
            setTimeout(function(){ $('[data-collapse="av-arrive"]').triggerHandler('w-close'); }, 300);
            $(".av-depart-date-input").flatpickr({
                inline: true,
                minDate: new Date($(".av-arrive-date-input").val()).fp_incr(1),
                defaultDate: new Date($(".av-arrive-date-input").val()).fp_incr(1),
                onChange: function() {
                    avPopulateDepartureChanged();
                    setTimeout(function(){ $('[data-collapse="av-depart"]').triggerHandler('w-close'); }, 400);
                }
            });
        },
    });
    
    $(".av-depart-date-input").flatpickr({
        inline: true,
        minDate: new Date($(".av-arrive-date-input").val()).fp_incr(1),
        defaultDate: new Date($(".av-arrive-date-input").val()).fp_incr(1),
        onReady: function(){
            avPopulateDeparture();
        },
        onChange: function() {
            avPopulateDepartureChanged();
            setTimeout(function(){ $('[data-collapse="av-depart"]').triggerHandler('w-close'); }, 300);
        }
    });
    
    $('[data-av-collapse="booking-range"] .select-droplink').each(function() {
        $(this).click(function() {
            $(this).closest('.w-dropdown').find('input#avLowestRateMin').val( $(this).data('lowestratemin') + '00' );
            $(this).closest('.w-dropdown').find('input#avLowestRateMax').val( $(this).data('lowestratemax') + '00' );    
        });
    });
    $('[data-av-collapse="global"] .select-droplink').each(function() {
        $(this).click(function() {
            $(this).closest('.w-dropdown').find('input').val( $(this).text() );
        });
    });
    
    $('#avForm').submit(function(e) {
        e.preventDefault();
        
        $(this).find('.w-button').css({ 'background-image':'url(https://uploads-ssl.webflow.com/5b1fc5b60fbeaef6088a246c/5b355817b871454550638c8c_ripple.svg)','background-position':'99% 50%' , 'background-size':'30px' , 'background-repeat':'no-repeat' });
        $(this).find('.w-button').text('getting results...');
        
        var avDest = $('#avDest').val().trim(),
            avStartDate = $('#avStartDate').val().trim(),
            avEndDate = $('#avEndDate').val().trim(),
            avGuests = $('#avGuests').val().trim(),
            avLowestRateMin = $('#avLowestRateMin').val().trim(),
            avLowestRateMax = $('#avLowestRateMax').val().trim();
        
        if (avDest == 'Any Destination'){
            avDest = '';
        } else {
            avDest = encodeURIComponent(avDest);
        }
        
        if (avGuests == '5+'){
            avGuests = '5';
        }
        
        setTimeout(function () {
            location.href = '/property-results?destination=' + avDest + '&start_date=' + avStartDate + '&end_date=' + avEndDate + '&guests=' + avGuests + '&min_rate=' + avLowestRateMin + '&max_rate=' + avLowestRateMax ;
        }, 1000);
        
        return false;
    });

    
   
    
    //============ CACHE MVVR PROPERTIES ============//
    if ("propsData" in sessionStorage) {
        //Do nothing
    } else {
        //GET PROPERTIES FROM API
        myvr.properties({limit: 10000}).then(function(data) {
            sessionStorage.setItem('propsData', JSON.stringify(data.results));
            var props = JSON.parse(sessionStorage.getItem('propsData')),
                propsCount = props.length,
                tempOutput = '';
            
            for (var i = 0; i < propsCount; i++) {
                var key = props[i].key,
                    slug = props[i].slug,
                    newObjContent = '"' + slug + '"' + ':' + '"' + key + '",';

                tempOutput += `<div>${newObjContent}</div>`;
                $('#slugPopulate').html(tempOutput);
            }

            var sourceJSON = JSON.parse('{' + $('#slugPopulate').text().slice(0, -1) + '}');
            sessionStorage.setItem('propsKeys', JSON.stringify(sourceJSON));
        });
    }
    
    
        
        

    
        
});

//==========================================
// END DOCUMENT READY
//==========================================


