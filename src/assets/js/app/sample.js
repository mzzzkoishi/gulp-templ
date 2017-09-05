export function init(){
  if($(window).scrollTop() > 30) {
    $('.js-scrollable').addClass('is-hide');
  } else {
    $('.js-scrollable').removeClass('is-hide');
  }
  
  if(window.innerHeight < $('.js-billboardImg').offset().top + $('.js-billboardImg img').innerHeight()) {
    $('.js-scrollable').addClass('is-fixed');
  } else {
    $('.js-scrollable').removeClass('is-fixed');
  }
  
  
}
