/*global module:false*/
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
        dest: 'js/dist/<%= pkg.name %>.js'
      }
    },
    removelogging: {
      dist: {
        src: '<%= concat.dist.dest %>'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
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
        '-W030': true,
        node: true,
        esnext: true,
        bitwise: true,
        camelcase: true,
        immed: true,
        indent: 2,
        latedef: true,
        newcap: true,
        noarg: true,
        quotmark: "single",
        regexp: true,
        undef: true,
        unused: false,
        strict: true,
        trailing: true,
        smarttabs: true,
        curly: true,
        eqeqeq: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true,
          app: true
        }
      },
      files: {
        src: ['js/src/modules']
      }
    }
  });

  // Default task.
  grunt.registerTask('default', ['jshint', 'concat', 'removelogging', 'uglify']);
  grunt.registerTask('develop', ['jshint', 'concat']);
  grunt.registerTask('lint', ['jshint']);

};
