define([
    'modules/jquery-mozu',
    "doubletaptogo"
], function($, doubletaptogo) {


    

    //Sub Dropdown Menu
    function calculatingSubPosition() {
        var leftReference = $(".mz-header-content").offset().left,
            rightReference = leftReference + $(".mz-header-content").outerWidth(),
            colWidth = $(document).width() > 991 ? 235 : 175;
        $(".mz-sitenav-sub-container").css({ "left": 0, "right": "auto" }).addClass("calculating-position").removeClass("calculated-position").each(function() {
            var currentElemnt = $(this),
                leftPosition = -10,
                rightPosition = 0,
                currentDropWidth = 0;
            if ( currentElemnt.find(".sub-level-wrapper").length>=4 && $(document).width() <= 1025) {
                currentElemnt.find(".sub-level-image").hide();
            }
            else {
                currentElemnt.find(".sub-level-image").show();
            }
            currentDropWidth = (colWidth * currentElemnt.find(".sub-level-wrapper").length) + 35 + currentElemnt.find(".sub-level-image").outerWidth()||0;
            if (currentDropWidth < $(".container:eq(0)").outerWidth()) {
                leftPosition = currentElemnt.parents(".mz-sitenav-item").offset().left - 20 - leftReference;
                rightPosition = "auto";
                if (leftPosition + currentDropWidth + leftReference >= rightReference) {
                    leftPosition = "auto";
                    rightPosition = 0;
                } 
            }
            currentElemnt.css({ "left": leftPosition, "right": rightPosition });
        }).removeClass("calculating-position").addClass("calculated-position");
    }

    function mobileOpener() {
        var mobileMarker = $(document).width() > 992 ? false : true;
        var mobile = false;
        if (navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i)) {
            mobile = true;
        }

        if (mobileMarker || mobile) {
            var menu = $('.mz-sitenav-list');

            menu.find('.sub-level-li').each(function(){
                var currentItem = $(this);

                if (currentItem.find('.sub-sub-level-li').length){
                    currentItem.addClass('has-sub-category');
                }
            });

            $('.js-mobile-opener').off('click');
            $('li.mz-sitenav-item').off('click');

            $('li.mz-sitenav-item').on('click', function(event){
                if ($(this).hasClass('opened')) {
                    $('.opened', '.mz-sitenav-list').removeClass('opened');
                } else {
                    $('.opened', '.mz-sitenav-list').removeClass('opened');
                    $(this).toggleClass('opened');
                }
            }).on('click', '.js-mobile-opener', function(event){
                var currentItem = $(this).closest('li.mz-sitenav-item');

                if (!currentItem.hasClass('opened')){
                    event.preventDefault();
                    event.stopPropagation();
                    currentItem.addClass('opened');
                }
            }).on('click', '.has-sub-category > span', function(event){
                var currentSubItem = $(this).closest('.has-sub-category');

                if (event.target.tagName != 'A' && currentSubItem.hasClass('opened')) {
                    currentSubItem.removeClass('opened');
                    event.preventDefault();
                    event.stopPropagation();

                } else if ((event.target.tagName == 'A' && !currentSubItem.hasClass('opened')) || (event.target.tagName != 'A' && !currentSubItem.hasClass('opened'))) {
                    if ($('.has-sub-category').hasClass('opened')) {
                        $('.has-sub-category').removeClass('opened');
                    }
                    event.preventDefault();
                    event.stopPropagation();
                    currentSubItem.addClass('opened');
                }
            });
        } 
        
        if (!mobileMarker) {
            var hoverTO;

            $('li.mz-sitenav-item').mouseover(function() {
                var self = this;
                
                clearTimeout(hoverTO);

                hoverTO = setTimeout(function() {
                    $(self).addClass('opened');
                }, 250);
            }).mouseleave(function() {
                clearTimeout(hoverTO);
                $(this).removeClass('opened');
            });
        } else {
            $('li.mz-sitenav-item').off('mouseover').off('mouseleave');
        }
    }
    function navContainerVisible(el) {
        return $(el).closest('.mz-sitenav-link').next('.mz-sitenav-sub-container').css('display') === 'block';
    }
    function touchHandler(el) {
        $(el).bind('touchstart', function (e) {
            $(this).click(function () {
                return false;
            });
            var isVisible = navContainerVisible(e.target);

            if (!isVisible) {
                $(e.target).closest('li').trigger('mouseover');                
            } else {
                window.open(this.href, '_self');
            }
        });
    }

    function navLinksActions() {
        var isTablet = ($(window).width() >= 767 && $(window).width() <= 1024) ? true : false;

        if (isTablet) {
            $('li > a.mz-sitenav-link').each(function () {

                touchHandler(this);
            });
        }
    }

    var $military = $("#tab-military");
    $military.click(function() {
        console.log("MLT cookie");
       
       // var date = new Date();
       // var hours = 24;
       // date.setTime(date.getTime() + (hours* 60 * 60 * 1000));


        $.cookie("currentTab","MLT", { path: '/' }); // expires: date,
        console.log("MLT DONE");
        location.reload();
    });

    var $heavyduty = $("#tab-heavyduty");
    $heavyduty.click(function() {
        console.log("HVDT cookie");
        
        //var date = new Date();
        //var hours = 24;
        //date.setTime(date.getTime() + (hours* 60 * 60 * 1000));

        $.cookie("currentTab","",{   path: '/' }); //expires: date ,
        console.log("cookie DONE");
        location.reload();
    });

    var username = $('#my-account').text();
    function hideUserNameOnMobile() {
      if ($(window).width() <= 1024) {
        $('#my-account').text('');
      } else {
        $('#my-account').text(username);
      }
    }
    $(document).ready(function() {
      
        
        try {
            $('.sub-nav-section li:has(.sub-dropdown-menu)').doubletaptogo();
        } catch (e0) {
            //console.log('Error in loading: ' + e0);
        }
        hideUserNameOnMobile();
        navLinksActions();
        // hover delay function
    });
    $(window).resize(function() {
        //calculatingSubPosition();

        mobileOpener();
        hideUserNameOnMobile();
    });
    $('.sub-level-wrapper').each(function(index, el) {
        var html = $(el).html().trim();
        if (html === "")
            $(el).remove();
    });
    $('.sub-level-image.col-sm-3').each(function(index, el){
         var html = $(el).find('img').attr('src');
         if (html === "" || html === '#')
            $(el).remove();
    });
    mobileOpener();
    //calculatingSubPosition();
    //Footer Back to Top
    if ($(".back-to-top").length) {
        $(".back-to-top").click(function() {
            $("html, body").animate({ scrollTop: 0 }, 500);
        });
    }
});
