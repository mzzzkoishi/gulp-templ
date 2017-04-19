(function() {

  require('jquery');
  
  if(!$('.js-aboutalma-container').length) return;

  var Lazyload = require('../app/setLazysizes.js'),
      currentNavi = require('../app/about_currentNavi.js'),
      aboutNavi = require('../app/about_navi.js'),
      checkScroll = require('../app/about_checkScroll.js');
  
  var resizeTimer = false,
      ua = '';
    
  $(document)
    .ready(function(){
      Lazyload.init();
      require('lazysizes');
      
      ua = navigator.userAgent;
      if(ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0){
      }else if(ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0){
        $('html').addClass('use-tablet');
      }
    })
    .on('click', '.js-aboutalma-navi a[href^="#"]', function(e){
      var speed = 400,
          href = $(e.currentTarget).attr('href'),
          $target = $(href == '#' || href == '' ? 'html' : href),
          position = parseInt($target.position().top + $('.breadcrumb').eq(0).outerHeight());
      
      if($(e.currentTarget).parents('.js-aboutalma-navi-container').length){
        aboutNavi.close();
        setTimeout(function(){
          $('body,html').animate({scrollTop:position}, speed, 'swing');
        },600);
      } else {
        $('body,html').animate({scrollTop:position}, speed, 'swing');
      }
      return false;
    })
    .on('click','.js-aboutalma-navi-switch',function(e){
      if($('.js-aboutalma-navi').hasClass('is-open')){
        aboutNavi.close(); 
      } else {
        aboutNavi.open(); 
      }
    })
    .on('click','.js-aboutalma-container',function(e){
      if($('.js-aboutalma-navi').hasClass('is-open')){
        aboutNavi.close();
      }
    })
  ;
  
  $(window)
    .on('load',function(){
      currentNavi.init();
      checkScroll.init();
    })
    .on('scroll',function(){
      currentNavi.init();
      currentNavi.change();
      checkScroll.init();
      checkScroll.check();
    })
    .on('resize',function(){
      if (resizeTimer !== false) {
        clearTimeout(resizeTimer);
      }
      resizeTimer = setTimeout(function() {
        currentNavi.init();
        checkScroll.check();
      });
    });
  
})();
