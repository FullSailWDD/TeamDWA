
    var expect      = require("chai").expect,
    assert          = require("assert"),
    course          = require('../models/courses.js');

describe('Course', function() {
  describe('#add()', function() {
    it('should save without error', function(done) {

      var obj = {  	"degreeName" : "Web Design",
      				"degreeAbbr" : "mochadegreeAbbr", 
      				"courseAbbr" : "mochacourseAbbr", 
      				"courseName" : "mochacourseName" 
				}

      course.add(obj, function(doc) {
      	expect(doc.degreeAbbr).is.equal('mochadegreeAbbr');
        done();
      });
    });
  });
});










