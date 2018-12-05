/*==========================================

  ** Search results page - Renders results based on search terms provided in the search box

  ==========================================*/


var listResults = function() {
    var currentURL = (document.URL),
        keyword = decodeURIComponent(currentURL.split("=")[1]),
        expression = new RegExp(keyword, "i"),
        props = JSON.parse(sessionStorage.getItem('propsData')),
        resultsOutput = '';

    props.forEach(function(object) { for (var key in object) { if (object[key] == null) object[key] = ''; } });

    $('#searchKey').text(keyword);

    $.each(props, function(key, value) {
        if ( (value.name.search(expression) != -1) || (value.description.search(expression) != -1) || (value.city.search(expression) != -1) || (value.state.search(expression) != -1) || (value.country.search(expression) != -1) || (value.type.search(expression) != -1) ) {

            var excerptSource = value.description,
                tempEl = $('<div>' + excerptSource + '</div>').stripTags(),
                tempEl2 = $('<div="tempEl2"></div>'),
                descParts = $(tempEl).text().split('.'),
                descFirstPart = descParts.shift().substring(0, 140) + '...',
                apiRate = $('<div>' + value.lowestRate + '</div>').text(),
                actualRate = $('<div>' + value.lowestRate + '</div>').text().slice(0,-2),
                formattedRate = actualRate.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"), //+ "." + apiRate.slice(-2),
                bathTextOrig = value.bathrooms;

            if (bathTextOrig.indexOf('.') !== -1) {
                var bathText = bathTextOrig.split('.').shift() + '½';
            } else {
                var bathText = bathTextOrig;
            }

            resultsOutput += `
                <div class="third-block-wrap listing" data-ix="initial-hidden">
                    <a href="/luxury-villas/villa?name=${value.slug}" data-image="parent" data-property-key="${value.key}" class="full-height-link listing w-inline-block">
                        <div class="slate-blue-tint _20"></div>
                        <div class="bg-wrapper" data-image="bg"></div>
                        <img src="http:${value.photo.smallUrl}" class="full-width-image" data-image="source">
                        <div class="hover-content-overlay" data-ix="initial-invisible-hidden">
                            <div class="block-overlay-content">
                                <div class="overlay-content-heading listing">${value.name}</div>
                                <p class="p-content-excerpt">${descFirstPart}</p>
                                <div class="view-details-listings">view details</div>
                            </div>
                        </div>
                        <div class="title-content">
                            <h3 class="listing-heading">${value.name}</h3>
                            <div class="listing-subheading">${value.city}</div>
                        </div>
                    </a>
                    <div class="listing-details">
                        <div class="listing-details-left">
                            <div class="div-block-2">
                                <img src="https://uploads-ssl.webflow.com/5b1fc5b60fbeaef6088a246c/5b1fc5b60fbeae0c598a24a5_listing_bed_icon.svg" class="listing-details-icon">
                                <div class="bedrooms">${value.bedrooms}</div>
                            </div>
                            <div class="div-block-2">
                                <img src="https://uploads-ssl.webflow.com/5b1fc5b60fbeaef6088a246c/5b1fc5b60fbeae32078a24a6_listing_bath_icon.svg" class="listing-details-icon">
                                <div>${bathText}</div>
                            </div>
                        </div>
                        <div class="listing-details-right">
                            <div class="listing-price-wrap">
                                <div class="listing-price-before">from</div>
                                <div class="listing-price"><span>$</span>${formattedRate}</div>
                                <div class="actual-rate hidden">${actualRate}</div>
                            </div>
                            <div class="listing-price-wrap">
                                <div>per night</div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            
            
            

            $('#resultsListing').html(resultsOutput);
            $('#listingsPh').remove();
            $('#resultsListing').css('height', 'auto');
        }
    });

    var propsLength = $('#resultsListing > div').length,
        showLoadMore = function(){
            $('#loadMoreResults .button').click(function() {
                var self = $(this);
                $(self).css('opacity', '0');
                
                setTimeout(function() {
                    $('#resultsListing > div').css('display', 'block');
                    $(self).closest('.button-wrapper').fadeOut(100);
                }, 1500);
            });
            
            return showLoadMore;
        };
    if (propsLength === 0) { //resultsFilter
        $('#noResultsPrefix').css('display','inline');
        $('.search-results-total').text('0 results').css('opacity','1');
        $('[data-item="hide"]').remove();
        showLoadMore();
    } else if (propsLength === 1){
        $('.search-results-total').text('1 result').css('opacity','1');
        $('#resultsListing > div:lt(1)').css('display', 'block');
        showLoadMore();
    } else if (propsLength > 1 && propsLength <= 21) { 
        $('.search-results-total').text(propsLength + ' results').css('opacity','1');
        $('#resultsListing > div:lt(21)').css('display', 'block');
        showLoadMore();
    } else if (propsLength > 21){
        $('.search-results-total').text(propsLength + ' results').css('opacity','1');
        $('.button-wrapper.load-more').fadeIn();
        $('#resultsListing > div:lt(21)').css('display', 'block');
        showLoadMore();
    }
    
    $('[data-visibility]').css('opacity','1');

    fadeinBg();
    showGallery();
    showhover();

    return listResults;
}

$(document).ready(function() {
    if ("propsData" in sessionStorage) {
        //GET PROPERTIES FROM SESSIONSTORAGE
        listResults();
    } else {
        //GET PROPERTIES FROM API
        myvr.properties({limit: 10000}).then(function(data) {
            sessionStorage.setItem('propsData', JSON.stringify(data.results));
            var props = JSON.parse(sessionStorage.getItem('propsData')),
                propsCount = props.length,
                tempOutput = '';
            
            props.forEach(function(object) { for (var key in object) { if (object[key] == null) object[key] = ''; } });

            for (var i = 0; i < propsCount; i++) {
                var key = props[i].key,
                    slug = props[i].slug,
                    newObjContent = '"' + slug + '"' + ':' + '"' + key + '",';

                tempOutput += `<div>${newObjContent}</div>`;
                $('#slugPopulate').html(tempOutput);
            }

            var sourceJSON = JSON.parse('{' + $('#slugPopulate').text().slice(0, -1) + '}');
            sessionStorage.setItem('propsKeys', JSON.stringify(sourceJSON));
            listResults();
        });
    }    
});



$(window).on("load", function(){
    
    // init Isotope
    var $grid = $('#resultsListing').isotope({
        itemSelector: '.third-block-wrap.listing',
        layoutMode: 'fitRows',
        getSortData: {
            location: '.listing-subheading',
            bedrooms: '.bedrooms parseInt',
            lowestprice: '.actual-rate parseInt',
            highestprice: '.actual-rate parseInt'
        }
    });

    // bind sort button click
    $('#sorts').on('click', '.select-droplink', function() {
        var sortByValue = $(this).attr('data-sort-by');
        setTimeout(function(){
            $grid.isotope({
                sortBy: sortByValue,
                sortAscending: {
                    location: true,
                    bedrooms: false,
                    lowestprice: true,
                    highestprice: false
                }
            });
        }, 200);
        $('#resultsListing > div').css('display', 'block');
        $(this).closest('.sorting-wrapper').siblings('.button-wrapper').fadeOut(100);
    });
    
    // change is-checked class on buttons
    $('#sorts').each(function(i, buttonGroup) {
        var $buttonGroup = $(buttonGroup);
        $buttonGroup.on('click', '.select-droplink', function() {
            $buttonGroup.find('.is-checked').removeClass('is-checked');
            $(this).addClass('is-checked');
        });
    });


    $('.insert-button').on('click', function() {
        // create new item elements
        var $items = getItemElement().add(getItemElement()).add(getItemElement());
        // insert new elements
        //$grid.isotope( 'insert', $items );
        $grid.append($items)
            // add and lay out newly appended items
            .isotope('appended', $items);
    });

    function getItemElement() {
        var $item = $('  <div class="element-item actinoid metal inner-transition " data-category="actinoid"></div>');
        var num = Math.floor(Math.random() * 1000);
        var name =
            $item.append(`
        <h3 class="name">${randomText()}</h3>
        <p class="symbol">${randomText().substr(0, 2)}</p>
        <p class="number">${num}</p>
        <p class="weight">${(Math.floor(Math.random() * num))}</p>
                   `);
        return $item;
    }

    function randomText() {
        var text = "";
        var possible = "abcdefghijklmnopqrstuvwxyz";

        for (var i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }
  
});