/*==========================================

  ** This renders results based on URL search parameters to filter content queried in the global booking calendar

  ==========================================*/

var getUrlParameter = function getUrlParameter(sParam) {
  var sPageURL = decodeURIComponent(window.location.search.substring(1)),
      sURLVariables = sPageURL.split('&'),
      sParameterName,
      i;

  for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split('=');

      if (sParameterName[0] === sParam) {
          return sParameterName[1] === undefined ? true : sParameterName[1];
      }
  }
},
pDest = getUrlParameter('destination'),
pStartDate = getUrlParameter('start_date'),
pEndDate = getUrlParameter('end_date'),
pGuests = getUrlParameter('guests'),
pMinRate = getUrlParameter('min_rate'),
pMaxRate = getUrlParameter('max_rate');

$(document).ready(function() {

myvr.properties({
  limit: 1500,
  group: pDest,
  accommodates: pGuests,
  startDate: pStartDate,
  endDate: pEndDate,
  currency: "USD",
  lowestRateMin: pMinRate,
  lowestRateMax: pMaxRate
}).then(function(data) {
  var propsResults = data.results,
      propsResultsLength = propsResults.length,
      propResultsOutput = '';
  
  propsResults.forEach(function(object) { for (var key in object) { if (object[key] == null) object[key] = ''; } });
  
  for (var i = 0; i < propsResultsLength; i++) {
      var excerptSource = propsResults[i].description,
          tempEl = $('<div>' + excerptSource + '</div>').stripTags(),
          tempEl2 = $('<div="tempEl2"></div>'),
          descParts = $(tempEl).text().split('.'),
          descFirstPart = descParts.shift().substring(0, 140) + '...',
          apiRate = $('<div>' + propsResults[i].lowestRate + '</div>').text(),
          actualRate = $('<div>' + propsResults[i].lowestRate + '</div>').text().slice(0,-2),
          formattedRate = actualRate.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"), //+ "." + apiRate.slice(-2),
          bathTextOrig = propsResults[i].bathrooms,
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

      propResultsOutput += `

          <div class="third-block-wrap listing" data-ix="initial-hidden">
              <a href="/luxury-villas/villa?name=${propsResults[i].slug}" data-image="parent" data-property-key="${propsResults[i].key}" class="full-height-link listing w-inline-block">
                  <div class="slate-blue-tint _20"></div>
                  <div class="bg-wrapper" data-image="bg"></div>
                  <img src="http:${propsResults[i].photo.smallUrl}" class="full-width-image" data-image="source">
                  <div class="hover-content-overlay" data-ix="initial-invisible-hidden">
                      <div class="block-overlay-content">
                          <div class="overlay-content-heading listing">${propsResults[i].name}</div>
                          <p class="p-content-excerpt">${descFirstPart}</p>
                          <div class="view-details-listings">view details</div>
                      </div>
                  </div>
                  <div class="title-content">
                      <h3 class="listing-heading">${propsResults[i].name}</h3>
                      <div class="listing-subheading">${propsResults[i].city}</div>
                  </div>
              </a>
              <div class="listing-details">
                  <div class="listing-details-left">
                      <div class="div-block-2">
                          <img src="https://uploads-ssl.webflow.com/5b1fc5b60fbeaef6088a246c/5b1fc5b60fbeae0c598a24a5_listing_bed_icon.svg" class="listing-details-icon">
                          <div class="bedrooms">${propsResults[i].bedrooms}</div>
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

      $('#propResultsListing').html(propResultsOutput);
  }
}).then(function() {
    var propsResultsLength = $('#propResultsListing > div').length,
        showLoadMore = function(){
        $('#loadMoreResults .button').click(function() {
            var self = $(this);
            $(self).css('opacity', '0');

            setTimeout(function() {
                $('#propResultsListing > div').css('display', 'block');
                $(self).closest('.button-wrapper').fadeOut(100);
            }, 1500);
        });

        return showLoadMore;
    },
        dest = '';
    
    

    if (propsResultsLength === 0) { //resultsFilter
        $('.no-prop-results').css('display','block');
        $('.search-results-total').text('0 results');
        $('.sorting-wrapper').css('opacity','1');
        $('[data-item="hide"]').remove();
        showLoadMore();
    } else if (propsResultsLength === 1){
        $('.search-results-total').text('1 result');
        $('.sorting-wrapper').css('opacity','1');
        $('#propResultsListing > div:lt(1)').css('display', 'block');
        showLoadMore();
    } else if (propsResultsLength > 1 && propsResultsLength <= 21) {
        $('.props-results-found').css('display','block');
        $('.search-results-total').text(propsResultsLength + ' results');
        $('.sorting-wrapper').css('opacity','1');
        $('#propResultsListing > div:lt(21)').css('display', 'block');
        showLoadMore();
    } else if (propsResultsLength > 21){
        $('.props-results-found').css('display','block');
        $('.search-results-total').text(propsResultsLength + ' results');
        $('.sorting-wrapper').css('opacity','1');
        $('.button-wrapper.load-more').fadeIn();
        $('#propResultsListing > div:lt(21)').css('display', 'block');
        showLoadMore();
    }

    $('#propRefineButton .button').click(function(){
        $('.av-open,.av-open-mobile').trigger('click');
    });
    
    $('#listingsPh').remove();
    $('#propResultsListing').css('height', 'auto');

    fadeinBg();
    showGallery();
    showhover();
    getCurrency();

  });
});

$(window).on("load", function(){

// init Isotope
var $grid = $('#propResultsListing').isotope({
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
  $('#propResultsListing > div').css('display', 'block');
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


});