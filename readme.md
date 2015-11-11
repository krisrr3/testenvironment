# Test Orchestrator

	
Handy test environments which would be handy for testers, as it would have everything they need in a single container to start testing an API/Application.

Grunt would be used as the orchestrator and it will be used to prepare the data for the tests, start the API/Application (in Tomcat) and run the tests.

An example grunt file, data file and test have been provided. They will need to be mounted and run with the following command

`docker run --rm 
-v /var/run/docker.sock:/var/run/docker.sock -v $(which docker):/usr/bin/docker 
-v /c/Users/{path}/testenvironment/test_orchestrator:/test_orchestrator 
krisrr3/testenvironments:ora11g_node_test_orc 
grunt --gruntfile /test_orchestrator/Gruntfile.js --force`

## Example

Chech the test_orchestrator folder in the relevant branch on the git repository.

## What it does
The test orchestrator uses grunt as an orchestration framework.	
The orchestration involves :

1. starting the Database
2. starting Dockerised Application under test 
3. iterate on tests
	
	1. loading data
	2. running the tests on that data set
	3. clear data
	
4.  stop application
5.  end


## Notes for non-dockerised apps
If your application is not dockerised then you would need to modifiy the grunt script such that it does not attempt to run a docker application.

You would just need to point your application to the DB and to also have your tests point to where your application is deployed.

There is also no need to have the 2 volumes for docker sock to work

`docker run --rm 
-v /c/Users/{path}/testenvironment/test_orchestrator:/test_orchestrator 
krisrr3/testenvironments:ora11g_node_test_orc 
grunt --gruntfile /test_orchestrator/Gruntfile.js --force`