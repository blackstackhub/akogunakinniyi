(function($) {

    "use strict";
	$(window).on("load", function() {	
	
		/* ----------------------------------------------------------- */
        /*  TEXT ROTATOR ANIMATION
        /* ----------------------------------------------------------- */
		if ($("#selector").length) {
			$("#selector").animatedHeadline({
				 animationType: "clip"
			});
		}
		
	});

    jQuery(document).ready(function($) {
		
		/* ----------------------------------------------------------- */
        /*  STRETCHY NAVIGATION
        /* ----------------------------------------------------------- */
		
		if ($(".cd-stretchy-nav").length > 0) {
			var n = $(".cd-stretchy-nav");
			n.each(function() {
				var n = $(this),
					t = n.find(".cd-nav-trigger");
				t.on("click", function(t) {
					t.preventDefault(), n.toggleClass("nav-is-visible")
				})
			}), $(document).on("click", function(t) {
				!$(t.target).is(".cd-nav-trigger") && !$(t.target).is(".cd-nav-trigger span") && n.removeClass("nav-is-visible");
			})
		}
		$("body.light.dark-header .cd-stretchy-nav ul li a").on('click', function() {
			if ($(this).hasClass("home")) {
				$(".cd-stretchy-nav").addClass('lighter');
			}
			else
			{
				$(".cd-stretchy-nav").removeClass('lighter');
			}
		});
		
		$("body.light.dark-header .link-family-one, body.light.dark-header .link-family-two").on('click', function() {
			$(".cd-stretchy-nav").removeClass('lighter');
		});
		$("body.light #family-items li a").on('click', function() {
			$(".cd-stretchy-nav").addClass('lighter-in-family');
		});
		/* ----------------------------------------------------------- */
        /*  LINK TO CAREER SECTION
        /* ----------------------------------------------------------- */
 
		$(".link-family-one").on("click", function(e) {
			var tabNum = $(this).index();
			var nthChild = tabNum + 3;
			$("#main > section.active").removeClass("active");
			$("#main > section:nth-child(" + nthChild + ")").addClass("active");
			$(".stretchy-nav li:first-child").removeClass("active");
			$(".stretchy-nav li:nth-child(2)").addClass("active");
			 e.preventDefault();
        });
		
		/* ----------------------------------------------------------- */
        /*  LINK TO FAMILY SECTION
        /* ----------------------------------------------------------- */
		
		$(".link-family-two").on("click", function(e) {
			var tabNum = $(this).index();
			var nthChild = tabNum + 3;
			$("#main > section.active").removeClass("active");
			$("#main > section:nth-child(" + nthChild + ")").addClass("active");
			$(".stretchy-nav li:nth-child(1)").removeClass("active");
			$(".stretchy-nav li:nth-child(3)").addClass("active");
			 e.preventDefault();
        });
		
        /* ----------------------------------------------------------- */
        /*  PAGE ANIMATION
        /* ----------------------------------------------------------- */

        checkScreenSize();

        function checkScreenSize() {
            var newWindowWidth = $(window).width();
            if (newWindowWidth < 1025) {
                $('#nav > li').on('click', function(e) {
                    e.preventDefault();
                    $('#main').addClass('open');
                });
            } else {}
        }
        var resizeTimer;
        $(window).on('resize', function(e) {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                checkScreenSize();
            }, 250);
        });
		
		
		/* ----------------------------------------------------------- */
        /*  MAIN NAVIGATION MENU
        /* ----------------------------------------------------------- */
 
        // MAIN NAVIGATION MENU
        $(".navigation > li, .stretchy-nav > li").on("click", function(e) {
            if (!$(this).hasClass("active")) {
                var tabNum = $(this).index();
                var nthChild = tabNum + 2;
                $(".navigation > li.active, .stretchy-nav > li.active").removeClass("active");
                $(this).addClass("active");
                $("#main > section.active").removeClass("active");
                $("#main > section:nth-child(" + nthChild + ")").addClass("active");
				$(".cd-stretchy-nav").removeClass('lighter-in-family');
            }
			e.preventDefault();
			if (($('.project-info-container').hasClass('slide-in')) && ($(window).width() > 1024)){
				setTimeout(function(){ 
					$('.project-info-container').removeClass('slide-in');
				$('.close-project').removeClass('is-visible');
				if( is_firefox ) {
					$('.family-container').removeClass('slide-out').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
						$('.family-container').removeClass('overflow-hidden');
					});
				} else {
					$('.family-container').removeClass('slide-out');
					$('.family-container').removeClass('overflow-hidden');
				}
				}, 600);
				
			}
        });
		
		/* ----------------------------------------------------------- */
        /*  SHOW/HIDE SECTIONS
        /* ----------------------------------------------------------- */
		
        if (window.location.hash && $('#link-' + window.location.hash.replace(/^#/, '')).length) {
            $('#link-' + window.location.hash.replace(/^#/, '')).trigger('click');
        }
        window.userInteractionTimeout = null;
        window.userInteractionInHTMLArea = false;
        window.onBrowserHistoryButtonClicked = null;
        $(document).ready(function() {
            $(document).mousedown(function() {
                clearTimeout(window.userInteractionTimeout);
                window.userInteractionInHTMLArea = true;
                window.userInteractionTimeout = setTimeout(function() {
                    window.userInteractionInHTMLArea = false;
                }, 500);
            });
            $(document).keydown(function() {
                clearTimeout(window.userInteractionTimeout);
                window.userInteractionInHTMLArea = true;
                window.userInteractionTimeout = setTimeout(function() {
                    window.userInteractionInHTMLArea = false;
                }, 500);
            });
            if (window.history && window.history.pushState) {
                $(window).on('popstate', function() {
                    if (!window.userInteractionInHTMLArea) {
                        if (window.location.hash && $('#link-' + window.location.hash.replace(/^#/, '')).length) {
                            $('#link-' + window.location.hash.replace(/^#/, '')).trigger('click');
                        }
                        if (!window.location.hash) {
                            $('#link-work').trigger('click');
                        }
                    }
                    if (window.onBrowserHistoryButtonClicked) {
                        window.onBrowserHistoryButtonClicked();
                    }
                });
            }
        });
		
		/* ----------------------------------------------------------- */
        /*  BACK TO MAIN SECTION IN MOBILE
        /* ----------------------------------------------------------- */

        $('#back-mobile').on('click', function(e) {
            $('#main').removeClass('open');
        });	
		
		
		/* ----------------------------------------------------------- */
        /*  FAMILY SHOW SLIDE
        /* ----------------------------------------------------------- */

		var is_firefox = navigator.userAgent.indexOf('Firefox') > -1;

		$('.family-section').find('ul a').on('click', function(event){
			event.preventDefault();
			var selected_member = $(this).data('type');
			$('.project-info-container.'+selected_member+'').addClass('slide-in');
			$('.close-project').addClass('is-visible');
			
			// firefox transitions break when parent overflow is changed, so we need to wait for the end of the trasition to give the body an overflow hidden
			if( is_firefox ) {
				$('.family-container').addClass('slide-out').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
					$('.family-container').addClass('overflow-hidden');
				});
			} else {
				$('.family-container').addClass('slide-out');
				$('.family-container').addClass('overflow-hidden');
			}
			
			if ($(window).width() < 1025) {
				$('#back-mobile').css('pointer-events','none');
			}
			

		});

		/* ----------------------------------------------------------- */
        /*  FAMILY HIDE SLIDE
        /* ----------------------------------------------------------- */

		$(document).on('click', '.close-project, .family-overlay', function(event){
			event.preventDefault();
			$('.project-info-container').removeClass('slide-in');
			$('.close-project').removeClass('is-visible');
			stop_videos();
			$(".cd-stretchy-nav").removeClass('lighter-in-family');
			if( is_firefox ) {
				$('.family-container').removeClass('slide-out').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
					$('.family-container').removeClass('overflow-hidden');
				});
			} else {
				$('.family-container').removeClass('slide-out');
				$('.family-container').removeClass('overflow-hidden');
			}
			
			if ($(window).width() < 1025) {
				$('#back-mobile').css('pointer-events','auto');
			}
		});
		
		/* ----------------------------------------------------------- */
        /*  SLIDER IN FAMILY
        /* ----------------------------------------------------------- */
		$('.family-slider').carousel({
			pause: true,
			interval: false
		});
		
	});
	
	
    /* ----------------------------------------------------------- */

})(jQuery);

function nomenubar(){
	$('.cd-stretchy-nav').hide()
}
function themenubar(){
	$('.cd-stretchy-nav').show()
}