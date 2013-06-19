module.exports = (grunt) ->
  # Project configuration.
  grunt.initConfig(
    coffee: {
      all: {
        expand: true,
        cwd: 'src/'
        src: '**/*.coffee', 
        dest: 'dist/'
        ext: '.js'
      }
    }
    watch: {
      coffee: {
        files: ['src/**/*.coffee'],
        tasks: 'coffee'
      }
    }
  );
  #TODO move over all js files in src to the dir in dist
  #TODO compile haml assets to javascript
  #TODO compile sass assets to css
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-haml');
  grunt.loadNpmTasks('grunt-contrib-watch');