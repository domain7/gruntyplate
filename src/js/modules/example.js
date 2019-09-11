app.example = (($) => {
  'use strict';

  const init = () => {
    console.log('ready');
  }; 

  $(document).on('ready', init);

})(jQuery);
