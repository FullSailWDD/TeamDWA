
    var expect          = require("chai").expect,
    assert          = require("assert"),
    course          = require('../models/courses.js');

describe('course', function() {
    // test user created before each test
    var testcourse = null;

    beforeEach(function (done) {
        course.add({
            courseAbbr:               "test",
            courseName:                "course name"
        }, function (doc) {
            testcourse = doc;
            doc.courseAbbr.should.equal('test');
            done();
        })
    });

});
