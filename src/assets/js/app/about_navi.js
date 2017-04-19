(function(root, factory) {
  module.exports = factory($ || require('jquery'));
}(this, function($){
  
  var currentScrollY = '';
  
  function _open(){
    $('.js-aboutalma-navi-container').css({
      display: 'block'
    });
    currentScrollY = $(window).scrollTop();
    if($(window).innerWidth() < 768){
      $('#wrapper').addClass('is-fixed').css({
        top: '-' + currentScrollY + 'px'
      });
    }
    setTimeout(function(){
      $('.js-aboutalma-navi').addClass('is-open');
    },200);
  }

  function _close(){
    $('.js-aboutalma-navi').removeClass('is-open');
    if($(window).innerWidth() < 768){
      $('#wrapper').removeClass('is-fixed').attr({style:''});
      $( 'html, body' ).prop( { scrollTop: currentScrollY } );
    }
    setTimeout(function(){
      $('.js-aboutalma-navi-container').css({
        display: 'none'
      });
    },200);
  }

  return {
    open: function(){
      _open();
    }
    , close: function(){
      _close();
    }
  };

}));
