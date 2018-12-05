/*==========================================

  ** All Villas listing page

  ==========================================*/

$(document).ready(function() {
    
    var runFuncs = function(){
        
        setTimeout(function() {
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
        }, 500);

        $('.full-height-link').each(function() {
            var self = $(this);
            $(self).hover(function() {
                ix.run(showItem, $(self).find('.hover-content-overlay') );
            }, function() {
                ix.run(hideItem, $(self).find('.hover-content-overlay') );
            });
        });

        fadeinBg();

        $('.p-content-excerpt').each(function(){
            var key = $(this).data('property-key'),
                excerpt = $('.w-dyn-items').find('[data-property-key="'+ key +'"]').text();

            $(this).text( excerpt );
        });
        
        return runFuncs;

        
    };
    
    myvr.properties({limit: 22}).then(function(data) {
        var props = data.results,
            totalCount = data.count,
            propsCount = props.length ,
            output = '';
        
        $('.results-total').html('<span id="totalCount">'+totalCount+'</span>' + ' Villas');
        $('.results-total').css('opacity',1);

        props.forEach(function(object) { for (var key in object) { if (object[key] == null) object[key] = ''; } });

        for (var i = 0; i < propsCount; i++) {
            var excerptSource = props[i].description,
                tempEl = $('<div>' + excerptSource + '</div>').stripTags(),
                strippedDesc = $(tempEl).text().replace(/[^A-Z0-9]+/ig, " ").trim(),
                descParts = $(tempEl).text().split('.'),
                descFirstPart = descParts.shift().substring(0, 140) + '...',
                apiRate = $('<div>' + props[i].lowestRate + '</div>').text(),
                actualRate = $('<div>' + props[i].lowestRate + '</div>').text().slice(0,-2),
                formattedRate = actualRate.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"), //+ "." + apiRate.slice(-2),
                bathTextOrig = props[i].bathrooms,
                bookingAmount = $('.booking-amount-reserve').text(),
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

            var listingTemplate = `
                <div class="third-block-wrap listing" data-ix="initial-hidden">
                    <a href="/luxury-villas/villa?name=${props[i].slug}" data-image="parent" class="full-height-link listing w-inline-block">
                        <div class="slate-blue-tint _20"></div>
                        <div class="bg-wrapper" data-image="bg"></div>
                        <img src="http:${props[i].photo.smallUrl}" class="full-width-image" data-image="source">
                        <div class="hover-content-overlay" data-ix="initial-invisible-hidden">
                            <div class="block-overlay-content">
                                <div class="overlay-content-heading listing">${props[i].name}</div>
                                <p class="p-content-excerpt" data-property-key="${props[i].key}"></p>
                                <div class="view-details-listings">view details</div>
                            </div>
                        </div>
                        <div class="title-content">
                            <h3 class="listing-heading">${props[i].name}</h3>
                            <div class="listing-subheading">${props[i].city}${props[i].city && props[i].state ? `<span>, </span>` : ''}${props[i].state}</div>
                        </div>
                    </a>
                    <div class="listing-details">
                        <div class="listing-details-left">
                            <div class="div-block-2">
                                <img src="https://uploads-ssl.webflow.com/5b1fc5b60fbeaef6088a246c/5b1fc5b60fbeae0c598a24a5_listing_bed_icon.svg" class="listing-details-icon">
                                <div>${props[i].bedrooms}</div>
                            </div>
                            <div class="div-block-2">
                                <img src="https://uploads-ssl.webflow.com/5b1fc5b60fbeaef6088a246c/5b1fc5b60fbeae32078a24a6_listing_bath_icon.svg" class="listing-details-icon">
                                <div>${bathText}</div>
                            </div>
                        </div>
                        <div class="listing-details-right">
                            <div class="listing-price-wrap">
                                <div class="listing-price-before">from</div>
                                <div class="listing-price">$<span data-currency="${props[i].currency}">${actualRate}</span><span class="conv-rate"></span></div>
                            </div>
                            <div class="listing-price-wrap">
                                <div>per night</div>
                            </div>
                        </div>
                    </div>
                </div>                    
            `;

            //Villa Listings
            output += listingTemplate ;

            $('#propertyListing').html(output);

        }


    }).always(function(){
        var totalCount = $('#totalCount').text().trim();
        
        $('#listingsPh').remove();
        $('#propertyListing').css('height', 'auto');
        if (totalCount > 21) {  $('.button-wrapper.load-more').fadeIn();  }
        $('#propertyListing > div:lt(21)').css('display', 'block');
        runFuncs();
    });
    
    
    $('#loadMoreProps .button').click(function() {
        var self = $(this);
        $(self).css('opacity', '0');

        var currentHtml = $('#propertyListing').html();

        myvr.properties({limit: 10000, offset: 22}).then(function(data) {
            if (data && data.count) {
                var props = data.results,
                    totalCount = data.count,
                    propsCount = props.length ,
                    output = '';

                props.forEach(function(object) { for (var key in object) { if (object[key] == null) object[key] = ''; } });

                for (var i = 0; i < propsCount; i++) {
                    var excerptSource = props[i].description,
                        tempEl = $('<div>' + excerptSource + '</div>').stripTags(),
                        strippedDesc = $(tempEl).text().replace(/[^A-Z0-9]+/ig, " ").trim(),
                        descParts = $(tempEl).text().split('.'),
                        descFirstPart = descParts.shift().substring(0, 140) + '...',
                        apiRate = $('<div>' + props[i].lowestRate + '</div>').text(),
                        actualRate = $('<div>' + props[i].lowestRate + '</div>').text().slice(0,-2),
                        formattedRate = actualRate.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"), //+ "." + apiRate.slice(-2),
                        bathTextOrig = props[i].bathrooms,
                        bookingAmount = $('.booking-amount-reserve').text(),
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


                    output += `
                        <div class="third-block-wrap listing">
                            <a href="/luxury-villas/villa?name=${props[i].slug}" data-image="parent" class="full-height-link listing w-inline-block">
                                <div class="slate-blue-tint _20"></div>
                                <div class="bg-wrapper" data-image="bg"></div>
                                <img src="http:${props[i].photo.smallUrl}" class="full-width-image" data-image="source">
                                <div class="hover-content-overlay" data-ix="initial-invisible-hidden">
                                    <div class="block-overlay-content">
                                        <div class="overlay-content-heading listing">${props[i].name}</div>
                                        <p class="p-content-excerpt" data-property-key="${props[i].key}"></p>
                                        <div class="view-details-listings">view details</div>
                                    </div>
                                </div>
                                <div class="title-content">
                                    <h3 class="listing-heading">${props[i].name}</h3>
                                    <div class="listing-subheading">${props[i].city}${props[i].city && props[i].state ? `<span>, </span>` : ''}${props[i].state}</div>
                                </div>
                            </a>
                            <div class="listing-details">
                                <div class="listing-details-left">
                                    <div class="div-block-2">
                                        <img src="https://uploads-ssl.webflow.com/5b1fc5b60fbeaef6088a246c/5b1fc5b60fbeae0c598a24a5_listing_bed_icon.svg" class="listing-details-icon">
                                        <div>${props[i].bedrooms}</div>
                                    </div>
                                    <div class="div-block-2">
                                        <img src="https://uploads-ssl.webflow.com/5b1fc5b60fbeaef6088a246c/5b1fc5b60fbeae32078a24a6_listing_bath_icon.svg" class="listing-details-icon">
                                        <div>${bathText}</div>
                                    </div>
                                </div>
                                <div class="listing-details-right">
                                    <div class="listing-price-wrap">
                                        <div class="listing-price-before">from</div>
                                        <div class="listing-price">$<span data-currency="${props[i].currency}">${actualRate}</span><span class="conv-rate"></span></div>
                                    </div>
                                    <div class="listing-price-wrap">
                                        <div>per night</div>
                                    </div>
                                </div>
                            </div>
                        </div>                    
                    `;


                    $('#propertyListing').html(output);

                }
            }
        }).always(function(){

            $('#propertyListing').prepend(currentHtml);
            
            setTimeout(function() {
                $('#propertyListing > div').css('display', 'block');
                $(self).closest('.button-wrapper').fadeOut(100);
            }, 1500);
            
            runFuncs();

        });

    });
            
    
   
    
});





// $(window).on("load", function(){
    
//     // init Isotope
//     var $grid = $('#propertyListing').isotope({
//         itemSelector: '.third-block-wrap.listing',
//         layoutMode: 'fitRows',
//         getSortData: {
//             location: '.listing-subheading',
//             bedrooms: '.bedrooms parseInt',
//             lowestprice: '.actual-rate parseInt',
//             highestprice: '.actual-rate parseInt'
//         }
//     });

//     // bind sort button click
//     $('#sorts').on('click', '.select-droplink', function() {
//         var sortByValue = $(this).attr('data-sort-by');
//         setTimeout(function(){
//             $grid.isotope({
//                 sortBy: sortByValue,
//                 sortAscending: {
//                     location: true,
//                     bedrooms: false,
//                     lowestprice: true,
//                     highestprice: false
//                 }
//             });
//         }, 200);
//         $('#propertyListing > div').css('display', 'block');
//         $(this).closest('.sorting-wrapper').siblings('.button-wrapper').fadeOut(100);
//     });
    
//     // change is-checked class on buttons
//     $('#sorts').each(function(i, buttonGroup) {
//         var $buttonGroup = $(buttonGroup);
//         $buttonGroup.on('click', '.select-droplink', function() {
//             $buttonGroup.find('.is-checked').removeClass('is-checked');
//             $(this).addClass('is-checked');
//         });
//     });


//     $('.insert-button').on('click', function() {
//         // create new item elements
//         //var $items = getItemElement().add(getItemElement()).add(getItemElement());
//         // insert new elements
//         //$grid.isotope( 'insert', $items );
//         $grid.append($items)
//             // add and lay out newly appended items
//             .isotope('appended', $items);
//     });

  
// })
