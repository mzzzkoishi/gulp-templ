module.exports = (function() {
  var ua = window.navigator.userAgent.toLowerCase(),
      appVersion = window.navigator.appVersion.toLowerCase(),
      browser,
      os,
      ieVersion,
      version,
      device,
      _v;

  if (ua.indexOf('opr') !== -1) {
    browser = 'opera';
  } else if (ua.indexOf("msie") !== -1 || appVersion.match(/trident/)) {
    browser = 'ie';
    ieVersion = ua.match(/((msie|MSIE)\s|rv:)([\d\.]+)/)[3];
    ieVersion = parseInt(ieVersion);
  } else if (ua.indexOf('chrome') !== -1 || ua.indexOf('crios') !== -1) {
    browser = 'chrome';
  } else if (ua.indexOf('firefox') !== -1) {
    browser = 'firefox';
  } else if (ua.indexOf('safari') !== -1) {
    browser = 'safari';
  }

  if (ua.indexOf('ipad') !== -1) {
    os = 'ipad';
    _v = ua.match(/(iphone|ipad).*(os ([\d]+)_([\d]+)_([\d]+))/);
    if(!_v){
      _v = ua.match(/(iphone|ipad).*(os ([\d]+)_([\d]+))/);
    }
    version = Number(_v[3] + '.' + _v[4]);
  } else if (ua.indexOf('iphone') !== -1) {
    os = 'iphone';
    _v = ua.match(/(iphone|ipad).*(os ([0-9]+))/i);
    version = parseInt(_v[3], 10);
  } else if (ua.indexOf('android') !== -1) {
    os = 'android';
    _v = ua.match(/android ([0-9]+)/i);
    version = parseInt(_v[1], 10);
  } else if (ua.indexOf('windows') !== -1) {
    os = 'windows';
  } else if (ua.indexOf('macintosh') !== -1) {
    os = 'mac';
  }

  if((ua.indexOf('android') > 0 && ua.indexOf('mobile') == -1) || ua.indexOf('a1_07') > 0 || ua.indexOf('sc-01c') > 0 || ua.indexOf('ipad') > 0) {
    device = 'tablet';
  } else if((ua.indexOf('iphone') > 0 && ua.indexOf('ipad') == -1) || ua.indexOf('ipod') > 0 || (ua.indexOf('android') > 0 && ua.indexOf('mobile') > 0)) {
    device = 'sp';
  } else {
    device = 'pc';
  }

  return {
    os: os,
    browser: browser,
    ieVersion: ieVersion,
    device: device,
    version: version
  };
}());
