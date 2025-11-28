(function() {
var questions = [
{
question: "What is 2*5?",
choices: [2, 5, 10, 15, 20],
correctAnswer: 2
},
{
question: "What is 3*6?",
choices: [3, 6, 9, 12, 18],
correctAnswer: 4
},
{
question: "What is 8*9?",
choices: [72, 99, 108, 134, 156],
correctAnswer: 0
},
{
question: "What is 1*7?",
choices: [4, 5, 6, 7, 8],
correctAnswer: 3
},
{
question: "What is 8*8?",
choices: [20, 30, 40, 50, 64],
correctAnswer: 4
},
{
question: "What is 9/3?",
choices: [3, 5, 27, 6, 39],
correctAnswer: 0
},

// Maths – 10th class level
{
question: "What is the value of (a + b)\u00b2?",
choices: ["a\u00b2 + b\u00b2", "a\u00b2 + 2ab + b\u00b2", "a\u00b2 - 2ab + b\u00b2", "2a\u00b2 + b\u00b2"],
correctAnswer: 1
},
{
question: "What is the square root of 144?",
choices: [10, 11, 12, 13],
correctAnswer: 2
},
{
question: "The value of 3/4 + 5/8 is:",
choices: ["11/8", "1/2", "3/8", "7/8"],
correctAnswer: 0
},
{
question: "What is the HCF of 12 and 18?",
choices: [2, 3, 6, 9],
correctAnswer: 2
},
{
question: "Which of the following is a linear equation?",
choices: ["x\u00b2 + 2x + 1 = 0", "2x + 3 = 7", "3x\u00b3 = 9", "x\u2074 = 16"],
correctAnswer: 1
},

// Science – 10th class level
{
question: "Which gas is released during photosynthesis?",
choices: ["Carbon dioxide (CO\u2082)", "Oxygen (O\u2082)", "Nitrogen (N\u2082)", "Hydrogen (H\u2082)"],
correctAnswer: 1
},
{
question: "Which part of the cell contains genetic material?",
choices: ["Cytoplasm", "Nucleus", "Ribosome", "Mitochondria"],
correctAnswer: 1
},
{
question: "Acid + Base forms what?",
choices: ["Salt + Water", "Only Salt", "Only Water", "Minerals"],
correctAnswer: 0
},
{
question: "Which mirror is used in car headlights?",
choices: ["Concave mirror", "Convex mirror", "Plane mirror", "None"],
correctAnswer: 0
},
{
question: "What is the SI unit of Force?",
choices: ["Watt", "Newton", "Joule", "Pascal"],
correctAnswer: 1
},

// General Knowledge – 10th class level
{
question: "Who is known as the Father of the Indian Constitution?",
choices: ["Mahatma Gandhi", "Dr. B.R. Ambedkar", "Jawaharlal Nehru", "Subhash Chandra Bose"],
correctAnswer: 1
},
{
question: "What is the capital of India?",
choices: ["Mumbai", "New Delhi", "Kolkata", "Chennai"],
correctAnswer: 1
},
{
question: "Which planet is known as the Red Planet?",
choices: ["Earth", "Venus", "Mars", "Jupiter"],
correctAnswer: 2
},
{
question: "Who discovered gravity?",
choices: ["Albert Einstein", "Isaac Newton", "Galileo Galilei", "Michael Faraday"],
correctAnswer: 1
},
{
question: "Where is the Taj Mahal located?",
choices: ["Delhi", "Agra", "Jaipur", "Mumbai"],
correctAnswer: 1
}
];

var questionCounter = 0;
var selections = [];
var quiz = $('#quiz');

displayNext();

$('#next').on('click', function(e) {
e.preventDefault();
if (quiz.is(':animated')) {
return false;
}
choose();
if (isNaN(selections[questionCounter])) {
alert('Please make a selection!');
} else {
questionCounter++;
displayNext();
}
});

$('#prev').on('click', function(e) {
e.preventDefault();
if (quiz.is(':animated')) {
return false;
}
choose();
questionCounter--;
displayNext();
});

$('#start').on('click', function(e) {
e.preventDefault();
if (quiz.is(':animated')) {
return false;
}
questionCounter = 0;
selections = [];
displayNext();
$('#start').hide();
});

$('.button').on('mouseenter', function() {
$(this).addClass('active');
});
$('.button').on('mouseleave', function() {
$(this).removeClass('active');
});

function createQuestionElement(index) {
var qElement = $('<div>', {
id: 'question'
});
var header = $('<h2>Question ' + (index + 1) + ':</h2>');
qElement.append(header);
var question = $('<p>').append(questions[index].question);
qElement.append(question);
var radioButtons = createRadios(index);
qElement.append(radioButtons);
return qElement;
}

function createRadios(index) {
var radioList = $('<ul>');
var item;
var input = '';
for (var i = 0; i < questions[index].choices.length; i++) {
item = $('<li>');
input = '<input type="radio" name="answer" value=' + i + ' />';
input += questions[index].choices[i];
item.append(input);
radioList.append(item);
}
return radioList;
}

function choose() {
selections[questionCounter] = +$('input[name="answer"]:checked').val();
}

function displayNext() {
quiz.fadeOut(function() {
$('#question').remove();
if (questionCounter < questions.length) {
var nextQuestion = createQuestionElement(questionCounter);
quiz.append(nextQuestion).fadeIn();
if (!isNaN(selections[questionCounter])) {
$('input[value=' + selections[questionCounter] + ']').prop('checked', true);
}
if (questionCounter === 1) {
$('#prev').show();
} else if (questionCounter === 0) {
$('#prev').hide();
$('#next').show();
}
} else {
var scoreElem = displayScore();
quiz.append(scoreElem).fadeIn();
$('#next').hide();
$('#prev').hide();
$('#start').show();
}
});
}

function displayScore() {
var score = $('<p>', { id: 'question' });
var numCorrect = 0;
for (var i = 0; i < selections.length; i++) {
if (selections[i] === questions[i].correctAnswer) {
numCorrect++;
}
}
score.append('You got ' + numCorrect + ' questions out of ' + questions.length + ' right!!!');
return score;
}
})();

