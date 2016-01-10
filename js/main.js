/**
 * 根据传入的index导向该slider的页面效果实现
 * @param  {int} or {Jquery element} index [页面的索引或者导向该页面的image link]
 * @author Qing
 */
function sliderGo(index) {
	var el = parseInt(index) >= 0 ? $('.sider').find('img:eq(' + index + ')') : index;
	if (el.data('go') == '#home') {
		el.attr('src','./img/global/home.png')
		el.siblings('img').attr('src', './img/global/page_inactive.png');
	} else {
		el.attr('src', './img/global/page_active.png').siblings('img:gt(0)').attr('src', './img/global/page_inactive.png').siblings('img:first').attr('src','./img/global/home_inactive.png');
	}
	if(el.data('go')=='#info'){
		$('.next').find('img').attr('src','./img/global/previous.png')
	}else{
		$('.next').find('img').attr('src','./img/global/next.png')
	}

}
var enableArrowMoving = true,
	currentView = null;
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
	$(window).resize(function(event) {
		if($('body').width()>=838){
			// reset width/height when change width from mobile width;
			if(currentView && currentView ==='mobile'){
				$('#header').find('.introduceBtn').removeAttr('style');
				$('#whoAmI').find('.introduceSection').removeAttr('style');
				$('#whatTodo').find('.introduceSection').removeAttr('style');
			}
			currentView = "pc";
			var contentWidth = $('#whoAmI').find('.content').width(),
				whoAmIIntroduce = $('#whoAmI').find('.introduceSection'),
				whoAmITotalWidth = 0,
				whatTodoIntroduce = $('#whatTodo').find('.introduceSection'),
				whatTodoTotalWidth = 0,
				contactIntroduce = $('#contact').find('.introduceBtn');

			$.each(whoAmIIntroduce, function(index, val) {
				whoAmITotalWidth += $(val).width();
			});
			var whoAmIpadding = Math.floor((contentWidth - whoAmITotalWidth) /3)-5 +"px";
			$('#whoAmI').find('.introduceSection:gt(0)').css('padding-left',whoAmIpadding);

			$.each(whatTodoIntroduce, function(index, val) {
				whatTodoTotalWidth += $(val).width();
			});
			var whatTodopadding = Math.floor((contentWidth - whatTodoTotalWidth) /3)-5 +"px";
			$('#whatTodo').find('.introduceSection:gt(0)').css('padding-left',whatTodopadding);

			var contactpadding =  15,
				contactWidth = Math.floor((contentWidth - 4*contactpadding -10) / contactIntroduce.length);
			$.each(contactIntroduce, function(index, val) {
				$(val).width(contactWidth);
			});
			$('#contact').find('.introduceBtn:gt(0)').css('margin-left',2*contactpadding + "px");

			// --if it is IE8, need do some extra width/height change because ie8 not support @media query--------------------------
			if(window.ISIE8){
				if($('body').width()<1376){
					console.log($('#whatTodo').find('.down').find('img').length)
					$('#whatTodo').find('.down').find('img').width(80).height(80);
				}else{
					$('#whatTodo').find('.down').find('img').width(100).height(100);
				}
			}
		}else{
			// reset width/height when change width from pc width;
			if(currentView && currentView ==='pc'){
				$('#whoAmI').find('.introduceSection').removeAttr('style');
				$('#whatTodo').find('.introduceSection:gt(0)').removeAttr('style');
				$('#contact').find('.introduceBtn').removeAttr('style');
			}
			currentView = "mobile";
			var contentWidth = $('#header').find('.content').width(),
				headerBtnWidth = $('#header').find('.introduceBtn').width();

			var headerMarginWidth = Math.floor((contentWidth - headerBtnWidth*2)/4-2) +"px";
			$('#header').find('.introduceBtn').css('margin-left',headerMarginWidth).css('margin-right',headerMarginWidth);

			// -------------------whoAmI--------------------------
			var firstWhoAmIWidth = 0,
				secondWhoAmiWidth = 0 ;
			$.each($('#whoAmI').find('.introduceSection'), function(index, val) {
				if(index<=1){
					firstWhoAmIWidth += $(val).width();
				}else{
					secondWhoAmiWidth += $(val).width();
				}
			});
			var firstWhoAmIpadding = Math.floor((contentWidth - firstWhoAmIWidth)/4-2) +"px",
				secondWhoAmIpadding = Math.floor((contentWidth - secondWhoAmiWidth)/4-2) +"px";
			$('#whoAmI').find('.introduceSection:lt(2)').css('margin-left',firstWhoAmIpadding).css('margin-right',firstWhoAmIpadding);
			$('#whoAmI').find('.introduceSection:gt(1)').css('margin-left',secondWhoAmIpadding).css('margin-right',secondWhoAmIpadding);

			// -------------------whatTodo--------------------------
			var firstWhatTodoWidth = 0,
				secondWhatTodoWidth = 0 ;
			$.each($('#whatTodo').find('.introduceSection'), function(index, val) {
				if(index<=1){
					firstWhatTodoWidth += $(val).width();
				}else{
					secondWhatTodoWidth += $(val).width();
				}
			});
			var firstWhoAmIpadding = Math.floor((contentWidth - firstWhatTodoWidth)/4-2) +"px",
				secondWhoAmIpadding = Math.floor((contentWidth - secondWhatTodoWidth)/4-2) +"px";
			$('#whatTodo').find('.introduceSection:lt(2)').css('margin-left',firstWhoAmIpadding).css('margin-right',firstWhoAmIpadding);
			$('#whatTodo').find('.introduceSection:gt(1)').css('margin-left',secondWhoAmIpadding).css('margin-right',secondWhoAmIpadding);	


		}
	});
	$(window).trigger('resize');
});