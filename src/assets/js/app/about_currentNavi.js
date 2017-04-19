(function(root, factory) {
  module.exports = factory($ || require('jquery'));
}(this, function($){
  
  var $sections = $('.aboutalma-section[id]'), 
      sectionPos = [],
      scrollY = 0,
      current = -1,
      headerH = $('header').eq(0).outerHeight();
  
  function changeCurrent(curNum) {
    if (curNum != current) {
      current = curNum;
      $('.js-aboutalma-navi li').removeClass('is-current');
      $('.js-aboutalma-navi li:nth-child(' + Number(curNum + 1) + ')').addClass('is-current');
     if(curNum === 0) {
        $('.js-aboutalma-navi-prev').addClass('is-disabled');
        $('.js-aboutalma-navi-next').removeClass('is-disabled').attr('href','#aboutalma-section' + Number(curNum + 2));
      } else {
        $('.js-aboutalma-navi-prev').removeClass('is-disabled').attr('href','#aboutalma-section' + Number(curNum));
        $('.js-aboutalma-navi-next').removeClass('is-disabled').attr('href','#aboutalma-section' + Number(curNum + 2));
      }
    }
  };
  
  function _init(){
    sectionPos = [];
    $sections.each(function(){
      sectionPos.push(parseInt($(this).offset().top));
    });
    scrollY = $(window).scrollTop();
    for (var i = sectionPos.length - 1; i >= 0; i--) {
      if (scrollY >= sectionPos[i] - headerH) {
        changeCurrent(i);
        break;
      }
    }
  }

  function _change(){
    scrollY = $(window).scrollTop();
    for (var i = sectionPos.length - 1 ; i >= 0; i--) {
      if (scrollY < sectionPos[0] - headerH || scrollY > (sectionPos[sectionPos.length - 1] + $sections.eq(-1).outerHeight()) - headerH) {
        $('.js-aboutalma-navi li').removeClass('is-current');
        $('.js-aboutalma-navi-prev,.js-aboutalma-navi-next').addClass('is-disabled');
        current = -1;
      } else if (scrollY >= sectionPos[i] - headerH) {
        changeCurrent(i);
        break;
      }
    };
  }

  return {
    init: function(){
      _init();
    }
    , change: function(){
      _change();
    }
  };

}));
