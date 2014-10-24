/* Main Object
/* + + + + + + + + + + + + + + + + + + + + + + + + + + + */

var app = {};

(function ($, app) {

  app.onload = {
    init: function() {
      app.onload.loadjQuery();
    },

    loadjQuery: function() {

      // Load jQuery with yepnope
      yepnope([{
        load: 'http://ajax.aspnetcdn.com/ajax/jquery/jquery-2.0.0.min.js',
        complete: function () {
          if (!window.jQuery) {
            yepnope('js/src/vendor/jquery-2.0.0.min.js');
          }
        }
      }]);
    }

  };

  app.somemethod = {
    
    init: function() {

    } // init

  }; // somemethod


  /* Document ready
  /* + + + + + + + + + + + + + + + + + + + + + + + + + + + */

  $(document).ready(function() {
    app.onload.init();
  });


}(jQuery, app));