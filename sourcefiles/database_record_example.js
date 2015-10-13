//var degreeAbbr = "",
//    degreeName = "",
//    degreeDesc = "",
//    courseAbbr = "",
//    courseName = "",
//    courseDesc = "",
//    rubricAbbr = "",
//    rubricName = "",
//    rubricDesc = "",
//    sectionName = "",
//    sectionWeight = 0,
//    itemName = "",
//    itemWiki = "",
//    itemComment = "",
//    gradeOptions = [0,0,0,0];



//run this in the mongo terminal
//=============================
var degreeAbbr = "WDD",
    degreeName = "Web Design and Development",
    degreeDesc = "A bachelors program dealing with web related technologies.",
    courseAbbr = "DWA",
    courseName = "Deploying Web Applications",
    courseDesc = "A course dealing with deployment of web applications.",
    rubricAbbr = "v01",
    rubricName = "Chris Chapman, version 01",
    rubricDesc = "Oct13 2015",
    sectionName = "Research",
    sectionWeight = 10,
    itemName = "Professionalism",
    itemWiki = "www.linktothewiki.com",
    itemComment = "Overview Professionalism is a reflection of how you conduct yourself through your interactions within this class and with your peers. Listed below are some standard itemized deductions and other relevant class information. On Assignments and exams that you go above and beyond what I have requested, or in the case of exams, if you demonstrate an advanced comprehension of a question I will often reward you with extra credit. Assignment not Submitted will result in a -33% Professionalism grade per assignment in addition to a zero on the assignment. This is a team environment and your will need to interpret your peer's code and vise versa. Any assignment with code submitted that is not sufficiently commented will be rejected. Late work is not accepted. Please contact me 24+ hours prior to a deadline to discuss if an adjustment to your deadline is needed. Approval for deadline extension is situational, but I'm flexible if you have a significant need to modify a deadline. Academic dishonesty is not tolerated. By all means work together and find solutions to your issues with each other, but your submitted work should be crafted by your hands, and fit the unique needs of your project. Please mark this activity completed and if any deductions are required, I will notify you. More than likely though this is an easy 10%.",
    gradeOptions = [100,0];
//=============================



//then run this
//=============================
db.courses.save(
{
    "degreeAbbr":degreeAbbr,
    "degreeName":degreeName,
    "degreeDesc":degreeDesc,
    "courses":{
        "courseAbbr":courseAbbr,
        "courseName":courseName,
        "courseDesc":courseDesc,
        "rubrics":{
            "rubricAbbr":rubricAbbr,
            "rubricName":rubricName,
            "rubricDesc":rubricDesc,
            "sections":{
                "sectionName":sectionName,
                "sectionWeight":sectionWeight,
                "items":{
                    "itemName":itemName,
                    "itemWiki":itemWiki,
                    "itemComment":itemComment,
                    "gradeOptions":gradeOptions
                }
            }
        }
    }
}
);
//=============================