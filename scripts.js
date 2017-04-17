$(document).ready(function() {
    var questionBank = [];
    var newQuestion;

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

    var response;

    var currentQuestion;

    var questionCount = 10;

    var teamScore = 0;

    var quiz = $('#quiz');

    function TriviaQuestion(triviaObject) {
        this.question = triviaObject.question;
        this.answers = triviaObject.incorrect_answers;
        this.correct = triviaObject.correct_answer;

        this.answers.push(this.correct);

    }

    function printQuestion() {
    	currentQuestion = questionBank[questionCount-1];
        console.log("You're on question " + questionCount + ".");
    	quiz = $('<div id="quiz"><p>' + currentQuestion.question + '</p></div><br>');
        $('#container').append(quiz);

        // answers = $( '<span>' + currentQuestion.question + '</span>' )
        // $('#container').append(answers);

        // If you can, randomize the answers[] array. Does array.randomize() exist?
        // If you can't, you'll need to use something other than a forEach loop to display the answers 

        currentQuestion.answers.forEach(function(answer) {
            answer = $('<label><input type="radio" name="answer" value="' + answer + '" /> ' + answer + '</label><br>');
            quiz.append(answer);

        });
        checkAnswer();
    }

    function checkAnswer(question) {

        $('body').on('click', '#check', function(){
            console.log(currentQuestion);

            if ($('input[type="radio"]:checked').val() == currentQuestion.correct) {
                teamScore++;
                console.log("Correct!");
                console.log(teamScore);
            }
        });
    }

    $('body').on('click', '#next', function() {

    	// Verified that method is being called
    	// Verified that question count is being decreased
    	// Followed the tennis ball to printQuestion();
        
        if(questionCount > 0) {
        	quiz.remove();
        	questionCount--;
        	printQuestion();
        }

            if (questionCount == 0) {
                console.log("You finished. Your score is " + teamScore + ".");
            }

        console.log("Next question");
        console.log(questionCount);

        }
    );
});