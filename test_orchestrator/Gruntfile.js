var path = require('path');
var fs = require('fs');
var sync = require('child_process').spawnSync;
var testFolders = ["test_123", "test_456"];

var appUsernamePassword = 'application_user/app_user';

module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-shell');


	grunt.registerTask('startApplication', 'starting application in tomcat container', function() {
		var done = this.async();
		grunt.util.spawn(
				{
					cmd: 'docker',
					args: ['run','-d', '--name=application', 'tomcat:8-jre8'],
					opts: {stdio: 'inherit'}
				}, 
				
			      function(err,data,code){
			          grunt.log.writeln(data.stdout);
					  if (data.stderr)
					  {
							grunt.log.writeln(data.stderr);
					  }
					  done(true);
			      });
	});
			
	grunt.initConfig({
        shell: {
			options: {
				stderr: true
			},
            startOracleDatabase: {
                command: function () {
                    return 'startup.sh';
                }
            },
			
			stopApplication: {
                command: function () {
                    return 'docker stop application';
                }
            },
			removeApplication: {
                command: function () {
                    return 'docker rm application';
                }
            },
			createDbUserAndGrants: {
				 options: { stdout: true },
				command: [
					'sqlplus system/oracle @/test_orchestrator/user/user.sql',
				 ].join('\n')
			},createTables : {
				options: { stdout: true },
				command: [
					'sqlplus ' + appUsernamePassword + ' @/test_orchestrator/schema/simpletable.sql',
					
				 ].join('\n')
			},
			verifyData : {
				options: { stdout: true },
				command: [
					'sqlplus ' + appUsernamePassword + ' @/test_orchestrator/schema/verify_simpletable.sql'
				 ].join('\n')
			},
			setupData: {
				options: { stdout: true},
				command: function (testFolder) {
                    return 'sqlldr '+ appUsernamePassword + ' DATA=/test_orchestrator/tests/'+testFolder+'/input_data/simpletable.dat CONTROL=/test_orchestrator/schema/simpletable.ctl LOG=/test_orchestrator/tests/'+testFolder+'/input_data/simpletable.log';
                }
			},
			runTest: {
				options: { stdout: true },
				command: function (testFolder) {
                    return 'jasmine-node /test_orchestrator/tests/' + testFolder + ' --noStack';
                }
			},
			runTests: {
				options: { stdout: true },
				command: function () {
					for (i = 0; i< testFolders.length; i++) {
						grunt.task.run(['shell:createTables', 'shell:setupData:'+testFolders[i], 
						'ShortSleep2',
						'shell:verifyData',
						'shell:runTest:'+testFolders[i]]);
					}	

                    return 'echo test complete for :' + testFolder;
                }
			}
			
        }
    });
	
	
	// This is to sleep for a few seconds...
    grunt.registerTask('ShortSleep2', 'Perform a short sleep', function () {
        var options = this.options({
                timeout : 2000
        });
        grunt.log.writeln('Sleeping ' + options.timeout);
    	setTimeout(
            this.async(),
			options.timeout
        );
    });
	
	// This is to sleep for a few seconds...
    grunt.registerTask('Sleep', 'Perform a sleep', function () {
        var options = this.options({
                timeout : 10000
        });
        grunt.log.writeln('Sleeping ' + options.timeout);
    	setTimeout(
            this.async(),
			options.timeout
        );
    });

	
	grunt.registerTask('default', 
			[
				'startApplication', 
				'shell:startOracleDatabase', 
				'Sleep',
				'shell:createDbUserAndGrants',
				'shell:runTests',
				'shell:stopApplication',
				'Sleep',
				'shell:removeApplication'
				
			]);
};