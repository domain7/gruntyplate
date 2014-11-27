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
          'js/src/vendor/modernizr.js',
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
    watch: {
      files: ['js/src/{,*/}*.js'],
      tasks: ['default']
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
    }
  });

  // Default task.
  grunt.registerTask('default', ['jshint', 'concat', 'uglify']);
  grunt.registerTask('develop', ['jshint', 'concat']);
  grunt.registerTask('lint', ['jshint']);

};

