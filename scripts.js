$(document).ready(function() {
    
	var questionBank = [];
	var newQuestion;

	// This handles the API data
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple");
	
		xhr.onload = function() {
			response = JSON.parse(xhr.responseText);

			for (var result in response.results) {
				var newQuestion = new TriviaQuestion(response.results[result]);

				questionBank.push(newQuestion);
			}

			currentQuestion = questionBank[0];
			printQuestion();
		};

    xhr.send();

    // Here are my variables for things - important, right?
	var response;
	var currentQuestion;
	var questionCount = 10;
	var score = 0;
	var quiz = $('#quiz');
	var quizOverview = [];
	
	// This is the main Trivia Question constructor
	function TriviaQuestion(triviaObject) {
		this.question = triviaObject.question;
		this.answers = triviaObject.incorrect_answers;
		this.correct = triviaObject.correct_answer;

		// This pushes the correct answer into the answers array
		this.answers.push(this.correct);
	}

// This function shuffles the answer array
function shuffleAnswers() {
    var j, x, i;
    for (i = currentQuestion.answers.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = currentQuestion.answers[i - 1];
        currentQuestion.answers[i - 1] = currentQuestion.answers[j];
        currentQuestion.answers[j] = x;
    }
    printAnswers();
}

function printAnswers() {
	currentQuestion.answers.forEach(function(answer) {
	radioBtn = $('<label><input type="radio" name="answer" value="' + answer + '" /> ' + answer + '</label><br>');
	quiz.append(radioBtn);	
	});
}

// This prints the main question of the game
function printQuestion() {
	currentQuestion = questionBank[questionCount-1];
	// These beauties push each question and the correct answer into the result array
	quizOverview.push(currentQuestion.question);
	quizOverview.push(currentQuestion.correct);
	
		// This log will display the question and correct answer within the console (for testing). Uncomment when testing.
		// console.log(currentQuestion);

	// This populates the current question
	quiz = $('<div id="quiz"><p>' + currentQuestion.question + '</p></div><br>');
	$('#startOver').hide();
	$('#container').prepend(quiz);

	shuffleAnswers();
}


// This displays the score and the answers from the round - no, this is not pretty at all.
function displayScore() {

	quiz = $('<div id="quiz"><p>You got ' + score + ' right.</p><p>Question 1:<br>' + quizOverview[0] + '</p><p>The correct answer was:<br>' + quizOverview[1] + '</p><p>Your answer was:<br>' + quizOverview[2] + '<hr><p>Question 2:<br>' + quizOverview[3] + '</p><p>The correct answer was:<br>' + quizOverview[4] + '</p><p>Your answer was:<br>' + quizOverview[5] + '<hr><p>Question 3:<br>' + quizOverview[6] + '</p><p>The correct answer was:<br>' + quizOverview[7] + '</p><p>Your answer was:<br>' + quizOverview[8] + '<hr><p>Question 4:<br>' + quizOverview[9] + '</p><p>The correct answer was:<br>' + quizOverview[10] + '</p><p>Your answer was:<br>' + quizOverview[11] + '<hr><p>Question 5:<br>' + quizOverview[12] + '</p><p>The correct answer was:<br>' + quizOverview[13] + '</p><p>Your answer was:<br>' + quizOverview[14] + '<hr><p>Question 6:<br>' + quizOverview[15] + '</p><p>The correct answer was:<br>' + quizOverview[16] + '</p><p>Your answer was:<br>' + quizOverview[17] + '<hr><p>Question 7:<br>' + quizOverview[18] + '</p><p>The correct answer was:<br>' + quizOverview[19] + '</p><p>Your answer was:<br>' + quizOverview[20] + '<hr><p>Question 8:<br>' + quizOverview[21] + '</p><p>The correct answer was:<br>' + quizOverview[22] + '</p><p>Your answer was:<br>' + quizOverview[23] + '<hr><p>Question 9:<br>' + quizOverview[24] + '</p><p>The correct answer was:<br>' + quizOverview[25] + '</p><p>Your answer was:<br>' + quizOverview[26] + '<hr><p>Question 10:<br>' + quizOverview[27] + '</p><p>The correct answer was:<br>' + quizOverview[28] + '</p><p>Your answer was:<br>' + quizOverview[29] + '</div>');
	$('#container').prepend(quiz);

}


// Next Button - on click this loads the next question
$('body').on('click', '#next', function() {

		// This evaluates the answer selected and increments the score for correct answers
    	if ($('input[type="radio"]:checked').val() == currentQuestion.correct) {
        	score++;
        } 

		// This makes a radio button selection required
		if (!$('input[type="radio"]').is(':checked')) {
        	alert("You must choose an answer!");
        	return false;
        }
    	
    	// This captures the user's answer in the quiz overview
        var userResponse = $('input[type="radio"]:checked').val();
		quizOverview.push(userResponse);

        // This removes the previous question and repopulates a new question (as long as it's still under 10 questions total)
		if(questionCount > 0) {
			quiz.remove();
			questionCount--;
			$('#startOver').hide();
		}


	// This ends the game after 10 questions
	if (questionCount == 0) {
		displayScore();
		$('#next').hide();
		$('#startOver').show();
	}
	
	printQuestion();    

});


// End
});