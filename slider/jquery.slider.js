/**
 * jQuery Slider
 * jQuery version 1.11.1
 * @author Ray (ray0324@foxmail.com)
 * @date   2014-07-13 01:11:25
 * @version v0.2
 */

/*======================================================================================================================
说明：只需要在html中加入相应的html结构与js调用 无需另外调用css
<!-- HTML -->
<div id="focus">
	<ul>
		<li><a href="#"><img src="http://placehold.it/1158x470/7ba3a8/ffffff" width="1158" height="470" alt="" /></a></li>
		<li><a href="#"><img src="http://placehold.it/1158x470/bead92/ffffff" width="1158" height="470" alt="" /></a></li>
		<li><a href="#"><img src="http://placehold.it/1158x470/bf2c36/ffffff" width="1158" height="470" alt="" /></a></li>
		<li><a href="#"><img src="http://placehold.it/1158x470/d44350/ffffff" width="1158" height="470" alt="" /></a></li>
	</ul>
</div>
<!-- HTML -->

-----调用---------------------------
$(function() {
	$("#focus").slide({
		"width": 1158, //轮播器宽度
		"height": 470 //轮播器高度
	});
})
------------------------------------

*=======================================================================================================================
 */

(function($) {
    $.fn.extend({
        "slide": function(opt) {
            var index = 1; //动画索引顺序 与点对应
            var _this = $(this);
            var _ul = _this.children("ul")
            var _li = _ul.children("li");
            var len = _li.length;
            var _queue;

            function init() { //初始化样式
                var html = ""
                _this.css({
                    "position": "relative",
                    "width": opt.width,
                    "height": opt.height,
                    "overflow": "hidden"
                });
                _ul.css({
                    "position": "absolute",
                    "width": opt.width,
                    "height": opt.height,
                });
                _li.css({
                    "position": "absolute",
                    "width": opt.width,
                    "height": opt.height,
                    "top": "0",
                    "left": "0",
                    "display": "none"
                }).eq(0).css({
                    "display": "block"
                });

                for (var i = 0; i < len; i++) {
                    html += "<span><em></em></span>";
                }

                $("<div class='slide-page'><div class='wraper'>" + html + "</div></div>").appendTo(_this);

                _this.find(".slide-page").css({
                    "position": "absolute",
                    "width": opt.width,
                    "height": "30px",
                    "bottom": "0",
                    "left": "0"
                });
                _this.find(".slide-page > .wraper").css({

                    "width": 20 * len + "px",
                    "height": "30px",
                    "margin": "0 auto"
                });
                _this.find(".slide-page > .wraper > span").css({
                    "display": "block",
                    "width": "20px",
                    "height": "30px",
                    "float": "left"
                });
                _this.find(".slide-page > .wraper > span > em").css({
                    "display": "block",
                    "width": "8px",
                    "height": "8px",
                    "background": "grey",
                    "float": "right",
                    "margin": "11px 6px",
                    "border-radius": "4px",
                    "cursor": "pointer"
                });
                _this.find(".slide-page > .wraper > span:eq(0) > em").addClass("active").css({
                    "width": "12px",
                    "height": "12px",
                    "margin": "9px 4px",
                    "border-radius": "6px",
                    "background": "#990000"
                });
            }

            function _autoPlay() { //轮播
                if (index == len) {
                    index = 0
                };
                _this.find("ul").children("li").eq(index).fadeIn(500).siblings().fadeOut(500);
                _this.find(".slide-page > .wraper > span > em").eq(index).addClass("active").animate({
                    "width": "12px",
                    "height": "12px",
                    "margin": "9px 4px",
                    "border-radius": "6px"
                }, 100).css({
                    "background": "#990000"
                }).parent().siblings().find("em").removeClass("active").css({
                    "width": "8px",
                    "height": "8px",
                    "margin": "11px 6px",
                    "border-radius": "4px",
                    "background": "grey"
                });
                index++;
            }

            //分页点鼠标事件

            function addMouseEvent() {
                _this.find(".slide-page > .wraper > span > em").mouseover(function() {
                    $(this).css({
                        "background": "#990000"
                    })
                }).mouseout(function() {
                    if (!$(this).hasClass("active")) {
                        $(this).css({
                            "background": "grey"
                        });
                    }
                }).click(function() {
                    $(this).addClass("active").animate({
                        "width": "14px",
                        "height": "14px",
                        "margin": "8px 3px",
                        "border-radius": "7px"
                    }, 100).css({
                        "background": "#990000"
                    });
                    $(this).parent().siblings().find("em").removeClass("active").css({
                        "width": "10px",
                        "height": "10px",
                        "margin": "10px 5px",
                        "border-radius": "5px",
                        "background": "grey"
                    });
                    index = $(this).parent().index();
                    clearInterval(_queue);
                    _autoPlay();
                    _queue = setInterval(_autoPlay, 3000);
                });
            }

            init();
            _queue = setInterval(_autoPlay, 3000);
            addMouseEvent();
        }
    })
})(jQuery);

