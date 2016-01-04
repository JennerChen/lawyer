$(function() {
	$(".slider").css({"height":$(window).height()});
	$.scrollify({
		section:".slider",
		// easing: "easeOutExpo",
  //      scrollSpeed: 1100,
  //      offset : 0,
       scrollbars: false
	});
	

	$(".sider").delegate('img', 'click', function(event) {
		event.preventDefault();
		$.scrollify("move",$(this).data('go'));
		if($(this).data('go')=='#home'){
			$(this).siblings('img').attr('src','./img/global/page_inactive.png');
		}else{
			$(this).attr('src','./img/global/page_active.png').siblings('img:gt(0)').attr('src','./img/global/page_inactive.png');
		}
	});
});