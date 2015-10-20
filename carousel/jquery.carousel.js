/* 
 * @Author: RAY (ray0324@fomxial.com)
 * @Date:   2014-09-03 20:47:03
 * @Last Modified by:   RAY
 * @Last Modified time: 2015-03-27 09:47:35
 */
(function($) {

    'use strict';

    //Constructor
    function Carousel($element) {
        this.$element = $element;
        this.indicator = 0;
        this.interval = null;
        this.$li = $element.children('.s-body').find('li');
        this.$nav = $element.children('.s-nav').find('li');
        this.totalLength = this.$li.size(); //item length
        this.init();
    }

    //version
    Carousel.VERSION = 'V0.2';

    //initizalized
    Carousel.prototype.init = function() {
        this.cycle();
        this.addEvents();
    }

    //prev
    Carousel.prototype.prev = function(current) {
        var self = this;
        var currentFrame = self.$li.eq(current || self.indicator);
        this.indicator--;
        if (this.indicator < 0) {
            this.indicator = this.totalLength - 1;
        }
        var prevFrame = self.$li.eq(self.indicator);

        self.$li
        	.removeClass('next');
        prevFrame
	        .addClass('prev')
	        .stop(true,true).animate({left: 0}, 400)
	        .siblings().removeClass('prev')
	        .css('left', '');

        currentFrame
	        .addClass('active')
	        .stop(true,true)
	        .animate({left: "100%"}, 400)
	        .siblings()
	        .removeClass('active');

        self.$nav
	        .eq(self.indicator)
	        .addClass('active')
	        .siblings()
	        .removeClass('active');
    }

    //next
    Carousel.prototype.next = function(current) {
        var self = this;

        var currentFrame = typeof current == 'undefined' ? self.$li.eq(self.indicator) : self.$li.eq(current);
        //next Frame        
        self.indicator++;
        if (self.indicator > self.totalLength - 1) {
            self.indicator = 0;
        }
        var nextFrame = self.$li.eq(self.indicator);

        self.$li.removeClass('prev');
        nextFrame
            .addClass('next')
            .css('left', '100%')
            .stop(true,true)
            .animate({left: 0}, 400)
            .siblings()
            .removeClass('next');

        currentFrame
            .addClass('active')
            .stop(true,true)
            .css('left', '')
            .animate({left: "-100%"}, 400)
            .siblings()
            .removeClass('active');

        self.$nav
        	.eq(self.indicator)
	        .addClass('active')
	        .siblings()
	        .removeClass('active');
    }

    //cycle
    Carousel.prototype.cycle = function() {
    	this.pause();
        var self = this;
        this.interval = setInterval(function() {
            self.next();
        }, 2000);
    }

    //pause
    Carousel.prototype.pause = function() {
        clearInterval(this.interval);
    }

    //Event Binding
    Carousel.prototype.addEvents = function() {
        var self = this;
        //navigator point Event
        this.$nav.on('mouseenter', function() {
            self.pause();
            var current = self.indicator; //record the current
            if (self.indicator > $(this).index()) {
                self.indicator = $(this).index() + 1;
                self.prev(current);
            } else if (self.indicator < $(this).index()) {
                self.indicator = $(this).index() - 1;
                self.next(current);
            }
        }).on('mouseleave', function() {
            self.cycle();
        })

        //focus screen Event
        this.$element.on('mouseenter', function() {
            self.pause();
        }).on('mouseleave', function() {
            self.cycle();
        })
    }

    //attach to jQuery
    $.fn.carousel = function() {
        this.each(function() {
            new Carousel($(this));
        })
    }

})(jQuery);
