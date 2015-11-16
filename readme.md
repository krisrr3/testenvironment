# Test Orchestrator

	
Handy test environments which would be useful for testers, as it would have everything they need in a single container to start testing an API/Application.

Grunt would be used as the orchestrator and it will be used to prepare the data for the tests, start the API/Application and run the tests.

An example grunt file, data file and test have been provided. They will need to be mounted and run with the following command

`docker run --rm --name=db
-v /var/run/docker.sock:/var/run/docker.sock -v $(which docker):/usr/bin/docker 
-v /c/Users/{path}/testenvironment/test_orchestrator:/test_orchestrator 
krisrr3/testenvironments:ora11g_node_test_orc_v4 
grunt --gruntfile /test_orchestrator/Gruntfile.js --force`

## Flavours

Chances are your company is not using docker in PROD yet and the developers have not yet started using docker. No problemo!!

For non-docker applications, modify the current execute.sh script and add a line to start the application that needs to be tested (or just do it manually :-)).  

## Example

Check the test_orchestrator folder in the relevant branch on the git repository.
You will need to check the Gruntfile itself and it should be self-explanatory.

For the database, check the user, schema and tests/{test_scenario}/input_data folders. They contain examples that you will need to customize for your needs.

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

There is also no need to have the 2 volumes for docker.sock to work

`docker run --rm 
-v /c/Users/{path}/testenvironment/test_orchestrator:/test_orchestrator 
krisrr3/testenvironments:ora11g_node_test_orc_v4 
grunt --gruntfile /test_orchestrator/Gruntfile.js --force`