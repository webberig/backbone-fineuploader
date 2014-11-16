module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        folder: {
            components: 'bower_components',
            src: 'src',
            dist: 'dist'
        },
        concat:
        {
            uploader: {
                src: [
                    // Others
                    '<%=folder.src%>/Backbone.FineUploader.Collection.js'
                ],
                dest: '<%=folder.dist%>/Backbone.FineUploader.js'
            }
        },

        uglify: {
            uploader: {
                src: ['<%=folder.dist%>/Backbone.FineUploader.js'],
                dest: '<%=folder.dist%>/Backbone.FineUploader.min.js'
            }
        },
		watch: {
			js: {
				files: '<%=folder.src%>/**/*.js',
				tasks: ['concat']
			}
		}
    });

    // Load tasks from "grunt-sample" grunt plugin installed via Npm.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('js', ['concat', 'uglify']);

    // Default task.
    grunt.registerTask('default', ['js']);

};