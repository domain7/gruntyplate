'use strict';
module.exports = function(grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.client %>;' +
      '*/\n',
    uglify: {
      options: {
        banner: '<%= banner %>',
        sourceMap: true,
        beautify: false,
        mangle: true,
        compress: {
          drop_console: false,
          drop_debugger: false
        }
      },
      all: {
        files: {
          'js/dist/application-head.js': [
            'js/src/vendor/modernizr-custom.js',
            'js/src/vendor/svgxuse.min.js'
          ],
          'js/dist/application.js': [
            'js/src/app.js'
            // 'js/src/modules/header.js'
          ]
        }
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish'),
        force: true
      },
      all: {
        src: [
          'Gruntfile.js',
          'js/src/modules'
        ]
      }
    },
    modernizr: {
      dist: {
        // [REQUIRED] Path to the build you're using for development.
        devFile: 'remote',
        outputFile: 'js/src/vendor/modernizr-custom.js',
        extra: {
          shiv: true,
          printshiv: false,
          load: true,
          mq: false,
          cssclasses: true
        },
        extensibility: {
          addtest : false,
          prefixed : false,
          teststyles : false,
          testprops : false,
          testallprops : false,
          hasevents : false,
          prefixes : false,
          domprefixes : false,
          cssclassprefix: ''
        },
        //Add any test not in your JS/CSS here:
        tests: [],
        files: {
          src: [
            'stylesheets/scss/{,*/}*.scss',
            'js/src/{,*/}*.js',
            '!js/src/vendor/{,*/}*.js'
          ]
        },
        matchCommunityTests: true,
        // Have custom Modernizr tests? Add paths to their location here.
        customTests: []
      }
    },

    //Use this for old school compass projects
    compass: {
      dist: {
        options: {
          config: 'config.rb',
        }
      }
    },

    sass: {
      options: {
        sourceMap: true,
        outputStyle: 'expanded' //nested, expanded, compact, compressed
      },
      dist: {
        files: [{
          expand: true,
          flatten: true,
          src: 'stylesheets/scss/*.scss',
          dest: 'stylesheets/css/',
          ext: '.css'
        }]
      }
    },

    postcss: {
      options: {
        map: true,
        processors: [
          require('autoprefixer')({browsers: 'last 4 versions'}), // add vendor prefixes
          // require('cssnano')() // minify the result. disabled for dev b/c it's slow
        ]
      },
      dist: {
        src: 'stylesheets/css/*.css'
      }
    },


    svgstore: {
      options: {
        prefix: 'icon-',
        svg: {
          viewBox: '0 0 30 30',
          xmlns: 'http://www.w3.org/2000/svg'
        }
      },
      default: {
        files: {
          'images/svg-sprite.svg': ['images/svg-icons/*.svg']
        }
      }
    },

    watch: {
      options: {
        livereload: true
      },
      js: {
        files: ['js/src/{,*/}*.js'],
        tasks: ['js']
      },
      svg: {
        files: ['images/svg-icons/{,*/}*.svg'],
        tasks: ['svgstore']
      },
      css: {
        files: ['stylesheets/scss/{,*/}*.{scss,sass}'],
        tasks: ['css']
      }
    }
  });

  //Tasks
  grunt.registerTask('default', ['js', 'css', 'svgstore']);
  grunt.registerTask('js', ['jshint', 'uglify']);
  grunt.registerTask('css', ['sass', 'postcss']);

};

