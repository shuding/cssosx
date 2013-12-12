$(document).ready(function(){
	var sidebar = 0;
	$('.sidebar_btn').on('click', function(){
		if(sidebar)
			$('.content').css('left', '0');
		else
			$('.content').css('left', '-300px');
		sidebar = !sidebar;
	});
	$('.sidebar .sidebar_bot li').mouseover(function(){
		$(this).css('background', '#2476da');
	});
	$('.sidebar .sidebar_bot li').mouseleave(function(){
		$(this).css('background', 'none');
	});
	$('.sidebar .noti_close').on('click', function(){
		var $ul = $(this).parent();
		$ul.next().css({
			'margin-top':-$ul.height()+'px'
		});
		$ul.css({
			'opacity':'0',
			'-webkit-transform':'translateY(-30px)'
		});
		setTimeout(function(){
			$ul.css({
				'visibility': 'hidden'
			});
		}, 500);
	});
});