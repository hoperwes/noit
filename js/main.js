/*--------------------------------------------------
isMobile
--------------------------------------------------*/
function isMobile(){
	return( /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/).test(navigator.userAgent.toLowerCase() );
}

/*--------------------------------------------------
Browsers
--------------------------------------------------*/
var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);
var isIE10 = navigator.userAgent.toString().toLowerCase().indexOf("trident/6") > -1;
var isIE11 = !!navigator.userAgent.match(/Trident.*rv[ :]*11\./);

function oldBrowsers() {
    if (isIE10 === true) {
        $('html').addClass('msie10');
    }

    if (isIE11 === true) {
        $('html').addClass('msie11');
    }

    if (isSafari === true) {
        $('html').addClass('safari');
    }
}


/*--------------------------------------------------
Superfish
--------------------------------------------------*/
function generateOption(elem, dash) {
    var text = elem.text(),
        href = elem.attr('href');
    return '<option value="'+ href +'">' + dash + text + '</option>'
}

function menuToSelect($obj,title){
	//if ($obj.size()) {
		
	//	$obj.addClass('hidden-sm hidden-xs');
		
	//	var options = '<option selected>' + title  + '</option>';
	//	$obj.find('a').each(function () {
	//		var text = $(this).text(),
	//			url = $(this).attr('href'),
	//			parents = $(this).parent().parents('ul').length,
	//			dash = '',
	//			i = 1;
	//		for (i; i < parents; i++) { dash += '&ndash;&nbsp;'; }
	//		options += '<option value=" ' + url + '">' + dash + text + '</option>';
	//	});
	//	$('<select class="mobileMenu visible-sm visible-xs"></select>').append(options).appendTo($obj.parent());
	//	$('.mobileMenu').live('change',function(){
	//		location.href = $(this).val();
	//	});
    //}

    if ($obj.size()) {

        $obj.addClass('hidden-sm hidden-xs');

    	var options = '<option selected>' + title + '</option>';

    	$obj.find('.mnu-level-0').each(function () {
    	    if ($(this).parents('.sottomenu').size() > 0) {
    	        options += generateOption($(this), '-');

    	        var submenuPath = $(this).parents('.sottomenu').attr('class').split('has-').pop();

    	        var sublinks = $('.box_' + submenuPath).find('.mnu-level-1');

    	        for (var i = 0, len = sublinks.length ; i < len; i++) {
    	            options += generateOption(sublinks.eq(i), '---> ');
    	        }
    	    } else {
    	        options += generateOption($(this), '-');
    	    }


    	    //var text = $(this).text(),
    		//	url = $(this).attr('href'),
    		//	parents = $(this).parent().parents('ul').length,
    		//	dash = '&ndash',
    		//	i = 1;
    		//for (i; i < parents; i++) { dash += '&ndash;&nbsp;'; }
    		//options += '<option value=" ' + url + '">' + dash + text + '</option>';
    	});

    	$('<select class="mobileMenu visible-sm visible-xs"></select>').append(options).appendTo($obj.parent());

    	$('.mobileMenu').live('change', function () {
    		location.href = $(this).val();
    	});
    }


}


/*--------------------------------------------------
Ti richiamiamo noi
--------------------------------------------------*/

function tiRichiamiamoNoi() {
    $('.box_richiama').click(function(){
        $(this).children('form').slideDown();
    })
}


/*--------------------------------------------------
Sottomenu
--------------------------------------------------*/
function sottomenu() {
	
    $('.nav .sottomenu a').not($('.nav .sottomenu.has-ace a')).click(function () {
		$('#widget_video').hide();
		$('.wrap_sottomenu .box_sottomenu').hide();		
		$('.nav .sottomenu a').removeClass('active');
		$(this).addClass('active');			
		var src = $(this).attr('href');
		var src = src.replace('#', '');
		//alert (src);
		$('.wrap_sottomenu div.'+ src + '').show();
		return false;
	});
	
	$(document).click(function(e){
				if ($('.box_sottomenu').is(':visible')){
					if ($(e.target).parents('.wrap_sottomenu').size() == 0){
						$('.box_sottomenu').hide();
						$('.nav .sottomenu a').removeClass("active");
						
						$('#widget_video').show();
					}
				}
			});
	
}


/*--------------------------------------------------
Box disactive
--------------------------------------------------*/
function box_disactive() {
	$(".box_disactive").css({ opacity: 0.6 });
}


/*--------------------------------------------------
Mediagallery
--------------------------------------------------*/
function mediagallery() {
	$(".mediagallery img").css({ opacity: 0.4 });
	$(".mediagallery a")
	.mouseover(function(i){
		$(this).find("img").css({ opacity: 1 });
	}) 
	.mouseout(function() {
		$(this).find("img").css({ opacity: 0.4 });
	});
}


/*--------------------------------------------------
VideoHome
--------------------------------------------------*/
function VideoHome() {
    if (isMobile() && $("#linkVideo").length > 0) {
        var lnk = $("#linkVideo").val();
        if (lnk.indexOf('embed') == -1) {
            lnk = "https://www.youtube.com/embed" + lnk.substring(lnk.lastIndexOf('/'), lnk.lastIndexOf('?'));
        }
        $("#widget_video, #video_home a").fancybox({
            openEffect: 'none',
            closeEffect: 'none',
            nextEffect: 'none',
            prevEffect: 'none',
            padding: 10,
            type: 'iframe',
            href: lnk
        });
    } else {
	$('#video_home a').click(function(){
	    //if (isMobile()) {
	    //    window.open($("#linkVideo").val());
	    //} else {


	        //if ($(window).width() < 768) {
            //    alert("test");
            //    yt = '//www.youtube.com/v/uhq9bdCQMdg?rel=0&amp;hl=it_IT&amp;autoplay=1';
            //    //yt = 'http:' + $("iframe#thevideo").attr("src");
            //    console.log(yt);
    
            //    $(this).attr({ 'target': '_blank', 'href': yt })
                
            //} else {



	        $('#video_home').hide();
	        $('#widget_video').hide();
	    //$( ".carousel" ).append( '<div id="video_container"><a id="btn_close_video"></a><object width="100%" height="100%"><param name="movie" value="//www.youtube.com/v/uhq9bdCQMdg?rel=0&amp;hl=it_IT&amp;autoplay=1"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="//www.youtube.com/v/uhq9bdCQMdg?rel=0&amp;hl=it_IT&amp;autoplay=1" type="application/x-shockwave-flash" width="100%" height="100%" allowscriptaccess="always" allowfullscreen="true"></embed></object></div>' );
            if (isSafari || isIE10 || isIE11) {
	            var lnk = $("#linkVideo").val();
	            if (lnk.indexOf('embed') == -1) {
	                lnk = "https://www.youtube.com/embed" + lnk.substring(lnk.lastIndexOf('/'), lnk.lastIndexOf('?')) + "?rel=0&hl=it_IT&autoplay=1";
	            }
	            $(".carousel").append('<div id="video_container"><a id="btn_close_video"></a><iframe frameborder="0" width="100%" height="100%" id="thevideo" allowfullscreen="" src="' + lnk + '"></iframe></div>');
	        } else {
	            $(".carousel").append('<div id="video_container"><a id="btn_close_video"></a><object width="100%" height="100%" id="thevideo"><param name="movie" value="' + $("#linkVideo").val() + '"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="' + $("#linkVideo").val() + '" type="application/x-shockwave-flash" width="100%" height="100%" allowscriptaccess="always" allowfullscreen="true"></embed></object></div>');
	        }
	        
	        //$(".carousel").append('<div id="video_container"><a id="btn_close_video"></a><iframe frameborder="0" width="100%" height="100%" id="thevideo" allowfullscreen="" src="//www.youtube.com/v/uhq9bdCQMdg?rel=0&amp;hl=it_IT&amp;autoplay=1"></iframe></div>');

	        //$('#btn_close_video').click(function(){
	        $(document).on('click', '#btn_close_video', function () {
	            $('#video_container').remove();
	            //alert ("close");
	            $('#widget_video').show();
	            return false;
	        });
	    //}
				return false;
	
	});	
	
	$('#widget_video').click(function(){
		if(isMobile())
			window.open($("#linkVideo").val());
		else {
            $(this).hide();
            if (isSafari || isIE10 || isIE11) {
			    var lnk = $("#linkVideo").val();
			    if (lnk.indexOf('embed') == -1) {
			        lnk = "https://www.youtube.com/embed" + lnk.substring(lnk.lastIndexOf('/'), lnk.lastIndexOf('?')) + "?rel=0&hl=it_IT&autoplay=1";
			    }
			    $(".carousel").append('<div id="video_container"><a id="btn_close_video"></a><iframe frameborder="0" width="100%" height="100%" id="thevideo" allowfullscreen="" src="' + lnk + '"></iframe></div>');
			} else {
			    $(".carousel").append('<div id="video_container"><a id="btn_close_video"></a><object width="100%" height="100%" id="thevideo"><param name="movie" value="' + $("#linkVideo").val() + '"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="' + $("#linkVideo").val() + '" type="application/x-shockwave-flash" width="100%" height="100%" allowscriptaccess="always" allowfullscreen="true"></embed></object></div>');
			}
			/*$(".carousel").append('<div id="video_container"><a id="btn_close_video"></a><object width="100%" height="100%" id="thevideo"><param name="movie" value="https://www.youtube.com/watch?v=uhq9bdCQMdg?rel=0&amp;hl=it_IT&amp;autoplay=1"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="https://www.youtube.com/watch?v=uhq9bdCQMdg?rel=0&amp;hl=it_IT&amp;autoplay=1" type="application/x-shockwave-flash" width="100%" height="100%" allowscriptaccess="always" allowfullscreen="true"></embed></object></div>');*/
			$(document).on('click','#btn_close_video',function(){
				$('#video_container').remove();
				//alert ("close");
				$('#widget_video').show();
				return false;
			});
		}
		return false;
	});

    }
}

/*--------------------------------------------------
Casi clinici: Over su Gallery
--------------------------------------------------*/
function OverGallery(){
	$('.gallery_caso .slide div').hide();
	$('.photogallery .slide div').hide();
	
	$('.slide').hover(function(){
		    $(this).find('div').fadeIn();
		}, function(){
		    $(this).find('div').fadeOut();
		});
		
}

/*--------------------------------------------------
Mobile menu link
--------------------------------------------------*/
function mobileMenuLink() {
    if ($('.mobileMenu').is(':hidden')) {
        return false;
    } else {
        return true;
    }
}

/*--------------------------------------------------
Set Placeholder
--------------------------------------------------*/
function setPlaceholder($input) {
    $input.each(function () {
        if ($(this).val() == "") {
            $(this).val($(this).attr('placeholder'));
        }
    });
    $('[placeholder]').parents('form').submit(function () {
        $(this).find('[placeholder]').each(function () {
            var input = $(this);
            if (input.val() == input.attr('placeholder')) {
                input.val('');
            }
        })
    });
}

/*--------------------------------------------------
Validate(form)
--------------------------------------------------*/
function validate(form) {
    var valid = true;
    $('input.required', form).each(function () {
        if ($(this).attr("type") == "checkbox") {
            if ($(this).is(':checked')) {
                $(this).removeClass('error');
            } else {
                valid = valid && false;
                $(this).addClass('error');
            }
        } else if ($(this).val() == $(this).attr('placeholder') || $(this).val() == "") {
            valid = valid && false;
            $(this).addClass('error');
        } else {
            $(this).removeClass('error');
        }
    });
    $('select.required').each(function () {
        if ($(this).val() == "") {
            valid = valid && false;
            $(this).addClass('error');
        } else {
            $(this).removeClass('error');
        }
    });
    return valid;
}

/*--------------------------------------------------
Validate(field)
--------------------------------------------------*/
function validateField($field) {
    if ($field.val() == $field.attr('placeholder') || $field.val() == "") {
        $field.addClass('error');
        return false;
    } else {
        $field.removeClass('error');
        return true;
    }
}

/*--------------------------------------------------
DOC READY
--------------------------------------------------*/
$(document).ready(function (e) {

    oldBrowsers();
	
	if(isMobile() && $("#wrap_foo1").length > 0){
		var height_wrapper = $(".wrap_corpo > .container").innerWidth() / 19 * 9;
		$("#wrap_foo1").height(height_wrapper);
	}
		
	OverGallery();
	tiRichiamiamoNoi();
	
	if ($("#hp_slideshow").size()){
		$('#hp_slideshow').show().carouFredSel({
			auto: false,
			responsive: true,
			scroll: {
				fx: 'crossfade',
				pauseOnHover: true,
				duration        : 800
			},
			items: {
				visible: 1,
				width: 850,
				height: '46%'
			},
			pagination: {
				container: '#hp_slideshow_pag',
				anchorBuilder: function(nr) {
					text = '<p>' + $(this).find('h4').text() + '</p>';
					var href = $("a", this).attr("href");//.attr("src");
					//img = '<div class="img"><img src="img/skill-image' + nr + '.png" /></div>';
					//return '<div class="col-sm-3 skills sk_' + nr + '"><div class="wrap_sk">' + img + text + '</div></div>';
					return '<div class="col-sm-3 skills sk_' + nr + '"><div class="wrap_sk"><a href="/' + href + '">' + text + '</a></div></div>';
				}
			},
			swipe: {
				onTouch: true,
				onMouse: true
			}
			
		});
	};

	if( /Android|iPhone/i.test(navigator.userAgent) ) {
		$('a.casi_clinici').on('click', function (e) {
			e.preventDefault();
			return false;
		});
		
		$(".notouch").hide();
		
	}
	$('html.touch a.casi_clinici').on('click', function (e) {
	    if ($("a.casi_clinici.notouch:not(:visible)").length>0) {
	        e.preventDefault();
	        return false;
	    }
	});
	
	/*
	COMMENTO L'OVER SUI TABS DELLO SHOWREEL IN HOME
	
	$('#hp_slideshow_pag .skills').mouseover(function(i){
		$(this).trigger('click');
	});*/
	
	setTimeout(function() {
		$("#video_home").fadeOut(300);
		$('#hp_slideshow').trigger('play',true);
	}, 10000);
	
	if ($("#foo1").size()) {
	    $("#foo1").carouFredSel({
	        items: {
	            visible: 1,
	            //width: 960,
	            //height: '56%'
	            width: 'auto',
	            height: 'auto'
	        },
	        scroll: {
	            fx: "crossfade",
	            pauseOnHover: true,
	            duration: 800
	        },
	        auto: false,
	        responsive: false,
	        pagination: {
	            container: "#photogallery_pag",
	            anchorBuilder: function (nr) {
	                var src = $("img", this).attr("data-thumb");//.attr("src");
	                //src = src.replace( "_z_", "_t_");
	                return '<div class="wrap_img"><div class="numero">' + nr + '</div><img src="' + src + '" /></div>';
	            }
	        },
	        width: 'auto',
	        height: 'auto',
	        onCreate: function () {
	            $('.slide img').eq(0).load(function () {
	                $('.caroufredsel_wrapper').height($(this).height());
	            });
	        }
	    });

	    $(window).on('resize', function () {
            if(isMobile)
                $('.caroufredsel_wrapper').height($('.slide img').eq(0).height());
	    });
	};
	
	if ($("#foo2").size()){
		$("#foo2").carouFredSel({
			items: {
				visible: 1,
				width: 850,
				height: '70%'
			},
			scroll		: {
				fx			: "crossfade",
				pauseOnHover: true, 
				duration        : 800
			},
			auto		: true,
			responsive: true,
			pagination	: {
				container		: ".pager"
			}
		});
	};
	
	setTimeout(function() {
		$('#foo1').trigger('play',true);
	}, 2000);
	
					
    sottomenu();
	box_disactive();
	$('ul.nav').superfish({
		delay: 500,
		// one second delay on mouseout 
		animation: {
			opacity: 'show',
			height: 'show'
		},
		// fade-in and slide-down animation 
		speed: 'fast',
		// faster animation speed 
		autoArrows: true,
		// disable generation of arrow mark-up 
		dropShadows: false // disable drop shadows 
	});
	
	// SuperFish Menu to Select
	menuToSelect($('ul.nav'),'Menù');
	mediagallery();
	
	$(".media_foto a").fancybox({
          helpers: {
              title : {
                  type : 'over'
              }
          }
      });
	  
	$(".media_video a, a.info, a.info_relatore, a#video_youtube").fancybox({
        openEffect  : 'none',
        closeEffect : 'none',
        nextEffect  : 'none',
        prevEffect  : 'none',
        padding     : 10,
        //margin      : [20, 60, 20, 60], // Increase left/right margin
		type		: 'iframe'
	});

	if ($("#linkVideo").length>0) {
	    var lnk = $("#linkVideo").val();
	    if (lnk.indexOf('embed') == -1) {
	        lnk = "https://www.youtube.com/embed" + lnk.substring(lnk.lastIndexOf('/'), lnk.lastIndexOf('?'));
	    }
	    $("a#video_youtube").fancybox({
	        openEffect: 'none',
	        closeEffect: 'none',
	        nextEffect: 'none',
	        prevEffect: 'none',
	        padding: 10,
	        //margin      : [20, 60, 20, 60], // Increase left/right margin
	        type: 'iframe',
	        href: lnk 
	    });
	}

	/*
	$("a#video_youtube").fancybox({
        maxWidth	: 800,
		maxHeight	: 600,
		fitToView	: true,
		width		: '70%',
		height		: '70%',
		autoSize	: true,
		closeClick	: true,
		type		: 'iframe'
    });*/
	
	/*$("a.casi_clinici").fancybox({
        openEffect  : 'none',
        closeEffect : 'none',
        nextEffect  : 'none',
        prevEffect  : 'none',
        padding     : 10,
        //margin      : [20, 60, 20, 60], // Increase left/right margin
		//type		: 'iframe',
		width		: 960,
		//height	: 500,
		autoResize   : 'true',
		beforeShow : function(){
			$('.fancybox-iframe').load(function() { // wait for frame to load and then gets it's height
				$('.fancybox-inner').height($(this).contents().find('body').height()+30);
			 });
		}
    });*/
	
	//$('.casi_clinici').addClass('fancybox.iframe');
	$("a.casi_clinici").fancybox({
	    minWidth    : 698,
	    //maxHeight   : 390,
	    width       : 'auto',
        height      : 'auto',
		fitToView	: false,
		autoCenter	: true,
		autoSize	: true,
		closeClick	: false,
		openEffect	: 'none',
		closeEffect: 'none',
	    showNavArrows: true,
		afterShow	: function() {
			$('.fancybox-wrap').css("opacity", "0");
			$.fancybox.showLoading();
			setTimeout(
				function () {
				    $('.fancybox-inner').height($('.fancybox-iframe').contents().find('.tmpl_dett_caso').height());
					$('.fancybox-wrap').css("opacity", "1");
					$.fancybox.hideLoading();
				}, 1000);
		},
	    beforeLoad: function() {
	        var url = $(this.element)[0].getAttribute("data-pagina");
	        this.href = url
	    }
	});
	
	VideoHome();
	$('#btn_close_video').click(function(){
			$('#video_container').hide();
			$.fancybox.close();
			alert ("close");
			return false;
	});
	
	$(".wrap_sk a").click(function(){
		var new_link = $(this).attr('href');
         window.location = new_link;    
	});

	if ($('.lt-ie9').length > 0 || $('.ie9').length > 0) {
	    setPlaceholder($('.wrap_corpo:not(.tmpl_newsletter) input'));

	    $('.wrap_corpo:not(.tmpl_newsletter) input').on('focusout', function () {
	        if($(this).val() == "") {
	            $(this).val() == $(this).attr('placeholder');
	        }
	        setPlaceholder($(this));
	        if ($(this).hasClass('required'))
	            return validateField($(this));
	    });

	    $('.wrap_corpo:not(.tmpl_newsletter) input').on('click', function () {
	        if ($(this).val() == $(this).attr('placeholder')) {
	            $(this).val("");
	        } //else {
	        //    $(this).attr('val', $(this).val());
	        //}
	        //setPlaceholder($(this).siblings());
	    });

	    $('.tmpl_home .form_contattaci a[title="Invia"], .tmpl_contatti .form_contattaci a[title="Invia"], #form_preiscriviti a[title="Invia"], #form_richiamiamo a[title="Invia"]').on('click', function () {
	        setPlaceholder($('.wrap_corpo:not(.tmpl_newsletter) input'));
	        return validate($(this).closest('form'));
	    });
	}
	
});

/*--------------------------------------------------
WINDOW LOAD
--------------------------------------------------*/
$(window).load(function(){
	$(window).trigger('resize');
	
	$(".wrap_sk a").click(function(){
		var new_link = $(this).attr('href');
         window.location = new_link;    
	});
  
});

/*--------------------------------------------------
WINDOW RESIZE
--------------------------------------------------*/
$(window).resize(function() {
	if(isMobile() && $("#wrap_foo1").length > 0){
		var height_wrapper = $(".wrap_corpo > .container").innerWidth() / 19 * 9;
		$("#wrap_foo1").height(height_wrapper);
	}
	
	
  
});
