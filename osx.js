$(document).ready(function(){
	$('#main_menubar,#content,#sidebar').css('opacity','0');
	setTimeout(function(){
		$('#content').animate({opacity:1}, 600);
		$('#main_menubar').animate({opacity:1}, 100);
		setTimeout(function(){
			$('#sidebar').css('opacity','1');
			$('#dock').animate({'margin-bottom':0}, 500);
		}, 600);
	}, 1000);
	
	document.addEventListener("contextmenu", function(e){
    		e.preventDefault();
	}, false);
	
	//launchpad
	
	var icon_n = 0, icon_left = $(window).width()/2 - 630, icon_top = 0;
	$('#launchpad ul li').each(function(){
		$(this).css({
			'margin-left':icon_left+90-($(this).width()*.5)+'px',
			'margin-right':90-($(this).width()*.5)+'px'
			//'margin-top':icon_top+'px',
		});
		icon_left = 0;
		if(icon_n % 7 == 6){
			icon_left = $(window).width()/2 - 630;
			icon_top += 140;
		}
		icon_n++;
	});
	
	var sidebar = 0,
		z_top = 0;
	var mouseX, mouseY;
	
	$('.sidebar_btn').on('click', function(){
		if(sidebar)
			$('#content').css('left', '0');
		else
			$('#content').css('left', '-300px');
		sidebar = !sidebar;
	});
	$('#content').on('mousedown', function(){
		if(sidebar)
			$('#content').css('left', '0');
		sidebar = 0;
	});
	
	$('#content').on('mousedown', function(e){
    		if(e.which == 3){
    			$('#desktop_menu').removeClass('window_closed');
    			$('#desktop_menu').css({
	    			'margin-left':mouseX+'px',
	    			'margin-top':mouseY-24+'px'
    			});
			$('#desktop_menu').children('ul').css({
				'left':'0',
				'right':'inherit',
				'top':'0',
				'bottom':'inherit'
			});
			$('#desktop_menu').children('ul').children('li').children('ul').each(function(){
				$(this).css({
					'left':'100%',
					'right':'inherit'
				});
			});
			var rightCoor = $('#desktop_menu').offset().left + $('#desktop_menu').children('ul').width(),
				topCoor = $('#desktop_menu').offset().top + $('#desktop_menu').children('ul').height();
			if(rightCoor > $(window).width()){
				$('#desktop_menu').children('ul').css({
					'left':'inherit',
					'right':'0'
				});
				$('#desktop_menu').children('ul').children('li').children('ul').each(function(){
					$(this).css({
						'left':'inherit',
						'right':'100%',
						'border-top-left-radius':'5px',
						'border-top-right-radius':'0px'
					});
				});
			}
			if(topCoor > $(window).height()){
				$('#desktop_menu').children('ul').css({
					'top':'inherit',
					'bottom':'100%'
				});
			}
		}
		else if(e.which == 1){
			$('#desktop_menu').animate({'opacity':'0'}, 100);
			setTimeout(function(){
				$('#desktop_menu').css('opacity','1');
	    			$('#desktop_menu').addClass('window_closed');
			}, 160);
		}
	});
	$('#sidebar #sidebar_bot li').mouseover(function(){
		$(this).css('background', '#2B5DCE');
	});
	$('#sidebar #sidebar_bot li').mouseleave(function(){
		$(this).css('background', 'none');
	});
	$('#sidebar .noti_close').on('click', function(){
		var $ul = $(this).parent();
		$ul.next().css({
			'margin-top':-$ul.height()+'px'
		});
		$ul.css({
			'opacity':'0',
			'-webkit-transform':'translateY(-30px)'
		});
		$(this).css({
			'display':'none',
		});
		setTimeout(function(){
			$ul.css({
				'visibility': 'hidden',
			});
		}, 500);
	});

	$('#sidebar #sidebar_layout').css('height',window.innerHeight - 50);
	$(window).resize(function(){
		$('#sidebar #sidebar_layout').css('height',window.innerHeight - 50);
	});
	
	$('#main_menubar ul').not('ul ul ul').each(function(){
		var rightCoor = $(this).parent().parent().offset().left + $(this).width();
		if(rightCoor > $(window).width()){
			$(this).css({
				'left':'inherit',
				'right':'0'
			});
			$(this).children('li').children('ul').each(function(){
				$(this).css({
					'left':'inherit',
					'right':'100%'
				});
			});
		}
	});
	
	date_time("system_time");
	
	$( "#about_this_mac" ).draggable({
		containment: ".window",
		handle:"#title"
	});
	$( "#about_this_proj" ).draggable({
		containment: ".window",
		handle:"#title"
	});
	$( "#browser" ).draggable({
		containment: ".window",
		handle:"#title"
	});
	$( "#about_finder" ).draggable({
		containment: ".window",
		handle:"#title"
	});
	$("#browser").resizable({
		handles: "n, e, s, w, se, sw, nw, ne",
		stop: function( event, ui ) {
			$(".window_content").each(function(){
				$(this).height($(this).parent().height() - $(this).position().top);
			});
		}
	});

	$(".window_content").each(function(){
		$(this).height($(this).parent().height() - $(this).position().top);
	});

	$(".window").each(function(){
		$(this).height($(this).parent().height() - 24);
	});

	$('.window_default').each(function(){
		if($(this).offset().left + $(this).width() > $(window).width()){
			$(this).width($(window).width() - $(this).offset().left);
		}
		if($(this).offset().top + $(this).height() > $(window).height() - 24){
			$(this).height($(window).height() - $(this).offset().top - 24);
		}
	});
	
	function new_window(win){
		z_top++;
		win.css('z-index',z_top);
		$('.window_default').removeClass('window_focus');
		win.addClass('window_focus');
		
		$('.window_default').on('mousedown', function(){
			z_top++;
			$(this).css('z-index',z_top);
			$('.window_default').removeClass('window_focus');
			$(this).addClass('window_focus');
		});

		$('.close_btn').on('click', function(){
			$(this).parent().parent().fadeOut(100);
		});
	
		$('.maxm_btn').not('.btn_unable').on('click', function(){
			var $tmp = $(this).parent().parent();
			$tmp.width($('.screen_area').width() - 2);
			$tmp.height($('.screen_area').height() - 2);
			$tmp.css({
				'left':'1px',
				'top':'1px'
			});
			$(".window_content").each(function(){
				$(this).height($(this).parent().height() - $(this).position().top);
			});
		});
		
		$(".window_content").each(function(){
			$(this).height($(this).parent().height() - $(this).position().top);
		});
		
		$(".window").each(function(){
			$(this).height($(this).parent().height() - 24);
		});
		
		$('.window_default').each(function(){
			if($(this).offset().left + $(this).width() > $(window).width()){
				$(this).width($(window).width() - $(this).offset().left);
			}
			if($(this).offset().top + $(this).height() > $(window).height() - 24){
				$(this).height($(window).height() - $(this).offset().top - 24);
			}
		});
	}
	
	var current_window = "finder";
	$('.window_default').on('mousedown', function(){
		z_top++;
		$(this).css('z-index',z_top);
		$('.window_default').removeClass('window_focus');
		$(this).addClass('window_focus');
		if($(this).attr('id') =='browser'){
			if(current_window != "browser"){	$('.menubar_current').html('<li> <p><b>NOYA Browser</b></p><ul><li id="about_browser_btn"><p>About NOYA Browser</p></li><div class="split_line"></div> <li> <p>Preferences...</p><div class="right_arrow_space"></div><div class="right_arrow">⌘,</div> </li> <div class="split_line"></div> <li> <p>Empty Trash...</p> <div class="right_arrow_space"></div> <div class="right_arrow">⇧⌘⌫</div> </li> <li> <p>Secure Empty Trash...</p> </li> <div class="split_line"></div> <li> <p>Services</p> <div class="right_arrow_space">▶</div> <div class="right_arrow">▶</div> <ul> <li> <div class="left_check">✓</div> <p>Automatic</p> </li> <li> <p>Location (12-12-15 PM2:06)</p> </li> <li> <p>Location (12-12-15 PM2:07)</p> </li> <li> <p>Location (12-12-21 PM3:50)</p> </li> <div class="split_line"></div> <li> <p>Network Preferences...</p> </li> </ul> </li> <div class="split_line"></div> <li> <p>Hide Finder</p> <div class="right_arrow_space">⌘H</div> <div class="right_arrow">⌘H</div> </li> <li> <p>Hide Others</p> <div class="right_arrow_space">⌥⌘H</div> <div class="right_arrow">⌥⌘H</div> </li> <li class="grey_li"> <p>Show All</p> </li> </ul> </li> <li> <p>File</p> </li> <li> <p>Edit</p> </li> <li> <p>View</p> </li> <li> <p>History</p> </li> <li> <p>Bookmarks</p> </li> <li> <p>Window</p> </li> <li> <p>Help</p> <ul class="spotlight"> <li class="spotlight_bar"> <p>Search</p> <input type="search"> </li> <div class="split_space"></div> <li> <p>NOYA BrowserHelp</p> </li> <div class="split_space"></div> </ul> </li>');current_window = "browser";
			$('.screen_area').append('<div id="about_browser" class="window_default window_closed"><div id="title"><div class="close_btn"><p>×</p></div><div class="mini_btn btn_unable"><p>-</p></div>	<div class="maxm_btn btn_unable"><p>+</p></div>About NOYA Browser</div><div class="window_content"><iframe height="100%" width="100%" src="about_browser.html"></iframe></div></div>');
			$( "#about_browser" ).draggable({
				containment: ".window",
				handle:"#title"
			});
			new_window($('#about_browser'));
			$('#about_browser_btn').on('click', function(){
				var $tmp = $(this).parent();
				$tmp.addClass('hide_ul');
				$tmp.mouseleave(function(){
					$tmp.removeClass('hide_ul');
				});
				setTimeout(function(){
					$('#about_browser').fadeIn(0);
					$('#about_browser').mousedown();
				},300);
			});}
		}
		else{
			if(current_window != "finder"){$('.menubar_current').html('<li> <p><b>Finder</b></p><ul><li id="about_finder_btn"><p>About Finder</p></li><div class="split_line"></div> <li> <p>Preferences...</p><div class="right_arrow_space"></div><div class="right_arrow">⌘,</div> </li> <div class="split_line"></div> <li> <p>Empty Trash...</p> <div class="right_arrow_space"></div> <div class="right_arrow">⇧⌘⌫</div> </li> <li> <p>Secure Empty Trash...</p> </li> <div class="split_line"></div> <li> <p>Services</p> <div class="right_arrow_space">▶</div> <div class="right_arrow">▶</div> <ul> <li> <div class="left_check">✓</div> <p>Automatic</p> </li> <li> <p>Location (12-12-15 PM2:06)</p> </li> <li> <p>Location (12-12-15 PM2:07)</p> </li> <li> <p>Location (12-12-21 PM3:50)</p> </li> <div class="split_line"></div> <li> <p>Network Preferences...</p> </li> </ul> </li> <div class="split_line"></div> <li> <p>Hide Finder</p> <div class="right_arrow_space">⌘H</div> <div class="right_arrow">⌘H</div> </li> <li> <p>Hide Others</p> <div class="right_arrow_space">⌥⌘H</div> <div class="right_arrow">⌥⌘H</div> </li> <li class="grey_li"> <p>Show All</p> </li> </ul> </li> <li> <p>File</p> </li> <li> <p>Edit</p> </li> <li> <p>View</p> </li> <li> <p>Go</p> </li> <li> <p>Window</p> </li> <li> <p>Help</p> <ul class="spotlight"> <li class="spotlight_bar"> <p>Search</p> <input type="search"> </li> <div class="split_space"></div> <li> <p>Help Center</p> </li> <div class="split_line"></div> <li> <p>What\'s New in OS X Mavericks?</p> </li> <div class="split_space"></div> </ul> </li>');current_window = "finder";		
			$('#about_finder_btn').on('click', function(){
				var $tmp = $(this).parent();
				$tmp.addClass('hide_ul');
				$tmp.mouseleave(function(){
					$tmp.removeClass('hide_ul');
				});
				setTimeout(function(){
					$('#about_finder').fadeIn(0);
					$('#about_finder').mousedown();
				},300);
			});}
		}
	});

	$('.close_btn').on('click', function(){
		$(this).parent().parent().fadeOut(100);
	});
	
	$('.maxm_btn').not('.btn_unable').on('click', function(){
		var $tmp = $(this).parent().parent();
		$tmp.width($('.screen_area').width() - 2);
		$tmp.height($('.screen_area').height() - 2);
		$tmp.css({
			'left':'1px',
			'top':'1px'
		});
		$(".window_content").each(function(){
			$(this).height($(this).parent().height() - $(this).position().top);
		});
	});
	
	$('.main_manubar ul li ul li').on('click', function(){
		var $tmp = $(this).parent();
		$tmp.addClass('hide_ul');
		$tmp.mouseleave(function(){
			$tmp.removeClass('hide_ul');
		});
	});
	
	$('#about_this_mac_btn').on('click', function(){
		var $tmp = $(this).parent();
		$tmp.addClass('hide_ul');
		$tmp.mouseleave(function(){
			$tmp.removeClass('hide_ul');
		});
		setTimeout(function(){
			$('#about_this_mac').fadeIn(0);
			$('#about_this_mac').mousedown();
		},300);
	});
	
	$('#about_finder_btn').on('click', function(){
		var $tmp = $(this).parent();
		$tmp.addClass('hide_ul');
		$tmp.mouseleave(function(){
			$tmp.removeClass('hide_ul');
		});
		setTimeout(function(){
			$('#about_finder').fadeIn(0);
			$('#about_finder').mousedown();
		},300);
	});
		
	$('#browser_btn').on('click', function(){
		var $tmp = $(this).parent().parent();
		$tmp.addClass('hide_ul');
		$tmp.mouseleave(function(){
			$tmp.removeClass('hide_ul');
		});
		$('#dock_bot .browser_app').append('<div class="open_item_light"></div>');
		setTimeout(function(){
			$('#browser').fadeIn(0);
			$('#browser').mousedown();
		},300);
	});
		
	$('#dock li').not('.launchpad_app').on('click', function(){
		var icon = $(this).children('img');
		icon.animate({'margin-bottom': '25px'}, 400);
		icon.css({
			'-webkit-box-reflect':'none'
		});
		setTimeout(function(){
			icon.animate({'margin-bottom': '0'}, 400);
			setTimeout(function(){icon.css({'-webkit-box-reflect':'below -4px -webkit-gradient(linear, left top, left bottom, from(transparent), color-stop(0.7, transparent), to(rgba(255,255,255,0.6)))'});},400);
		},450);
	});
	
	$('#dock li').on('mousedown', function(){
		var icon = $(this).children('img');
		icon.css({
			'-webkit-box-reflect':'none',
			'-webkit-filter': 'drop-shadow(0 0 12px #888) brightness(0.5)'
		});
	});
	
	$('#launchpad ul li').not('input').on('mousedown', function(){
		var icon = $(this).children('img');
		icon.css({
			'-webkit-filter': 'drop-shadow(0 0 40px #666) brightness(0.5)'
		});
	});
	
	$('#dock li').on('mouseup', function(){
		var icon = $(this).children('img');
		icon.css({
			'-webkit-box-reflect':'below -4px -webkit-gradient(linear, left top, left bottom, from(transparent), color-stop(0.7, transparent), to(rgba(255,255,255,0.6)))',
			'-webkit-filter': 'drop-shadow(0 0 12px #888)'
		});
	});
	
	$('#launchpad ul li').not('input').on('mouseup', function(){
		var icon = $(this).children('img');
		icon.css({
			'-webkit-filter': 'drop-shadow(0 0 40px #666)'
		});
	});

	$('.browser_app').on('click', function(){
		$('#dock_bot .browser_app').append('<div class="open_item_light"></div>');
		setTimeout(function(){
			$('#browser').fadeIn(0);
			$('#browser').mousedown();
		},300);
	});

	var launchpad = 0;
	$('#launchpad ul li').on('click', function(){
		console.log($(this));
		if(!launchpad)
			return false;
		setTimeout(function(){
			$('#main_menubar').css('visibility','visible');
		}, 200);
		setTimeout(function(){
			$('#launchpad').css('visibility','hidden').css('-webkit-transform', 'scale(1.1)').css('-moz-transform', 'scale(1.1)').css('-ms-transform', 'scale(1.1)').css('-o-transform', 'scale(1.1)').css('transform', 'scale(1.1)').css('opacity', '0');
		}, 10);
		$('.launchpad_layout').fadeOut(200);
		launchpad = 0;
	});
	$('.launchpad_app').not('input').on('click', function(){
		if(!launchpad){
			$('#main_menubar').css('visibility','hidden');
			$('.launchpad_layout').fadeIn(200);
			setTimeout(function(){
				$('#launchpad').css('visibility','visible').css('-webkit-transform', 'scale(1)').css('-moz-transform', 'scale(1)').css('-ms-transform', 'scale(1)').css('-o-transform', 'scale(1)').css('transform', 'scale(1)').css('opacity', '1');
			}, 10);
			launchpad = 1;
		}
		else{
			setTimeout(function(){
				$('#main_menubar').css('visibility','visible');
			}, 200);
			setTimeout(function(){
				$('#launchpad').css('visibility','hidden').css('-webkit-transform', 'scale(1.1)').css('-moz-transform', 'scale(1.1)').css('-ms-transform', 'scale(1.1)').css('-o-transform', 'scale(1.1)').css('transform', 'scale(1.1)').css('opacity', '0');
			}, 10);
			$('.launchpad_layout').fadeOut(200);
			launchpad = 0;
		}
	});
	
	$('.launchpad_layout').not('input').on('click', function(){
		if(launchpad){
			setTimeout(function(){
				$('#main_menubar').css('visibility','visible');
			}, 200);
			setTimeout(function(){
				$('#launchpad').css('visibility','hidden').css('-webkit-transform', 'scale(1.1)').css('-moz-transform', 'scale(1.1)').css('-ms-transform', 'scale(1.1)').css('-o-transform', 'scale(1.1)').css('transform', 'scale(1.1)').css('opacity', '0');
			}, 10);
			$('.launchpad_layout').fadeOut(200);
			launchpad = 0;
		}
	});
	
	$('#shutdown').on('click', function(){
		if(sidebar){
			$('#content').css('left', '0');
			sidebar=0;
		}
		$('.window_default').each(function(){
			$(this).fadeOut(100);
		});
		setTimeout(function(){
			$('#sidebar, #main_menubar').fadeOut(200);
			$('#dock').animate({'margin-bottom':'-100px'}, 300);
			$('#content').fadeOut(800);
		}, 1200);
	});

	$('#browser_url').on('keypress', function(event){
		if(event.keyCode == 13){
			var tmp = document.getElementById('browser_url').value;
			if(tmp.substr(0,4) != 'http')
				tmp = 'http://'+tmp;
			$('#NOYA_browser').attr('src',tmp);
		}
	});

	$('#volume').on('change', function(event){
		var tmp = document.getElementById('volume');
		if(tmp.value == 0){
			$('i.system_volume').removeClass('fa-volume-up').removeClass('fa-volume-down').addClass('fa-volume-off');
		}
		else if(tmp.value <= 40){
			$('i.system_volume').removeClass('fa-volume-off').removeClass('fa-volume-up').addClass('fa-volume-down');
		}
		else{
			$('i.system_volume').removeClass('fa-volume-off').removeClass('fa-volume-down').addClass('fa-volume-up');
		}
	});
	
	var dock_expand = Math.PI / 250,
		dock_min = 70,
		dock_max = 150,
		dock_min_max_dex = 40,			// (max-min)/2
		dock_min_max_avg = 110,			// (max+min)/2
		dock_range = 250;
	var dock_resize = 0;
	var lastX = 0, tmpX;
	
	$(document).bind("mousemove", function(e) {
		mouseX = e.pageX;
		mouseY = e.pageY;
		if(dock_resize > 0){
			if(dock_resize == 1)
				set_dock();
			else
				resize_dock();
		}
	});
	
	$('#dock_bot').on('mouseenter', function(){
		if(dock_resize == -1)
			return false;
		dock_resize = 1;
	});
	
	$('#dock_bot').on('mouseleave', function(){
		if(dock_resize == -1)
			return false;
		dock_resize = 0;
		renew_dock();
	});

	var x, d, w, w0;
	
	function fastCos(x) {	//http://jsperf.com/fast-cos-vs-math-cos
	    var x2 = x * x;
	    var x4 = x2 * x2;
	    var x6 = x4 * x2;
	    var x8 = x6 * x2;
	    var x10 = x8 * x2;
	    return 1 - (1814400 * x2 - 151200 * x4 + 5040 * x6 - 90 * x8 + x10) / 3628800;// * .000000276
	}
	
	var dock = $('#dock'),
		dock2 = $('#dock2'),
		dockimg = $('#dock img');
	
	function set_dock(){
		dock_resize = -1;
		dock.css('visibility','hidden');
		dock2.css('display','inherit');
		dockimg.each(function(){
			x = $(this).offset().left + ($(this).outerWidth() * .5);
			d = Math.abs(mouseX - x);
			w = d < dock_range ? dock_min_max_avg + (dock_min_max_dex * fastCos(d * dock_expand)) : dock_min;
			$(this).css('width',w);
		});
		setTimeout(function(){
			dockimg.each(function(){
				x = $(this).offset().left + ($(this).outerWidth() * .5);
				d = Math.abs(mouseX - x);
				w = d < dock_range ? dock_min_max_avg + (dock_min_max_dex * fastCos(d * dock_expand)) : dock_min;
				$(this).css('width',w);
			});
		}, 15);
		setTimeout(function(){
			dock.css('visibility','visible');
			dock2.css('display','none');
			dockimg.each(function(){
				w0 = $(this).width();
				$(this).css({'width':dock_min});
				$(this).animate({'width':w0}, { "duration": 200, "easing": "linear" });
			});
		}, 30);
		setTimeout(function(){
			dock_resize = 2;
		}, 170);
	}

	function renew_dock(){
		dockimg.each(function(){
			if(Math.abs($(this).width() - dock_min) > 5){
				$(this).animate({'width':dock_min}, { "duration": 150, "easing": "linear" });
			}
			else{
				$(this).css('width',dock_min);
			}
		});
	}
	
	function resize_dock(){
		dockimg.each(function(){
			x = $(this).offset().left + ($(this).outerWidth() * .5);
			d = Math.abs(mouseX - x);
			w = d < dock_range ? dock_min_max_avg + (dock_min_max_dex * fastCos(d * dock_expand)) : dock_min;
			$(this).css('width',w);
		});
	}
});

function date_time(id){
        date = new Date;
        year = date.getFullYear();
        month = date.getMonth();
        months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'Jully', 'August', 'September', 'October', 'November', 'December');
        d = date.getDate();
        day = date.getDay();
        days = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
        h = date.getHours();
        if(h<10){ h = "0"+h; }
        m = date.getMinutes();
        if(m<10){ m = "0"+m; }
        s = date.getSeconds();
        if(s<10){ s = "0"+s; }
        result = ''+days[day].substr(0,3)+' '+months[month].substr(0,3)+' '+d+'  '+' '+h+':'+m+':'+s;
        document.getElementById(id).innerHTML = result;
        result = ''+days[day]+', '+months[month]+' '+d+', '+year;
        document.getElementById('system_date_line').innerHTML = result;
        setTimeout('date_time("'+id+'");','1000');
        return true;
}
