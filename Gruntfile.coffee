module.exports = (grunt) ->
  # Project configuration.
  grunt.initConfig(
    coffee: 
      app: 
        expand: true,
        cwd: 'src/'
        src: '**/*.coffee', 
        dest: 'dist/'
        ext: '.js'
      vendor:
        expand: true,
        cwd: 'vendor/'
        src: '**/*.coffee', 
        dest: 'dist/'
        ext: '.js'        

    sass:
      options:
        loadPath: ['vendor/assets/stylesheets']

      app: 
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
          namespace: 'module.exports'
          name: 't'
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
            src: ['**/*.js', '**/*.css', '**/*.png'], 
            dest: 'dist/'
          ]

    watch:
      #COFFEE
      app_coffee:
        files: ['src/**/*.coffee']
        tasks: 'coffee:app'

      v_coffee:
        files: ['vendor/**/*.coffee']
        tasks: 'coffee:vendor'

      #SASS
      app_sass:
        files: ['src/**/*.sass']
        tasks: 'sass:app'
      
      #HAML
      haml:
        files: ['src/**/*.haml']
        tasks: 'haml'

      copy:
        files: ['vendor/**/*.js', 'vendor/**/*.css', 'vendor/**/*.png']
        tasks: 'copy'


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