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
    // Task configuration.
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: [
          'js/src/vendor/modernizr-custom.js',
          'js/src/app.js',
          'js/src/modules/{,*/}*.js'
        ],
        dest: 'js/build/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>',
        sourceMap: true,
        compress: {
          drop_console: false,
          drop_debugger: false
        }
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'js/build/<%= pkg.name %>.min.js'
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
        extensibility: {},
        //Add any test not in your JS/CSS here:
        tests: [],
        files: {
          src: [
            'stylesheets/scss/{,*/}*.{scss}',
            'js/src/{,*/}*.js',
            '!js/src/vendor/{,*/}*.js'
          ]
        },
        matchCommunityTests: true,
        // Have custom Modernizr tests? Add paths to their location here.
        customTests: []
      }
    },

    compass: {
      dist: {
        options: {
          config: 'config.rb',
        }
      }
    },

    //Combine Media Queries
    cmq: {
      options: {
        log: false
      },
      dist: {
        files: {
          'stylesheets/css/': [
            'stylesheets/css/{,*/}*.css'
          ]
        }
      }
    },

    watch: {
      js: {
        files: ['js/src/{,*/}*.js'],
        tasks: ['js']
      },
      css: {
        files: ['stylesheets/scss/{,*/}*.{scss,sass}'],
        tasks: ['css']
      }
    }
  });

  //Tasks
  grunt.registerTask('default', ['js', 'css']);
  grunt.registerTask('js', ['jshint', 'concat', 'uglify']);
  grunt.registerTask('css', ['compass', 'cmq']);

};

