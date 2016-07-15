Gruntyplate
===========

## Modernizr

  ```
  grunt modernizr
  ```

  This task will search your JS and CSS for any modernizr tasks defined and build a custom build based on this.  If for some reason a test is not defined in your JS/CSS and you want to add it, add it to the `tests` array in the modernizr task config. 

  Note: This will not automatically update on watch.  You will need to re-run the grunt modernizr task.


### Live Reload
All you need is install a Chrome extension
https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en
It is turned on/off in the `grunt watch` config.

### Watch
  Watch JS and CSS

  ```
  grunt watch
  ```

  Watch JS Only:

  ```
  grunt watch:js
  ```

  Watch CSS Only
  ```
  grunt watch:css
  ```

### Sassyplate
  To use [Sassyplate](https://github.com/domain7/sassyplate), run `grunt sassyplate` to clone sassyplate into the styles directory.  This is a one time task.  Don't do this halfway through the project.  Maybe remove the sassyplate commands from `Gruntfile.js` when you're done this.
