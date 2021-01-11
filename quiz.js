///////////////////////////////////////////////// ** code write by Marshall_GB ** /////////////////////////////////////////////////

var divWrapper = document.getElementById("divWrapper");
    var startQuizButton;
        var submitQuizButton;
            var backQuizButton;

var formQuiz;
    var headDivQuestion;
        var optionDiv;
            var optionInput;

var questionAnswer = "";

/***Start button***/
function startButton() {
    startQuizButton = document.createElement("button");
        startQuizButton.innerHTML = "Start Quiz";
            startQuizButton.classList.add("startButton")
    divWrapper.appendChild(startQuizButton);
        formQuiz = document.createElement("form");
        formQuiz.setAttribute('id', 'forma');
    divWrapper.appendChild(formQuiz);
}
/***Submit button***/
function submitButton() {
      submitQuizButton.classList.add("show");
    submitQuizButton = document.createElement("button");
        submitQuizButton.innerHTML = "Submit";
            submitQuizButton.classList.add("sbButton");
    divWrapper.appendChild(submitQuizButton);
 /***On Submit Button***/
    submitQuizButton.addEventListener("click", function () {
        getSubmitQuiz();
    });
}
/***Back button***/
function backButton() {
    submitQuizButton.classList.add("show");
        backQuizButton = document.createElement("button");
            backQuizButton.innerHTML = "Back";
                backQuizButton.classList.add("sbButton");
    divWrapper.appendChild(backQuizButton);
/***On Back Button***/
    backQuizButton.addEventListener("click", function () {
                divWrapper.innerHTML = ""
        startButton();
            startQuizButton.addEventListener("click", function () {
                getDataQuiz();
        });

    })
}
/***Constructor function***/
function Quiz(question, options, answer, property) {

    this.question = question;
        this.options = options;
            this.answer = answer;
                this.property = property;

    /***Text Question***/
    this.getQuestion = function () {
        var headQuestion = document.createElement("h2");

        var headQuestionText = document.createTextNode(this.property + " : Question : " + this.question);
            headDivQuestion = document.createElement("div");
                headQuestion.appendChild(headQuestionText);
                    headDivQuestion.appendChild(headQuestion);
                        headDivQuestion.classList.add("QuestionDiv")

    }

    /***Question option***/
    this.getOption = function () {

        for (let i = 0; i < options.length; i++) {

            var w = options[i];
                optionInput = document.createElement("input");
                    optionInput.setAttribute('type', 'radio');
                        optionInput.setAttribute('value', w);
                            optionInput.setAttribute('name', "Question:" + this.property);
                        optionDiv = document.createElement("div");
                    optionDiv.setAttribute('value', w);

            var optionText = document.createElement("label");

            var optionLabelText = document.createTextNode(w);
                optionText.setAttribute('for', w);
                    optionText.appendChild(optionLabelText);
                        optionText.setAttribute('for', w);

            optionDiv.appendChild(optionInput);
                optionDiv.appendChild(optionText);
                    headDivQuestion.appendChild(optionDiv)
                formQuiz.appendChild(headDivQuestion);

        }
    }
    /***Question answer***/
    this.getAnswer = function () {
        questionAnswer += this.answer + '\n';

    }
};

/*** Get Question Data***/
function getDataQuiz() {

 
    fetch('quiz.json')
        .then(function (respons) {

            if (respons.status !== 200) {
                throw Error("error while reading file.");

            }

            return respons.json();
        })
        .then(function (data) {
         startQuizButton.classList.add("hide");

            var quizQuestion = data.quiz;

            for (property in quizQuestion) {


                let x = property;
                var questionObject = quizQuestion[x];


                var newQuestion = new Quiz(
                    this.question = questionObject.question,
                        this.options = questionObject.options,
                            this.answer = questionObject.answer,
                                this.property = x,

                );

                newQuestion.getQuestion();
                    newQuestion.getOption();
                        newQuestion.getAnswer();

            }

            submitButton();
                checkedDataAnswer();
        })
        .catch(function (err) {
            console.log('Fetch problem; ' + err.mesage);
        })

}
/***Get Submit Data***/
function getSubmitQuiz() {
 
    let dataAnswer = questionAnswer.split('\n');
            dataAnswer.pop();
    var formData = new FormData(document.forms.forma);

    var inputAnswer = '';

    var keyAnswer = '';

    for (var entry of formData) {

        keyAnswer += entry[0] + '\n';

        inputAnswer += entry[1] + '\n';

    }

    let corectNumberAnswer = 0;

    let dataInputAnswer = inputAnswer.split('\n');
            dataInputAnswer.pop();

    let keyInputAnswer = keyAnswer.split('\n');
            keyInputAnswer.pop();
    if (dataInputAnswer.length < 4) {
        alert("Answer to all questions !")
    }
    else {
        for (let i = 0; i < dataInputAnswer.length; i++) {



            if (dataInputAnswer[i] == dataAnswer[i]) {

                corectNumberAnswer++;

                let inputDataDiv = document.querySelector('div[value="' + dataInputAnswer[i] + '"]');

                let iconCorrect = document.createElement("i");
                        iconCorrect.classList.add("fas", "fa-check", "fa-lg", "correctIcon")
                            inputDataDiv.appendChild(iconCorrect);
                                inputDataDiv.classList.add("correct")

            } else {

                let inputDataDiv = document.querySelector('div[value="' + dataInputAnswer[i] + '"]');

                let dataDiv = document.querySelector('div[value="' + dataAnswer[i] + '"]');

                let iconError = document.createElement("i");
                        iconError.classList.add("fas", "fa-times", "fa-lg", "errorIcon")
                inputDataDiv.appendChild(iconError);
                    inputDataDiv.classList.add("error");
                        dataDiv.classList.add("correct")



            }

            localStorage.setItem(keyInputAnswer[i], dataInputAnswer[i]);

        }
        alert("Your score is " + corectNumberAnswer + " / " + dataInputAnswer.length);
           submitQuizButton.classList.replace("show","hide");
        backButton();


    }

}
/***Checked Local Storage***/
function checkedDataAnswer() {

    if (localStorage.length > 1) {
        for (let i = 0; i < localStorage.length; i++) {

            let key = localStorage.key(i);

            var tt = localStorage.getItem(key);

            let inputData = document.querySelector('input[value="' + tt + '"]');

                    inputData.setAttribute("checked", "checked");
                        
           
        }
         getSubmitQuiz()

    }

}
///////////////////////////////////////////////// ** code write by Marshall_GB ** /////////////////////////////////////////////////
