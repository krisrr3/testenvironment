var request = require('../../node_modules/frisby/node_modules/request');
describe("Test Suite for Scenario 123", function() {
	it("just hitting tomcat", function(done) {
	  request("http://application:8080/", function(error, response, body){
		expect(body).toEqual("");
		done();
	  });
	});
});