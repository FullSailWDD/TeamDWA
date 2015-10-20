var allSections = []; //[['name',wight,scores[0,0,0,0]]['name',wight,scores[0,0,0,0]]['name',wight,scores[0,0,0,0]]]
var sectionWeights = []; //[0,0,0,0]
var itemScores = []; //

//fill out sectionWeights
for(i=0;i<$scope.score.length;i++){
    sectionWeights.push($scope.score[i].parseInt(sectionWeigh));
};
//fill out allSections
for(i=0;i<$scope.score.length;i++){
    //create empty array for current section
    var currentSection = [];
    //create vars for section info
    var currentSectionName = $scope.score[i].sectionName;
    var currentSectionWeight = $scope.score[i].sectionWeight;
    //push section info vars into array
    currentSection.push(currentSectionName,currentSectionWeight);
    //create empty array for items
    var scores = [];
    //loop though items in section
    for(j=0;j<$scope.score.length;j++){
        //push scores into scores array
        scores.push($scope.score[i].scores[j]);
    };
    //push the scores array into current Section
    currentSection.push(scores);
    //push section to allSections
    allSections.push(currentSection);
};
//fill out itemScores
for(i=0;i<allSections.length;i++){
    var currentItem = [];
    for(j=0;j<allSections.length;j++){
        var currentItemVal = 0;
        currentItemVal = allSections[i].scores[j];
        currentItem.push(currentItemVal);
    };
    itemScores.push(currentItem);
};

//define grading function
$scope.evaluateScore = function(sectionWeights,itemScores){
   console.log('calculating grade');
   //validate section weights
   console.log('validating section weights');
   if(sectionWeights.reduce(function(total,num){return total+num},0)!=100){console.log('your section vals do not equal 100')}else{
       console.log('your section values are valid');
       //declare array for actual section values
       var rubricScore = 0;
       var sectionVals = [];
       //for how many sections there are
       for(i=0;i<sectionWeights.length;i++){
           console.log('entered sections for loop');
           //section score equals all item scores added up and divided by the total possible score
           var sectionActual = itemScores[i].reduce(function(total,num){return total+num},0) / (itemScores[i].length*100);
           //section values equals the sections weight times actual value
           var sectionVal = sectionWeights[i] * sectionActual;
           //push to section values variable
           sectionVals.push(sectionVal);
           console.log('pushed a value to sectionVals');
       };
       //sectionVals now has all section scores
       console.log('exited for loop');
       rubricScore = sectionVals.reduce(function(total,num){return total+num},0);
       console.log('alerting final score');
       alert(rubricScore);
   }
};

//run grading function
evaluateScore(sectionWeights,itemScores);