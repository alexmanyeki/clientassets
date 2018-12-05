/*==========================================

  ** Villa detail view

  ==========================================*/


$(document).ready(function() {
    
    var fetchErrorMsg = 'Sorry! Something went wrong while fetching this property\'s information. Please check your internet connection and reload the page.',
        formErrorMsg = 'Sorry! Something went wrong while submitting your request. Please check your internet connection try again.',
        formSuccessMsg = 'Thank you for submitting an inquiry. We are currently reviewing your request and will get back to you shortly.',
        displayResponse = {"type":"click","stepsA":[{"display":"block"},{"wait":"1ms"},{"opacity":1,"transition":"opacity 500ms ease 0"}],"stepsB":[]},
        fadeDownResponse = {"type":"click","stepsA":[{"wait":"500ms"},{"transition":"transform 500ms ease 0","x":"0px","y":"0px","z":"0px"}],"stepsB":[]},
        expandHeight = {"type":"load","stepsA":[{"opacity":1,"height":"auto","transition":"height 2000ms ease 0, opacity 500ms ease 0"}],"stepsB":[]},
        responseSuccess = function(){
            $('.submit-response').css('background-color','#343e56');
            ix.run( displayResponse, $('.submit-message-wrap') );
            ix.run( displayResponse, $('.close-response') );
            ix.run( fadeDownResponse, $('.submit-response') )
            setTimeout(function(){ $('.w-button').css('background','') }, 2000);
            return responseSuccess;
        },
        responseError = function(){
            $('.submit-response').css('background-color','#e8626d');
            ix.run( displayResponse, $('.submit-message-wrap') );
            ix.run( displayResponse, $('.close-response') );
            ix.run( fadeDownResponse, $('.submit-response') );
            setTimeout(function(){ $('.w-button').css('background','') }, 2000);
            return responseError;
        },
        
        currentURL = (document.URL),
        pageSlug = currentURL.split("=")[1],
        pageTitle = pageSlug.replace(/-/g, ' ');
        document.title = pageTitle.replace(/\b\w/g, function(l){ return l.toUpperCase() }) + ' || Luxury Villas';

    var listRecommendations = function(){
                var props = JSON.parse(sessionStorage.getItem('propsData'));
                props.forEach(function(object) { for (var key in object) { if (object[key] == null) object[key] = ''; } });            

                var recomOutput = '',
                    recommendations = props.filter(function(item){ return item.slug != pageSlug; });

                for (var i = 0; i < 6; i++) {
                    var actualRate = $('<div>' + recommendations[i].lowestRate + '</div>').text().slice(0,-2),
                        formattedRate = actualRate.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
                        
                    recomOutput +=`
                        <div class="third-block-wrap recommend" data-ix="show-content-hover">
                            <a href="/luxury-villas/villa?name=${recommendations[i].slug}" data-image="parent" class="full-height-link listing w-inline-block">
                                <div data-image="bg" class="bg-wrapper"></div>
                                <img src="http:${recommendations[i].photo.smallUrl}" data-image="source" class="full-width-image">
                                <div class="hover-content-overlay" data-ix="initial-invisible-hidden">
                                    <div class="block-overlay-content">
                                        <div class="view-details-listings">view details</div>
                                    </div>
                                </div>
                            </a>
                            <div class="listing-details recents w-clearfix">
                                <h3 class="h3-recommend">${recommendations[i].name}</h3>
                                <div class="tag-recommend-location">${recommendations[i].city}</div>
                                <div class="tag-recommend-content">FROM $${formattedRate} PER NIGHT</span>
                                </div>
                            </div>
                        </div>
                    `;                   
                    $('#recommendations').html(recomOutput);
                    fadeinBg();               
                }

            },
        listProperty =  function() {
                var propsKeys = JSON.parse(sessionStorage.getItem('propsKeys'));

                myvr.property( propsKeys[pageSlug] ).then(function(data) {
                    var descSource = data.description,
                        tempEl = $('<div>' + descSource + '</div>'),
                        descParts = $(tempEl).html().replace(/<\/?[^>]+>/gi, ''),
                        sumPart = descParts.substring(0, 140) + '...',
                        guestsNumber = parseInt(data.accommodates) + parseInt(1);
                    
                    $('head').append(
                        '<meta http-equiv="X-UA-Compatible" content="IE=Edge" />' ,
                        '<meta content="' + data.name + ' || Luxury Villas" property="og:title">'  ,
                        '<meta content="' + sumPart + '" name="description">'  ,
                        '<meta content="' + sumPart + '" property="og:description">'  ,
                        '<meta content="' + data.photos[0].largeUrl + '" property="og:image">'  ,
                        '<meta content="summary" name="twitter:card">'
                    );
                    
                    $('#guestsNumber').html('');
                    for (var h = 1; h < guestsNumber; h++) {
                        $('#guestsNumber').append('<div class="select-droplink small">'+ h.toString() +'</div>')
                    }

                    $('.property-key').text(data.key);
                    $('input[name="property"]').val(data.key);
                    $('.property-title,#bcCurrentLink').text(data.name);
                    $('.latitude').text(data.lat);
                    $('.longitude').text(data.lon);
                    $('.property-city').text(data.city);
                    $('.property-description').html(data.description);
                    $('img#propMainImage').attr('src', data.photos[0].largeUrl );
                    
                    


                    

                    //============ CALENDARS ============//

                    //default calendar values
                    var m_names = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"),
                        now = new Date(), d = now.getDate(), m = now.getMonth(), y = now.getFullYear(),
                        minStay = data.rates[0].minStay,
                        bdy = ('0' + d).slice(-2),
                        actualRate = $('<div>' + data.rates[0].weekNightRate + '</div>').text().slice(0,-2),
                        formattedRate = actualRate.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"),
                        actualSize = $('<div>' + data.size + '</div>').text().slice(0,-2),
                        formattedSize = actualSize.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"),
                        bathTextOrig = data.bathrooms,
                        bathText = '';

                    if (bathTextOrig === '0.0') {
                        bathText += '0';
                    } else if (bathTextOrig === '0.5') {
                        bathText += '½';
                    } else if (bathTextOrig.indexOf('.') !== -1) {
                        bathText += bathTextOrig.split('.').shift() + '½';
                    } else {
                        bathText += bathTextOrig;
                    }
                    
                    $('.booking-amount-number').text(actualRate); 
                    $('.booking-amount-number').attr('data-currency',data.currency);
                    $('#minStay').text(minStay);
                    $('span.accommodates').text(data.accommodates);
                    $('span.bedrooms').text(data.bedrooms);
                    $('span.bathrooms').text(bathText);
                    $('span.size').text(formattedSize);
                    
                    
                      myvr.availability({
                        property: data.key,
                        startDate: "2018-01-01", //y+"-"+m+"-"+d,
                        endDate: "2019-12-12",
                      }).then(function(data){
                          var blockedDatesData = data.results,
                              blockedDatesOutput = '';
                          
                          for ( d = 0; d < blockedDatesData.length; d++  ){
                              var datesObject = `
                                    {
                                        "from" : "${blockedDatesData[d].startDate}",
                                        "to" : "${blockedDatesData[d].endDate}"
                                    },
                                `;
                              
                              blockedDatesOutput += `${datesObject}`;
                              
                              $('#datesPopulate').html(blockedDatesOutput);
                          }
                      }).then(function(){
                          var blockedDatesJSON = JSON.parse('[' + ( $('#datesPopulate').text().trim() ).slice(0, -1) + ']');
                          console.log( blockedDatesJSON );
                          sessionStorage.setItem('blockedDatesJSON', JSON.stringify(blockedDatesJSON));
                      });

                    
                    

                    var populateArrival = function() {
                            $('[data-collapse="arrive"]').find('.booking-date-day').text(bdy);
                            $('[data-collapse="arrive"]').find('.booking-month-year').text(m_names[m] + ', ' + y);
                            return populateArrival;
                        },
                        populateDeparture = function(){
                            var departDateDefault = now.addDays(minStay), d = departDateDefault.getDate(), m = departDateDefault.getMonth(), y = departDateDefault.getFullYear(), bdy = ('0' + d).slice(-2);
                            $('[data-collapse="depart"]').find('.booking-date-day').text(bdy);
                            $('[data-collapse="depart"]').find('.booking-month-year').text(m_names[m] + ', ' + y);
                            return populateDeparture;
                        },
                        populateArrivalChanged = function(){
                            var oldDate = new Date($(".arrive-date-input").val()), d = oldDate.getDate(), m = oldDate.getMonth(), y = oldDate.getFullYear(), bdy = ('0' + d).slice(-2);
                            $('[data-collapse="arrive"]').find('.booking-date-day').text(bdy);
                            $('[data-collapse="arrive"]').find('.booking-month-year').text(m_names[m] + ', ' + y);
                            return populateArrivalChanged;
                        },
                        populateMinDays = function(){
                            var oldDate = new Date($(".arrive-date-input").val()), newDepartDate = oldDate.addDays(minStay), d = newDepartDate.getDate(), m = newDepartDate.getMonth(), y = newDepartDate.getFullYear(), bdy = ('0' + d).slice(-2);
                            $('[data-collapse="depart"]').find('.booking-date-day').text(bdy);
                            $('[data-collapse="depart"]').find('.booking-month-year').text(m_names[m] + ', ' + y);
                            return populateMinDays;
                        },
                        populateDepartureChanged = function(){
                            var oldDate = new Date($(".depart-date-input").val()), d = oldDate.getDate(), m = oldDate.getMonth(), y = oldDate.getFullYear(), bdy = ('0' + d).slice(-2);
                            $('[data-collapse="depart"]').find('.booking-date-day').text(bdy);
                            $('[data-collapse="depart"]').find('.booking-month-year').text(m_names[m] + ', ' + y);
                            return populateDepartureChanged;
                        };      
                    
                    if(data.rates){
                        var rates = data.rates, 
                            ratesOutput = '';
                        
                        for (var n = 0; n < rates.length; n++) {
                            var seasonActualRate = $('<div>' + rates[n].weekNightRate + '</div>').text().slice(0,-2),
                                months = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"),
                                startDate = new Date(rates[n].startDate), startD = startDate.getDate(), startM = startDate.getMonth(), startY = startDate.getFullYear(),
                                endDate = new Date(rates[n].endDate), endD = endDate.getDate(), endM = endDate.getMonth(), endY = endDate.getFullYear();
                            
                            ratesOutput +=`
                                <div class="rates-block">
                                    <div class="rate-calendar-wrapper w-embed">
                                        <input type="text" data-startdate="${rates[n].startDate}" data-enddate="${rates[n].endDate}" class="rate-input">
                                    </div>
                                    <div class="rate-title">${rates[n].name}</div>
                                    <div class="rate-range">${startD} ${months[startM]} ${startY}&nbsp;&nbsp;—&nbsp;&nbsp;${endD} ${months[endM]} ${endY}</div>
                                    <div class="rates-sep"></div>
                                    <div class="rate-item"><span class="rate-item-price">$<span data-currency="${data.currency}">${seasonActualRate}</span><span class="conv-rate"></span></span> p/n</div>
                                </div>
                            `;                   
                            $('.rates-wrapper').html(ratesOutput);
                            
                            $('.rate-title').each(function(){
                                if( $(this).text() == 'Base Rate' ){
                                    $(this).siblings('.rate-range').text('•');
                                }
                            });
                        }
                    } else {
                        $('#contRates').remove();
                    }
                    
                    
                    //initiate calendars
                    
                    var blockedDates = JSON.parse(sessionStorage.getItem('blockedDatesJSON'));
                    
                    $(".arrive-date-input").flatpickr({
                        altInput: true,
                        inline: true,
                        //minDate: "today",
                        defaultDate: "today",
                        disable: blockedDates,
                        onReady: function(){
                            populateArrival();
                            populateDeparture();
                            $(".depart-date-input").flatpickr({
                                altInput: true,
                                inline: true,
                                minDate: new Date($(".arrive-date-input").val()).fp_incr(minStay),
                                defaultDate: new Date($(".arrive-date-input").val()).fp_incr(minStay)
                            });
                        },
                        onChange: function() {
                            populateArrivalChanged();
                            populateMinDays();
                            setTimeout(function(){ $('[data-collapse="arrive"]').triggerHandler('w-close'); }, 400);
                            $(".depart-date-input").flatpickr({
                                altInput: true,
                                inline: true,
                                minDate: new Date($(".arrive-date-input").val()).fp_incr(minStay),
                                defaultDate: new Date($(".arrive-date-input").val()).fp_incr(minStay),
                                disable: blockedDates,
                                onChange: function() {
                                    populateDepartureChanged();
                                    setTimeout(function(){ $('[data-collapse="depart"]').triggerHandler('w-close'); }, 400);
                                }
                            });
                        },
                    });
                    
                    $('#inqArrive').flatpickr({
                        altInput: true,
                        minDate: "today",
                        disable: blockedDates,
                        onReady: function(){
                            $('#inqDepart').flatpickr({
                                altInput: true,
                                minDate: "today"
                            });
                        }
                    });
                    
                    $('.rate-input').each(function(){
                        var calendar = $(this);
                        calendar.flatpickr({
                            inline: true,
                            minDate: calendar.data('startdate'),
                            enable: [{
                                from: calendar.data('startdate'),
                                to: calendar.data('enddate')
                            }]
                        });
                    });
                    $('.rates-wrapper').each(function() {
                        var slider = $(this);
                        slider.slick({
                            dots: false,
                            infinite: false,
                            speed: 800,
                            slidesToShow: 3,
                            slidesToScroll: 3,
                            prevArrow: $(slider).siblings('.arrow-prev'),
                            nextArrow: $(slider).siblings('.arrow-next'),
                            easing: 'ease',
                            responsive: [
                                {
                                    breakpoint: 1200,
                                    settings: {
                                        slidesToShow: 2,
                                        slidesToScroll: 2,
                                    }
                                },
                                {
                                    breakpoint: 600,
                                    settings: {
                                        slidesToShow: 1,
                                        slidesToScroll: 1,
                                    }
                                }
                                
                            ]
                        });
                    });
                    
                    

                    
                    if (data.photos){
                        var photos = data.photos, galleryOutput = '';
                        for (var i = 0; i < photos.length; i++) {
                            var objectUrl = photos[i].url, objectLargeUrl = photos[i].largeUrl, objectCaptionTitle = photos[i].title, objectCaption = photos[i].caption;
                            galleryOutput += `
                                <div class="gallery-slide">
                                    <a data-image="parent" data-fancybox="property" data-caption="${objectCaption}" class="full-height-link w-inline-block" href="${objectUrl}">
                                        <div data-image="bg" class="bg-wrapper"></div>
                                        <img data-image="source" data-lazy="${objectLargeUrl}" class="full-width-image" />
                                        <div class="hover-content-overlay dark" data-ix="initial-invisible">
                                            <div class="block-overlay-content gallery">
                                                <div class="overlay-content-heading">${objectCaptionTitle}</div>
                                                <div class="p-gallery-caption">${objectCaption}</div>
                                            </div>
                                        </div>
                                    </a>
                                </div>`;
                            $('.property-gallery-container').html(galleryOutput);
                        }
                    } else {
                        $('#contGallery').remove();
                    }
                    
                    
                    
                    if(data.amenities){
                        var amenities = data.amenities, 
                            amOutput = '';
                        
                        for (var o = 0; o < amenities.length; o++) {
                            amOutput +=`<div class="amenity">${amenities[o]}</div>`;                   
                            $('#amenities').html(amOutput);
                        }
                    }
                    
                    
                    
                    $('.property-gallery-container').each(function() {
                        var slider = $(this);
                        slider.slick({
                            lazyLoad: 'progressive',
                            dots: false,
                            infinite: false,
                            speed: 800,
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            prevArrow: $(slider).siblings('.arrow-prev'),
                            nextArrow: $(slider).siblings('.arrow-next'),
                            easing: 'ease'
                        });
                    });
                    $('#guestsNumber .select-droplink').each(function(){
                        $(this).click(function() {
                            $(this).closest('.w-dropdown').triggerHandler('w-close');
                            $(this).closest('.w-dropdown').find('.dd-select-text').text($(this).text());
                            $(this).closest('.w-dropdown').find('input').val($(this).text());
                        });
                    });
                    
                    
                    //Get Recently viewed properties
                    
                    var storedPages = [],
                        propKey = propsKeys[pageSlug],
                        getHistory = function(){
                            var recentPages = JSON.parse(localStorage.getItem('storedPages'));

                            function isInArray(value, array) {
                              return array.indexOf(value) > -1;
                            }

                            if ( !isInArray( propKey, recentPages) ) {
                                if (recentPages.length <= 4) {
                                    $('#recentViews').show();
                                    recentPages.push(propKey); //Add new page to array
                                    localStorage.setItem('storedPages', JSON.stringify(recentPages));
                                } else if (recentPages.length > 4) {
                                    $('#recentViews').show();
                                    recentPages.shift(); //remove oldest page in array
                                    recentPages.push(propKey); //Add new page to array
                                    localStorage.setItem('storedPages', JSON.stringify(recentPages));
                                } else if (recentPages.length === 0 ) {
                                    $('#recentViews').hide()
                                }
                            }

                            var recentProps = JSON.parse(localStorage.getItem('storedPages'));
                            
                            recentProps.forEach(function(object) { for (var key in object) { if (object[key] == null) object[key] = ''; } });  
                            
                            for (var i = 0; i < recentProps.length; i++) {

                                myvr.property( recentProps[i] ).then(function(data) {
                                    var recentsOutput = '',
                                        actualRate = $('<div>' + data.rates[0].weekNightRate + '</div>').text().slice(0,-2),
                                        formattedRate = actualRate.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");

                                    setTimeout(function(){
                                        recentsOutput +=`
                                            <div class="third-block-wrap live-search-result in-recents" data-ix="show-content-hover">
                                                <a href="/luxury-villas/villa?name=${data.slug}" data-image="parent" class="full-height-link recents w-inline-block">
                                                    <div data-image="bg" class="bg-wrapper"></div>
                                                    <img src="http:${data.photos[0].smallUrl}" data-image="source" class="full-width-image">
                                                    <div class="hover-content-overlay live-search" data-ix="initial-invisible">
                                                        <div class="block-overlay-content">
                                                            <div class="view-details-listings">view details</div>
                                                        </div>
                                                    </div>
                                                </a>
                                                <div class="listing-details recents">
                                                    <div>${data.name}</div>
                                                    <div class="live-result-smaller">${data.city}</div>
                                                    <div class="live-result-smaller">FROM $<span data-currency="${data.currency}">${actualRate}</span><span class="conv-rate"></span></div>
                                                </div>
                                            </div>
                                        `;
                                        
                                        $('#recentlyViewedPh').remove();

                                        $('#recentlyViewed').append(recentsOutput);
                                        
                                        fadeinBg();
                                        showhover();
                                    }, 5000);

                                });
                            }
                            
                            return getHistory;
                        };

                    if ("storedPages" in localStorage) {
                        getHistory();
                    } else {
                        localStorage.setItem('storedPages', JSON.stringify(storedPages));
                        getHistory();
                    }
                    
                    
                    
                    
                }).error(function(statusCode, data, request) {
//                     $('.submit-response-text').text(fetchErrorMsg);
//                     responseError();
                    
                    console.log(statusCode);
                }).always(function(){
                    $('.property-description').find('ul').eq(0).addClass('ul-no-indent prop-data-highlight');
                    $('.property-description').find('ul').eq(0).find('li').addClass('prop-li-highlight');
                    $('#propertyLoader').fadeOut('fast');
                    ix.run( expandHeight, $('.property-body') );
                    
                    fadeinBg();
                    showGallery();
                    showhover();
                    
                    if ("currencyData" in sessionStorage) {
                        getCurrency();
                    } else {
                        $.ajax({
                            type: "GET",
                            dataType: "jsonp",
                            url: "https://openexchangerates.org/api/latest.json?app_id=6b6b617ab7e841debf4071aa9c0971d6",
                            success: function(data) {
                                sessionStorage.setItem('currencyData', JSON.stringify(data.rates));
                                var currencyData = JSON.parse(sessionStorage.getItem('currencyData'));
                                getCurrency();
                            }
                        });
                    }
                    
                    /* Check for amenities */
                    if ( $('#amenities').find('div').length === 0 ) {
                        $('.amenities').remove();
                    }
                    
                    /* Single Location Map */
                    var gmarkers = [],
                        map = '',
                        infowindow = '',
                        color = '#343e56',
                        locName = $('.property-title').text(),
                        locLat = $('.latitude').text(),
                        locLong = $('.longitude').text(),
                        styles=[{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"weight":"0.9"},{"lightness":"-15"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#343e56"},{"lightness":"20"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"visibility":"on"},{"color":"#c3ccda"}]},{"featureType":"landscape.natural","elementType":"all","stylers":[{"color":"#c3ccda"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"simplified"},{"color":"#c3ccda"}]},{"featureType":"poi","elementType":"labels.text","stylers":[{"visibility":"simplified"},{"color":"#343e56"}]},{"featureType":"road","elementType":"all","stylers":[{"color":"#788aa3"},{"lightness":"40"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"simplified"},{"color":"#343e56"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#788aa3"},{"visibility":"simplified"}]},{"featureType":"water","elementType":"labels.text","stylers":[{"visibility":"off"}]}],
                        mapOptions = {
                          center: new google.maps.LatLng(locLat, locLong),
                          zoom: 15,
                          mapTypeId: google.maps.MapTypeId.ROADMAP,
                          mapTypeControl: false,
                          fullscreenControl: false,
                          styles: styles
                        };

                    map = new google.maps.Map(document.getElementById("map"), mapOptions);

                    google.maps.event.addListener(map, 'click', function() {
                      infowindow.close();
                    });

                    var locations = [
                      [locName, locLat, locLong]
                    ];

                    function setMarkers(locations) {
                      for (var i = 0; i < locations.length; i++) {
                        var iconBase = {
                          url: "https://uploads-ssl.webflow.com/5b1fc5b60fbeaef6088a246c/5b7866db4c34865666370476_villa_marker.png",
                          scaledSize: new google.maps.Size(38, 38),
                          origin: new google.maps.Point(0, 0),
                          anchor: new google.maps.Point(14.5, 38)
                        },
                            location = locations[i],
                            myLatLng = new google.maps.LatLng(location[1], location[2]),
                            marker = new google.maps.Marker({
                              position: myLatLng,
                              animation: google.maps.Animation.DROP,
                              map: map,
                              icon: iconBase,
                              title: location[0]
                            });

                        google.maps.event.addListener(marker, "click", function() {
                          map.setCenter(marker.getPosition());
                          infowindow.setContent(this.html);
                          infowindow.open(map, this);
                        });
                        gmarkers.push(marker);
                      }
                    }
                    setMarkers(locations);
                    
                    
                    

                    
                });

            return listProperty;
        };

       
    if ("propsKeys" in sessionStorage) {
        //========== GET PROPERTY FROM SESSIONSTORAGE ==========//
        listRecommendations();
        listProperty();
    } else {
        //========== GET PROPERTY FROM API ==========//
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
            listRecommendations();
            listProperty();
        });
    }
    
    $('#propBookingForm').submit(function(e) {
        e.preventDefault();
        $(this).find('.w-button').css({ 'background-image':'url(https://uploads-ssl.webflow.com/5b1fc5b60fbeaef6088a246c/5b355817b871454550638c8c_ripple.svg)','background-position':'99% 50%' , 'background-size':'30px' , 'background-repeat':'no-repeat' });
        var data = {}, fields = $(this).serializeArray();
        $.each(fields, function(i, item) { data[item.name] = item.value; });
        myvr.book(data).then(function() { /*success*/ }, function(response) { 
            $('.submit-response-text').text(formErrorMsg);
            responseError(); 
        });

        return false;
    });
    
    $('#propInquiryForm').submit(function(e) {
        e.preventDefault();
        $(this).find('.w-button').css({ 'background-image':'url(https://uploads-ssl.webflow.com/5b1fc5b60fbeaef6088a246c/5b355817b871454550638c8c_ripple.svg)','background-position':'99% 50%' , 'background-size':'30px' , 'background-repeat':'no-repeat' });
        var data = {}, fields = $(this).serializeArray();
        $.each(fields, function(i, item) { data[item.name] = item.value; });
        myvr.inquire(data).then(function() { 
            $('.submit-response-text').text(formSuccessMsg);
            responseSuccess();
            
            $('.hide-response,.close-response').click(function(){
                $('#propInquiryForm')[0].reset();
            });
        }, function(response) { 
            $('.submit-response-text').text(formErrorMsg);
            responseError(); 
        });

        return false;
    });
});



$(window).on("load", function(){
    var showReadMore = function(){ 
            $('.read-more-fade,.read-more-fadetext').css({'display':'block','opacity':'1'});
                return showReadMore;
            },
        hideReadMore = function(){ 
            $('.read-more-fade,.read-more-fadetext').css({'display':'none','opacity':'0'});
                return hideReadMore;
            },
        adjustDimensions = function(){ 
            $('.property-data').css({'max-height':'none','padding-bottom':'0'});
                return adjustDimensions;
            }; 
    setTimeout(function(){
        var pdcHeight = $('.property-data-content').height(),
            pdHeight = $('.property-data').height();

        if ( pdcHeight > pdHeight ) { showReadMore(); } 
        else {
            hideReadMore();
            adjustDimensions();
        }
        $('.read-more-fadetext').click(function() {
            adjustDimensions();
        });
    }, 2200);
    $(window).resize(function(){
        var pdcHeight = $('.property-data-content').height(),
        pdHeight = $('.property-data').height();
        if ( pdcHeight > pdHeight ) { showReadMore(); } 
        else {
            hideReadMore();
            adjustDimensions();
        }
        
        $('.read-more-fadetext').click(function() {
            adjustDimensions();
        });
    });
    
});

