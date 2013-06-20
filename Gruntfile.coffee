module.exports = (grunt) ->
  # Project configuration.
  grunt.initConfig(
    coffee: 
      all: 
        expand: true,
        cwd: 'src/'
        src: '**/*.coffee', 
        dest: 'dist/'
        ext: '.js'
    sass:
      all: 
        expand: true,
        cwd: 'src/'
        src: '**/*.sass', 
        dest: 'dist/'
        ext: '.css'

    haml:
      options:
        target: 'js'
        language: 'coffee'

      server:
        options:
          namespace: 'process.HAML'

        expand: true,
        cwd: 'src/'
        src: 'templates/**/*.haml', 
        dest: 'dist/'
        ext: '.js'
      
      client:
        expand: true,
        cwd: 'src/'
        src: 'templates/**/*.haml', 
        dest: 'dist/assets/'
        ext: '.js'

    copy:
      vendor:
        files:
          [
            expand: true,
            cwd: 'vendor/'
            src: '**/*', 
            dest: 'dist/'
          ]
    watch:
      coffee:
        files: ['src/**/*.coffee']
        tasks: 'coffee'

      haml:
        files: ['src/**/*.haml']
        tasks: 'haml'

      copy:
        files: ['vendor/**/*']
        tasks: 'copy'

      sass:
        files: ['src/**/*.sass']
        tasks: 'sass'
  );
  #TODO move over all js files in src to the dir in dist
  #TODO compile haml assets to javascript
  #TODO compile sass assets to css
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-haml');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.registerTask('build', ['coffee', 'sass', 'haml', 'copy']);