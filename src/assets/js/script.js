import $ from 'jquery';

import * as Sample from './app/sample';

const ua = require('./lib/uaCheck.js');

$(document)
  .ready(function(){

    // --------------------
    // check UA, add class
    if(ua.device === 'tablet') {
      $('html').addClass('use-tablet');
    }
    if(ua.browser === 'ie') {
      $('html').addClass('use-ie');
      $('html').addClass('use-ie' + ua.ieVersion);
    }
      

  })
;

$(window)
  .on('load',function(){
  })
  
;