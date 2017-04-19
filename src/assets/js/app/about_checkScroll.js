(function(root, factory) {
  module.exports = factory($ || require('jquery'));
}(this, function($){
  
  var $sections = $('.aboutalma-section[id]'),
      $container = $('.js-aboutalma-container'),
      $navi = $('.js-aboutalma-navi'),
      $parallax = '',
      sectionPos = [],
      posPadding = 600,
      scrollY = 0,
      headerH = $('header').eq(0).outerHeight(),
      windowH = $(window).innerHeight(),
      windowW = $(window).innerWidth(),
      containerH = $container.innerHeight(),
      containerPos = $container.offset().top,
      sectionH = 0,
      sectionScrollNum = 0,
      
      sectionInview = function(num){
        if(num >= 0) {
          $sections.eq(num).addClass('is-inview');
          $sections.eq(num).prevAll('.aboutalma-section[id]').addClass('is-inview');
          $sections.eq(num).nextAll('.aboutalma-section[id]').removeClass('is-inview');
        } else {
          $sections.removeClass('is-inview');
        }
      },

      sectionScroll = function(num){
        headerH = $('header').eq(0).outerHeight();
        if(num >= 0) {
          sectionScrollNum = $(window).scrollTop() - $sections.eq(num).offset().top + headerH;
          $parallax = $sections.eq(num).find('.js-aboutalma-parallax');
          sectionH = $sections.eq(num).innerHeight();
          $parallax.css({
            top: '-' + Math.round(400 / sectionH * sectionScrollNum) + 'px'
          });
        } else {
          sectionScrollNum = $(window).scrollTop() - $('.aboutalma-head').offset().top + headerH;
          $parallax = $('.aboutalma-head').find('.js-aboutalma-parallax');
          sectionH = $('.aboutalma-head').innerHeight();
          $parallax.css({
            top: '-' + Math.round(350 / sectionH * sectionScrollNum) + 'px'
          });
        }
      },
      
      naviPosition = function(){
        headerH = $('header').eq(0).outerHeight();
        windowW = $(window).innerWidth();
        if(windowW < 768){
          top: 'auto'
        } else {
          if(scrollY + windowH >= containerPos + containerH) {
            $navi.addClass('is-absolute').css({
              top: 'auto',
              bottom: 0,
              height: ''
            });
          } else {
            $navi.removeClass('is-absolute');
            if(scrollY > 10) {
              $navi.css({
                top: 60 + 'px',
                height: $(window).innerHeight() - 60 + 'px'
              });
            } else {
              $navi.css({
                top: 120 - scrollY + 'px',
                height: $(window).innerHeight() - 120 + 'px'
              });
            }
          }
        }
      };
  
  function _init(){
    
    sectionPos = [];
    $sections.each(function(){
      sectionPos.push(parseInt($(this).offset().top - posPadding));
    });
    scrollY = $(window).scrollTop();
    containerH = $container.innerHeight();
    windowH = $(window).innerHeight();
    windowW = $(window).innerWidth();
    containerPos = $container.offset().top;
    naviPosition();
  }

  function _check(){

    scrollY = $(window).scrollTop();
    naviPosition();
    
    for (var i = 0; i < $sections.length; i++){

      // header Animation
      if(scrollY > sectionPos[0] || scrollY < sectionPos[$sections.length - 1]) {
        if(scrollY >= sectionPos[i] && scrollY < sectionPos[i] + $sections.eq(i).innerHeight()) {
          sectionInview(i);
        } else if(scrollY < sectionPos[0]) {
          sectionInview(-1);
        }
      }
      
      // set Parallax
      if(scrollY + windowH - headerH >= sectionPos[i] && scrollY + windowH - headerH < sectionPos[i] + $sections.eq(i).innerHeight()) {
        if($sections.eq(i).find('.js-aboutalma-parallax').length && windowW > 767){
          sectionScroll(i);
        }
      } else if(scrollY + windowH - headerH >= $('.aboutalma-head').offset().top && scrollY + windowH - headerH < $('.aboutalma-head').offset().top + $('.aboutalma-head').innerHeight()) {
        sectionScroll(-1);
      }
    }
  }

  return {
    init: function(){
      _init();
    }
    , check: function(){
      _check();
    }
  };

}));
