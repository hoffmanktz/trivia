$(document).ready(function() {
	var xhr = new XMLHttpRequest();
xhr.open("GET", "https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple", false);
xhr.send();

console.log(xhr.status);
console.log(xhr.statusText);

var response = JSON.parse(xhr.responseText);

var questionBank = [];

var currentQuestion;

var teamScore = 0;

var TriviaQuestion = function(triviaObject) {
	this.question = triviaObject.question;
	this.category = triviaObject.category;
	this.answers = triviaObject.incorrect_answers;
	this.correct = triviaObject.correct_answer;

	this.answers.push(this.correct);

};



for (var result in response.results) {
	// console.log(response.results[result].category);
	var newQuestion = new TriviaQuestion(response.results[result]);

	questionBank.push(newQuestion);

}
// console.log(obj.correct_answer);


var printQuestion = function() {
	questionBank.forEach(function(question) {
		currentQuestion = question;
		// console.log(question.question);
		console.log(question.correct);
		$('#randomQuestion').find( "span:last" ).remove();
		$('#randomQuestion').append( $( '<span>' + question.question + '</span>' ) );
		// console.log(question.answers);
		$('#answer1').find( "span:last" ).remove();
		// How do you parse answers into its components?
		$('#answer1').html(question.answers[0]);
		$('#answer2').find( "span:last" ).remove();
		$('#answer2').html(question.answers[1]);
		$('#answer3').find( "span:last" ).remove();
		$('#answer3').html(question.answers[2]);
		$('#answer4').find( "span:last" ).remove();
		$('#answer4').html(question.answers[3]);

	});
};

var checkAnswer = function(question) {
	console.log("The correct answer is " + question.correct);
	// We are currently getting the value of <input>'s "value" attribute
	// We need to get the innerHTML (or html() in jQuery) from the <span> element for the correct answer
	console.log("We are selecting " + $('input[type="answer"]:checked'));
		if ($('input[type="answer"]:checked').html() == question.correct) {
		teamScore++;
		console.log("Hi");
	} 
};

$('#quiz').click(function () {
	checkAnswer(currentQuestion); 
});

printQuestion();




// var printAnswers = function() {
// 	questionBank.forEach(function(question) {
// 		alert(question.answers);
// 	});
// };


});

