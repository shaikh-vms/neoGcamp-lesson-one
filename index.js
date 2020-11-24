var readLineSync = require('readline-sync');
var score = 0;
//for ease of use
function print(data){
  console.log(data);
}

//array of questions object
var questionArray = [
  {
    question: "am I older than 25 years ? ",
    answer: "NO",
  },
  {
    question: "where I live ? ",
    answer: "Latur",
  },
  {
    question: "which stream I am studying ? ",
    answer: "BCA",
  },
  {
    question: "which college I go to (give short form as answer) ? ",
    answer: "DCCL",
  },
];

//check score if it is greater than 0 before print 
//it is used to print 0 isnsted of printing negative value
function printScore(score){
  if(score > 0){
    print("Score: "+ score);
  }else{
    print("Score: 0");
  }
}
//process quesitons according to user answer
function processQuestion(question, answer){
  var userAnswer = readLineSync.question(question);
  if(userAnswer.toUpperCase() === answer.toUpperCase()){
    print("OMG turuuu lob..! you know it");
    score = score + 1;
    printScore(score);
    print("-----------------------------------");
  }else{
    print("WRONG..! don't worry you will meet and know me soon");
    //using if condition as if score is 0 and if we substract it goes negative so next time score //increasing goes difficult
    if(score > 0){
      score = score - 1;
    }
    printScore(score);
    print("-----------------------------------");
  }
}
var userName= readLineSync.question("Hey!...What's your name? ");
print("Welcome..."+ userName);
print("Chalo shuru krte hai khela...");
print("-----------------------------------");

for(var i=0;i< questionArray.length; i++){
  currentObject = questionArray[i];
  processQuestion(currentObject.question, currentObject.answer);
}

print("You got overall "+ score +" out of 4");






