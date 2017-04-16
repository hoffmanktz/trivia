$(document).ready(function() {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "https://opentdb.com/api.php?amount=1&category=9&difficulty=medium&type=multiple", false);
	xhr.send();

console.log(xhr.status);
console.log(xhr.statusText);

var response = JSON.parse(xhr.responseText);

var questionBank = [];

var currentQuestion;

var numberOfQuestions = 0;

var teamScore = 0;

var TriviaQuestion = function(triviaObject) {
	this.question = triviaObject.question;
	this.answers = triviaObject.incorrect_answers;
	this.correct = triviaObject.correct_answer;

	this.answers.push(this.correct);

};



for (var result in response.results) {
	// console.log(response.results[result].category);
	var newQuestion = new TriviaQuestion(response.results[result]);

	questionBank.push(newQuestion);

}


var printAnswers = function() {
		console.log(newQuestion.answers);
		
		questionBank.forEach(function(question) {
		var answer1 = $('<label><input type="radio" name="answer" value="' + newQuestion.answers[0] + '" /> ' + newQuestion.answers[0] + '</label><br>');
	    $("#quiz").append(answer1);
	    var answer2 = $('<label><input type="radio" name="answer" value="' + newQuestion.answers[1] + '" /> ' + newQuestion.answers[1] + '</label><br>');
	    $("#quiz").append(answer2);
	    var answer3 = $('<label><input type="radio" name="answer" value="' + newQuestion.answers[2] + '" /> ' + newQuestion.answers[2] + '</label><br>');
	    $("#quiz").append(answer3);
	    var answer4 = $('<label><input type="radio" name="answer" value="' + newQuestion.answers[3] + '" /> ' + newQuestion.answers[3] + '</label><br>');
	    $("#quiz").append(answer4);
			
		});
	};



var printQuestion = function() {
	questionBank.forEach(function(question) {
		currentQuestion = question;
		// console.log(question.question);
		// console.log(question.correct);
		$('#randomQuestion').find( "span:last" ).remove();
		$('#randomQuestion').append( $( '<span>' + question.question + '</span>' ) );
		// console.log(question.answers);
		// $('#answer1').find( "label:last" ).remove();
		// // How do you parse answers into its components?
		// $('#answer1').html(question.answers[0]);
		// $('#answer2').find( "label:last" ).remove();
		// $('#answer2').html(question.answers[1]);
		// $('#answer3').find( "label:last" ).remove();
		// $('#answer3').html(question.answers[2]);
		// $('#answer4').find( "label:last" ).remove();
		// $('#answer4').html(question.answers[3]);

	// 	var printAnswers = function() {
	// 	questionBank.forEach(function(question) {
	// 	var answerOption = $("<label><input type='radio' name='answer' value=" + question.answers + " /> " + question.answers + "</label><br>");
	//     $("#quiz").append(answerOption);
	//     console.log(questionBank);
	// 	});
	// };
	printAnswers();
	checkAnswer();
	});
};

var checkAnswer = function(question) {
	// newQuestion.answers.toString();
	$('#check').click(function(){
    // console.log( $("input[type='radio']:checked").val() );
    console.log(newQuestion.correct);
    
    if ($('input[type="radio"]:checked').val() == newQuestion.correct) {
		teamScore++;
		console.log("Hi");
		console.log(teamScore);
		// // console.log(teamScore);
  //   } // else if ($('input[type="radio"]checked') !== triviaObject.correct) {
    // 	console.log("You are incorrect.");
    }
});

	// console.log("The correct answer is " + question.correct);
	// // We are currently getting the value of <input>'s "value" attribute
	// // We need to get the innerHTML (or html() in jQuery) from the <span> element for the correct answer
	// console.log("We are selecting " + $('input[type="radio"]:checked').closest('label').text());
	
	};


	$('#next').click(function () {
		console.log("Next question");
		// for (var numberOfQuestions = 0; numberOfQuestions < 10; numberOfQuestions++) {
	// $('#quiz').toggle();
		// }
	});



printQuestion();



});

