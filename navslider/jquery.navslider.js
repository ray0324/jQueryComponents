/**
 * navslider v0.1
 * ray0324
 * ray0324@foxmail.com
 */
(function($){
    'use strict';
    function AutoFocus($element){
        this.$ul  = $element.find('ul');
        this.$li  = this.$ul.find('li');
        this.$cur = $element.find('.currrent .cur');
        this.$active = this.$ul.find('li.active');

        this.paddingLeftWidth = parseInt(this.$li.css('padding-left').replace('px', ''), 10);
        this.baseLeft = this.$ul.offset().left;
        this.activeWidth = this.$active.width();
        this.activeOffset=this.$active.offset().left - this.baseLeft;

        this.init = function(){
            var self = this;
            self.$cur.css({'width':self.activeWidth,'left':self.activeOffset+self.paddingLeftWidth});
        }

        this.addAutoFocusListener = function(){
            var self = this;
            self.$li.on('mouseenter',function(){
                var _width = $(this).width();
                var _offset = $(this).offset().left - self.$ul.offset().left;
                self.$cur.css('width',_width).stop(true,true).animate({left:_offset+self.paddingLeftWidth},200);
            });

            self.$ul.on('mouseleave',function(){
                self.$cur.css('width',self.activeWidth).stop(true,true).animate({left:self.activeOffset+self.paddingLeftWidth},200);
            });
        }
        //自动初始化
        this.init();
        this.addAutoFocusListener();
    }

    $.fn.autoFocus = function() {
        this.each(function() {
            new AutoFocus($(this));
        })
    }
})(jQuery);
