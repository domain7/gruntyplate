app.example = (function($){
  'use strict';

  function init(){
    $('div').addClass('loaded');
  }

  /* Document ready
  /* + + + + + + + + + + + + + + + + + + + + + + + + + + + */

  $(document).on('ready', init);

})(jQuery);
