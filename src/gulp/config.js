var make = {
        device: '' // ['pc','sp'] / ''
      , backend: false  
    },
    basePaths = {
        srcDir: 'assets'
      , dstDir: '../dist'
      , sgDir : '../dist/styleguide'
      , prdDir: '../www/html/assets/themes/sheis/assets'
    },
    ports = {
        static: 8020
      , styleguide: 8025
    },
    use = {
        templateEngine: 'ejs' // ejs/pug
      , es6: true // boolean
      , styleguide: true // boolean
    };

module.exports = {
  base: basePaths,
  ports: ports,
  make: make,
  use: use
};