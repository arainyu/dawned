/**
 * @copyright http://www.monring.com
 * @author arain.yu(abcily@126.com)
 * @namespace 
 * @description Dawned 代码打包脚本
 */

module.exports = function(grunt){
	
	grunt.initConfig({
		
    	pkg: grunt.file.readJSON('package.json'),
    	banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
			      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
			      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
			      '* Copyright (c) <%= grunt.template.today("yyyy") %> arain;' +
			      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    	config: {
    		SRC_DIR: '<%= pkg.root_dir %>/src',
    		DEST_DIR: '<%= pkg.root_dir %>/build/dest'
    	},
    	
    	clean: ['<%= config.DEST_DIR %>'],
    	
    	uglify: {
	      options: {
	        banner: '<%= banner %>'
	      },
	      dist: {
	        src: '<%= config.DEST_DIR %>/dawned.src.js',
	        dest: '<%= config.DEST_DIR %>/dawned.min.js'
	      },
	    },
	    requirejs: {}
	});
	
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    
    grunt.registerTask('initRequirejs', function(){
    	grunt.log.writeln('start initRequirejs task');
    	
    	var cfgFile = grunt.config.get('config.SRC_DIR')+'/builder/webconfig.js';
    	var fileBuffer = grunt.file.read(cfgFile);
    	
    	try {
            var requirejs = new Function(fileBuffer+'return rjs;');
            grunt.config.set('requirejs', requirejs());
            grunt.task.run('requirejs');
        } catch (e) {
            grunt.log.errorlns(e);
        }
    });
    
    grunt.registerTask('default', function(){
    	var tasks = ['clean', 'initRequirejs', 'uglify'];
    	
    	grunt.task.run(tasks);
    });
};
