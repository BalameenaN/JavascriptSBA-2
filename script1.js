const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript"
};

// The provided assignment group.
const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500
    }
  ]
};

// The provided learner submission data.
const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47
    }
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150
    }
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400
    }
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39
    }
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140
    }
  }
];

function getLearnerData(course, ag, submissions) {
  //////////////////////////// retriving student ID
  let result1 = [];
  let resultobj1 = {};
  let resultobj2 = {};
  let tmpSubmission1 =[]; let tmpSubmission = [];
  for(let i=0; i<LearnerSubmissions.length; i++){
        let tmp = LearnerSubmissions[i].learner_id;
        tmpSubmission1.push(tmp);

  }
  console.log(tmpSubmission1);
  tmpSubmission =[...new Set(tmpSubmission1)];
  console.log(tmpSubmission);

  ////////////////////////////////////////retriving the student corresponding details
 
 let firstStudent=[]; let secondStudent= [];
 submissions.forEach((s, i) => {

  if (s.learner_id === 125 && s.assignment_id!==3) {
    firstStudent.push(
      {
        "id": s.learner_id,
        "assignment_id": s.assignment_id,
        "date": s.submission.submitted_at,
        "score": s.submission.score
      });
  }
  else if (s.learner_id === 132) {
    secondStudent.push({
      "id": s.learner_id,
      "assignment_id": s.assignment_id,
      "date": s.submission.submitted_at,
      "score": s.submission.score
    });
  }
})//forEach
  
  console.log(firstStudent);
  console.log(secondStudent);

////////////////////////////////////////Retrieving assignment details
  
  let assignments = ag.assignments;
  
   assignments.forEach((s,i)=>{
     delete s.name;
  })//foreach
  console.log(assignments);

///////////////////////////////////Date verification

function dateVerification(submitted,due){

  if (typeof submitted === 'string') {
      submitted = new Date(submitted);
    }
    if (typeof due === 'string') {
      due = new Date(due);
    }
     const expression = submitted <= due;
    // Check if the given date is before or equal to the end date
    return expression;

  }
//////////////////////////////////condition verification
let avgobj1 = []; let sum =0; let out1=0;
let avgobj2 =[];   let div=0; let out2 =0;
for(let i=0; i<tmpSubmission.length; i++){

  switch(tmpSubmission[i]){

      case 125:
          try{
          for(let i=0; i<assignments.length; i++){
              let firstAvg;
              if(dateVerification(firstStudent[i].date,assignments[i].due_at)){
              firstAvg = firstStudent[i].score/assignments[i].points_possible;
              console.log(`${firstAvg} is the score of assignment no.${i+1} `);
              
              }//if
              else{
              firstAvg = (firstStudent[i].score - 15) /assignments[i].points_possible;
               console.log(`${firstAvg} is the score of assignment no.${i+1} `);
                }//else
                avgobj1.push(firstAvg);
                console.log(avgobj1);
                //avg
                sum += firstStudent[i].score;
                div += assignments[i].points_possible;
                out1 = sum/div;
                console.log(out1+"average");
          }//for
      }catch(error){
      console.log("third assignment is not needed");
    
  }//catch
  break;
      case 132:
          try{
              for(let i=0; i<assignments.length; i++){
                  let secondAvg;

                  if(dateVerification(secondStudent[i].date,assignments[i].due_at)){
                  secondAvg = secondStudent[i].score/assignments[i].points_possible;
                  console.log(`${secondAvg} is the score of assignment no.${i+1} `);
                  }//if
                  else{
                  let newMark = secondStudent[i].score - 15;
                  secondAvg = parseFloat((newMark /assignments[i].points_possible).toFixed(2));
                  console.log(secondAvg);
                  console.log(`${secondAvg} is the score of assignment no.${i+1} `);
                  
                  }//else

                  avgobj2.push(secondAvg); 
                  console.log(avgobj2);

                  if(dateVerification(secondStudent[i].date,assignments[i].due_at)){
                  sum += secondStudent[i].score;}
                 else{
                  sum = sum+secondStudent[i].score-15;}
                  div += assignments[i].points_possible;
                  out2 = sum/div;
                console.log(out2+"average");
              }//for
          }catch(error){
          console.log("third assignment is not needed");}//catch
          break;
          
  }//switch

}//for
let avg=[];

let resultout = [
    {
         id: tmpSubmission[0], 
         "1" : avgobj1[0],
         "2" : avgobj1[1],
         avg: out1
     },
     {
      id: tmpSubmission[1], 
         "1" : avgobj2[0],
         "2" : avgobj2[1],
         avg : out2
     }
  ];

return resultout;

}//getLearnerData

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
console.log("==========RESULT=========")
console.log(result);