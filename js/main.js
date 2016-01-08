/**
 * 根据传入的index导向该slider的页面效果实现
 * @param  {int} or {Jquery element} index [页面的索引或者导向该页面的image link]
 * @author Qing
 */
function sliderGo(index) {
	var el = parseInt(index) >= 0 ? $('.sider').find('img:eq(' + index + ')') : index;
	if (el.data('go') == '#home') {
		el.siblings('img').attr('src', './img/global/page_inactive.png');
	} else {
		el.attr('src', './img/global/page_active.png').siblings('img:gt(0)').attr('src', './img/global/page_inactive.png');
	}
	if(el.data('go')=='#info'){
		$('.next').find('img').attr('src','./img/global/previous.png')
	}else{
		$('.next').find('img').attr('src','./img/global/next.png')
	}

}
var enableArrowMoving = true;
$(function() {
	$.fn.coolAnimate = function(animate, callback) {
	    var self = this;
	    animate = "animated " + animate;
	    $(self).addClass(animate).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
	        $(this).removeClass(animate);
	        if ($.isFunction(callback)) {
	            callback(self)
	        }
	    })
	    return $(self);
	}
	$(".slider").css({
		"height": $(window).height()
	});
	$.scrollify({
		section: ".slider",
		easing: "easeOutExpo",
		// easing: "easeOutQuad",
		scrollSpeed: 800,
		scrollbars: false,
		before: function(i, selections) {
			$('.next').hide();
		},
		after: function(i, selections) {
			$('.next').show();
			sliderGo(i);
		},
	});

	$('.introduceBtn',$('#header')).click(function(event) {
		var target = $(this).data('go');
		$('.sider').find("[data-go="+target+"]").trigger('click');
	});
	$(".sider").delegate('img', 'click', function(event) {
		event.preventDefault();
		$.scrollify.move($(this).data('go'));
		sliderGo($(this));
	});

	$('.next').delegate('img', 'click', function(event) {
		event.preventDefault();
		if($.scrollify.current().data('sectionName')=='info'){
			$.scrollify.move('#home');
		}else{
			$.scrollify.next();
		}
	});
	$('.next').delegate('img', 'mouseenter', function(event) {
		event.preventDefault();
		enableArrowMoving = false;
		$(this).coolAnimate('bounce')
	});
	$('.next').delegate('img', 'mouseleave', function(event) {
		event.preventDefault();
		enableArrowMoving = true;
	});
	setInterval(function(){
		if(enableArrowMoving){
			var imgSrc = $('.next').find('img').attr('src');
			if(imgSrc.split('next').length==2){
				$('.next').coolAnimate('slideInDown');
			}else{
				$('.next').coolAnimate('slideInUp');
			}
		}
	},2000)
	$(window).scroll(function(event) {
		console.log('---');
	});
});