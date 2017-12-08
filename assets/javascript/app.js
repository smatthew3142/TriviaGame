$(document).ready(function(){

	var triviaQuestion = [{

		question: "Who killed Robert's first 'Hand of the King'?",
		possibleAnswer:["Petyr Baelish","Tywin Lannister","Cersei Lannister", "Lysa Arryn"],
		answer: 3
	},{ 

		question: "What are the names of Robb and Rickon Stark's direwolves?",
		possibleAnswer:["Grey Wind & Shaggy Dog", "Ghost & Nymeria", "Grey Wind & Summer", "Shaggy Dog & Summer"],
		answer: 0
	},{

		question: "Brienne of Tarth does NOT pledge loyalty to.....",
		possibleAnswer:["Sansa Stark","Renly Baratheon","Jaime Lannister","Catelyn Stark"],
		answer: 2

	},{

		question: "Which of the following is the Lannister motto?",
		possibleAnswer:["A Lion Doesn't Concern Himself with the Opinions of Sheep","Hear Me Roar","A Lannister always pays his debts","Family, Duty, Honor"],
		answer: 1
	},{

		question: "Who was Arya Stark's 'dance instructor'?",
		possibleAnswer:["Syrio Forel","Jaqen H'ghar","Illyrio Mopatis","Ilyn Payne"],
		answer: 0
	},{

		question: "What is the name of Eddard (Ned) Stark's Valyrian Steel Sword?",
		possibleAnswer:["Widow's Wail","Longclaw","Oathkeeper","Ice"],
		answer: 3
	},{

		question: "Before venturing over the Wall, Daenerys Targaryen's dragon Viserion was what color?",
		possibleAnswer:["Green","Gold","Red","Wight....sorry I mean 'white'."],
		answer: 1
	},{

		question: "The 'Brothers Without Banners' follow which god(s)?",
		possibleAnswer:["The Many-Faced God","The Seven","The Lord of Light","Old Gods of the Forest"],
		answer: 2
	},{

		question: "Which of these houses has a sigil that is NOT an animal?",
		possibleAnswer:["House Baratheon","House Lannister","House Tyrell","House Mormont"],
		answer: 2
	},{

		question: "How many siblings did Eddard (Ned) Stark have?",
		possibleAnswer:["2","3","1","4"],
		answer: 1
	},{

		question: "Daenerys Targaryen claims all of these titles EXCEPT....",
		possibleAnswer:["Mother of Dragons","Protector of the Seven Kingdoms","The Breaker of Chains","The Queen of Thorns"],
		answer: 3
	},{

		question: "Tyrion Lannister has been appointed to which two Small Council positions?",
		possibleAnswer:["Master of Coin & Master of War","Master of Coin & Hand of the King","Master of Whisperers & Master of Coin","Regent & Master of Coin"],
		answer: 1
	},{

		question: "Whose redeeming qualities are her love for her children and her cheekbones?",
		possibleAnswer:["Olenna Tyrell","Daenerys Targaryen","Cersei Lannister","Catelyn Stark"],
		answer: 2
	},{

		question: "Jon Snow's biological parents are...",
		possibleAnswer:["a Targaryen & a Stark","a Targaryen & a Martell","a Stark & a Baratheon","a Martell & a Stark"],
		answer: 0
	},{

		question: "Who killed King Joffrey?",
		possibleAnswer:["Tyrion Lannister","Petyr Baelish","Olenna Tyrell","Varys"],
		answer: 2

	}];

	var gifs = ['gif1','gif2','gif3','gif4','gif5','gif6','gif7','gif8','gif9','gif10','gif11','gif12'];
	var newQuestion;
	var playerAnswer;
	var correctAnswer;
	var wrongAnswer;
	var noAnswer;
	var questionAnswered;
	var time;
	var timeLeft;

	var message = {

		correct: "Correct!",
		wrong: "You know nothin' Jon Snow.",
		timeOut: "Time's up!",
		gameEnd:"Here are your results!"
	}


//start a new game by pressing the 'start' button or the 'try again' button

$('#start').on('click', function(){
	$(this).hide();
	newGame();
});

$('#tryAgain').on('click', function(){
	$(this).hide();
	newGame();
});

//reset game
function newGame(){

	$('#finalScore').empty();
	$('#correctAnswer').empty();
	$('#wrongAnswer').empty();
	$('#noAnswer').empty();
	newQuestion = 0;
	correctAnswer = 0;
	wrongAnswer = 0;
	noAnswer = 0;
	question();
}

//new question
function question(){

	$('#message').empty();
	$('#correctAnswer').empty();
	$('#image').empty();
	questionAnswered = true;

	//get new question and answers
	$('#newQuestion').html('Question ' + (newQuestion+1));

	console.log(newQuestion);

	$('.question').html('<h1>'+triviaQuestion[newQuestion].question+'</h1>');

	for(var i = 0; i < 4; i++){
		var answerChoice = $('<div>');
		answerChoice.text(triviaQuestion[newQuestion].possibleAnswer[i]);
		answerChoice.attr({'data-index': i });
		answerChoice.addClass('selectThis');
		$('.possibleAnswer').append(answerChoice);
	}

	//start countdown

	countdown();

	//timer stops when answer is selected
	$('.selectThis').on('click',function(){

		playerAnswer = $(this).data('index');
		clearInterval(time);
		answerResult();
	});
}

	function countdown(){
	timeLeft = 20;
	$('#timeLeft').html('Time Left: ' + timeLeft);
	questionAnswered = true;
	
	//sets timer will start after 1 sec
	time = setInterval(showCountdown, 1000);
}

	function showCountdown(){
	timeLeft--;
	$('#timeLeft').html('Time Left: ' + timeLeft);
	
	if(timeLeft < 1){
		clearInterval(time);
		questionAnswered = false;
		answerResult();
	}
}


	function answerResult(){

	$('#newQuestion').empty();
	$('.selectThis').empty();
	$('.question').empty();
	$('#timeLeft').empty();

	var viewCorrectText = triviaQuestion[newQuestion].possibleAnswer[triviaQuestion[newQuestion].answer];
	var answerIndex = triviaQuestion[newQuestion].answer;
	console.log(answerIndex);
	//on result page, always show gif
	// $('#image').html('<img src = "assets/images/'+ gif[newQuestion] +'.gif" width = "650px">');
	
	//if correct, show gif and message, add to final score

	if((playerAnswer == answerIndex) && (questionAnswered == true)){
		correctAnswer++;
		$('#message').html(message.correct);

	} 

	//if wrong, show gif and message

	else if((playerAnswer != answerIndex) && (questionAnswered == true)){
		wrongAnswer++;
		$('#message').html(message.wrong);

		//show correct answer
		$('#theCorrectAnswer').html('The answer was: ' + viewCorrectText);


	} 

	//if no answer is submitted, say time's up

	else{
		noAnswer++;
		$('#message').html(message.timeOut);

		//show correct answer
		$('#theCorrectAnswer').html('The answer was: ' + viewCorrectText);
		questionAnswered = true;
	}


	//if questions are done go to final score page
	if(newQuestion == (triviaQuestion.length-1)){
		setTimeout(finalScore, 7000)

	} 

	else{

		newQuestion++;
		setTimeout(question, 7000);
	}	

}

//final score, show how many answers are correct, how many are wrong, how many missed

function finalScore(){
	$('#timeLeft').empty();

	$('#message').empty();

	$('#theCorrectAnswer').empty();

	$('#image').empty();

	$('#finalMessage').html(message.gameEnd);

	$('#correctAnswer').html("Correct Answers: " + correctAnswer);

	$('#wrongAnswers').html("Incorrect Answers: " + wrongAnswer);

	$('#noAnswer').html("Missed: " + noAnswer);

	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');

}




	
	










});