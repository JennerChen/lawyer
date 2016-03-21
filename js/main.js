/**
 * 根据传入的index导向该slider的页面效果实现
 * @param  {int} {Jquery element} index [页面的索引或者导向该页面的image link]
 * @author Qing
 */
function sliderGo(index) {
	var el = parseInt(index) >= 0 ? $('.sider').find('img:eq(' + index + ')') : index;
	if (el.data('go') === 'home') {
		el.attr('src', './img/global/home.png').siblings('img').attr('src', './img/global/page_inactive.png');
	} else {
		el.attr('src', './img/global/page_active.png').siblings('img:gt(0)').attr('src', './img/global/page_inactive.png').siblings('img:first').attr('src', './img/global/home_inactive.png');
	}
	if (el.data('go') === 'info') {
		$('.next').find('img').hide();
	} else {
		$('.next').find('img').show().attr('src', './img/global/next.png');
	}
}

/** @type {Boolean} [是否允许arrow移动] */
var enableArrowMoving = true,
	/** @type {string} [记录当前视窗是pc端还是移动端的, 当前是根据屏幕宽度决定的,以838px以区别] */
	currentView,
	disabledWindowResize = false;

$(function () {
	/** @type {String} 解决当使用动画时出现的bugs */
	$.fn.coolAnimate = function (animate, callback) {
		var self = this;
		$(self).addClass(animate + " animated ").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
			$(this).removeClass(animate);
			if ($.isFunction(callback)) {
				callback(self);
			}
		});
		return $(self);
	};
	var anchors = ['home', 'profile', 'area', 'business', 'info'];
	$('#container').fullpage({
		anchors: anchors,
		loopTop: true,
		loopBottom: true,
		onLeave: function (i, nextIndex) {
			var selection = $('section[data-anchor=' + anchors[nextIndex - 1] + ']');
			$('.introduce', $('.down', selection)).css('opacity', 0);
			sliderGo(nextIndex - 1);
		},
		afterLoad: function (link) {
			var selection = $('section[data-anchor=' + link + ']');
			$('.introduce', $('.down', selection)).removeAttr('style').coolAnimate('fadeIn bitSlow');
		}
	});
	$.fn.fullpage.setLockAnchors(true);
	$('.introduceBtn', $('#header')).click(function () {
		var target = $(this).data('go');
		$.fn.fullpage.moveTo(target);
	});
	$(".sider").delegate('img', 'click', function (event) {
		event.preventDefault();
		$.fn.fullpage.moveTo($(this).data('go'));
		sliderGo($(this));
	});

	$('.next').delegate('img', 'click', function (event) {
		event.preventDefault();
		$.fn.fullpage.moveSectionDown();
	});
	$('.next').delegate('img', 'mouseenter', function (event) {
		event.preventDefault();
		enableArrowMoving = false;
	});
	$('.next').delegate('img', 'mouseleave', function (event) {
		event.preventDefault();
		enableArrowMoving = true;
	});
	setInterval(function () {
		if (enableArrowMoving) {
			var imgSrc = $('.next').find('img').attr('src');
			if (imgSrc.split('next').length === 2) {
				$('.next').coolAnimate('slideInDown');
			} else {
				$('.next').coolAnimate('slideInUp');
			}
		}
	}, 3000);
	$('#mailTo').click(function () {
		window.location.href = "mailto:bd@zhaogelvshi.com";
	});
	$('#mailToText').click(function () {
		window.location.href = "mailto:bd@zhaogelvshi.com";
	});
	/**
	 * 根据当前的屏幕的宽度,resize某些元素
	 * 使用js的主要原因是：
	 *                    1.适应ie8的响应式
	 *                    2.手机端的响应式
	 *                    3.对某些元素的控制比css控制响应式更加精准
	 */
	$(window).resize(function () {
		resizePage();
	}).trigger('resize');
	noAds();
});

function resizePage() {
	var contentWidth;
	if (disabledWindowResize) {
		return;
	} else {
		setInterval(function () {
			disabledWindowResize = false;
		}, 50);
	}
	if ($('body').width() >= 838) {
		// reset width/height when change width from mobile width;
		if (currentView && currentView === 'mobile') {
			$('#header').find('.introduceBtn').removeAttr('style');
			$('#whoAmI').find('.introduceSection').removeAttr('style');
			$('#whatTodo').find('.introduceSection').removeAttr('style');
			$('#howTodo_introduce').attr('src', './img/howTodo/introduce.png');
			// $('#header_logo').attr('src','./img/header/header_logo.png');
		}
		currentView = "pc";
		contentWidth = $('#whoAmI').find('.content').width();
		var whoAmIIntroduce = $('#whoAmI').find('.introduceSection'),
			whoAmITotalWidth = 0,
			whatTodoIntroduce = $('#whatTodo').find('.introduceSection'),
			whatTodoTotalWidth = 0,
			contactIntroduce = $('#contact').find('.introduceBtn');
		$.each(whoAmIIntroduce, function (index, val) {
			whoAmITotalWidth += $(val).width();
		});
		var whoAmIpadding = Math.floor((contentWidth - whoAmITotalWidth) / 3) - 5 + "px";
		$('#whoAmI').find('.introduceSection:gt(0)').css('padding-left', whoAmIpadding);

		$.each(whatTodoIntroduce, function (index, val) {
			whatTodoTotalWidth += $(val).width();
		});

		var whatTodopadding = Math.floor((contentWidth - whatTodoTotalWidth) / 3) - 5 + "px";
		$('#whatTodo').find('.introduceSection:gt(0)').css('padding-left', whatTodopadding);

		var contactpadding = 15,
			contactWidth = Math.floor((contentWidth - 4 * contactpadding - 10) / contactIntroduce.length);
		$.each(contactIntroduce, function (index, val) {
			$(val).width(contactWidth);
		});
		$('#contact').find('.introduceBtn:gt(0)').css('margin-left', 2 * contactpadding + "px");

		// --if it is IE8, need do some extra width/height change because ie8 not support @media query--------------------------
		if (window.ISIE8) {
			if ($('body').width() < 1376) {
				$('#whatTodo').find('.down').find('img').width(80).height(80);
			} else {
				$('#whatTodo').find('.down').find('img').width(100).height(100);
			}
		}
	} else {
		// reset width/height when change width from pc width;
		if (currentView && currentView === 'pc') {
			$('#whoAmI').find('.introduceSection').removeAttr('style');
			$('#whatTodo').find('.introduceSection:gt(0)').removeAttr('style');
			$('#contact').find('.introduceBtn').removeAttr('style');
		}
		currentView = "mobile";
		var headerBtnWidth = $('#header').find('.introduceBtn').width();
		contentWidth = $('#header').find('.content').width();

		var headerMarginWidth = Math.floor((contentWidth - headerBtnWidth * 2) / 4 - 2) + "px";
		$('#header').find('.introduceBtn').css('margin-left', headerMarginWidth).css('margin-right', headerMarginWidth);
		// $('#header_logo').attr('src','./img/mobile/header_logo.png');
		// -------------------whoAmI--------------------------
		var firstWhoAmIWidth = 0,
			secondWhoAmiWidth = 0;
		$.each($('#whoAmI').find('.introduceSection'), function (index, val) {
			if (index <= 1) {
				firstWhoAmIWidth += $(val).width();
			} else {
				secondWhoAmiWidth += $(val).width();
			}
		});
		var firstWhoAmIpadding = Math.floor((contentWidth - firstWhoAmIWidth) / 4 - 2) + "px",
			secondWhoAmIpadding = Math.floor((contentWidth - secondWhoAmiWidth) / 4 - 2) + "px";
		$('#whoAmI').find('.introduceSection:lt(2)').css('margin-left', firstWhoAmIpadding).css('margin-right', firstWhoAmIpadding);
		$('#whoAmI').find('.introduceSection:gt(1)').css('margin-left', secondWhoAmIpadding).css('margin-right', secondWhoAmIpadding);

		// -------------------whatTodo--------------------------
		var firstWhatTodoWidth = 0,
			secondWhatTodoWidth = 0;
		$.each($('#whatTodo').find('.introduceSection'), function (index, val) {
			if (index <= 1) {
				firstWhatTodoWidth += $(val).width();
			} else {
				secondWhatTodoWidth += $(val).width();
			}
		});
		var firstWhatTodopadding = Math.floor((contentWidth - firstWhatTodoWidth) / 4 - 2) + "px",
			secondWhatTodopadding = Math.floor((contentWidth - secondWhatTodoWidth) / 4 - 2) + "px";
		$('#whatTodo').find('.introduceSection:lt(2)').css('margin-left', firstWhatTodopadding).css('margin-right', firstWhatTodopadding);
		$('#whatTodo').find('.introduceSection:gt(1)').css('margin-left', secondWhatTodopadding).css('margin-right', secondWhatTodopadding);
		// -------------------howTodo--------------------------
		$('#howTodo_introduce').attr('src', './img/mobile/introduce.png');

	}
}
/**
 * 阻止手机浏览时向页面插入广告,当前仅仅清除 以iframe形式存在的广告
 * 顺便鄙视下中国电信！！！
 */
function noAds() {
	$('iframe').remove();
	setInterval(function () {
		$('iframe').remove();
	}, 1000 * 60);
}
