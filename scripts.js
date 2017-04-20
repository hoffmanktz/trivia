$(document).ready(function() {
    
	var questionBank = [];
	var newQuestion;

	// This handles the API data
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "https://opentdb.com/api.php?amount=10&category=9");
	
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
	var questionNumber = 1;
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

    for (var i = 0; i <= currentQuestion.answers.length; i++) {
		var randomNumber = Math.floor(Math.random() * currentQuestion.answers.length);
		var randAnswer = currentQuestion.answers.splice(randomNumber, 1);
		answer = $('<label><input type="radio" name="answer" value="' + randAnswer + '" /> ' + randAnswer + '</label><br>');
		i = 0;
		quiz.append(answer);

	}
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
	quiz = $('<div id="quiz"><h3>' + questionNumber + '. ' + currentQuestion.question + '</h3></div><br>');
	$('#startOver').hide();
	$('#container').prepend(quiz);

	shuffleAnswers();
}


// This displays the score and the answers from the round - no, this is not pretty at all.
function displayScore() {

	quiz = $('<div id="quiz"><h2>You got <span class="score">' + score + '</span> right.</h2><p><span class="bold">Question 1:</span><br>' + quizOverview[0] + '</p><p><span class="bold">The correct answer was:</span><br>' + quizOverview[1] + '</p><p><span class="bold">Your answer was:</span><br>' + quizOverview[2] + '</p><hr><p><span class="bold">Question 2:</span><br>' + quizOverview[3] + '</p><p><span class="bold">The correct answer was:</span><br>' + quizOverview[4] + '</p><p><span class="bold">Your answer was:</span><br>' + quizOverview[5] + '<hr><p><span class="bold">Question 3:</span><br>' + quizOverview[6] + '</p><p><span class="bold">The correct answer was:</span><br>' + quizOverview[7] + '</p><p><span class="bold">Your answer was:</span><br>' + quizOverview[8] + '<hr><p><span class="bold">Question 4:</span><br>' + quizOverview[9] + '</p><p><span class="bold">The correct answer was:</span><br>' + quizOverview[10] + '</p><p><span class="bold">Your answer was:</span><br>' + quizOverview[11] + '<hr><p><span class="bold">Question 5:</span><br>' + quizOverview[12] + '</p><p><span class="bold">The correct answer was:</span><br>' + quizOverview[13] + '</p><p><span class="bold">Your answer was:</span><br>' + quizOverview[14] + '<hr><p><span class="bold">Question 6:</span><br>' + quizOverview[15] + '</p><p><span class="bold">The correct answer was:</span><br>' + quizOverview[16] + '</p><p><span class="bold">Your answer was:</span><br>' + quizOverview[17] + '<hr><p><span class="bold">Question 7:</span><br>' + quizOverview[18] + '</p><p><span class="bold">The correct answer was:</span><br>' + quizOverview[19] + '</p><p><span class="bold">Your answer was:</span><br>' + quizOverview[20] + '<hr><p><span class="bold">Question 8:</span><br>' + quizOverview[21] + '</p><p><span class="bold">The correct answer was:</span><br>' + quizOverview[22] + '</p><p><span class="bold">Your answer was:</span><br>' + quizOverview[23] + '<hr><p><span class="bold">Question 9:</span><br>' + quizOverview[24] + '</p><p><span class="bold">The correct answer was:</span><br>' + quizOverview[25] + '</p><p><span class="bold">Your answer was:</span><br>' + quizOverview[26] + '<hr><p><span class="bold">Question 10:</span><br>' + quizOverview[27] + '</p><p><span class="bold">The correct answer was:</span><br>' + quizOverview[28] + '</p><p><span class="bold">Your answer was:</span><br>' + quizOverview[29] + '</div>');
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
			questionNumber++;
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