const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const progressBarFull = document.getElementById('progressBarFull');
const loader = document.getElementById('loader');
const game = document.getElementById('game');
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
  {
    question: "Как Вы предпочтаете отдыхать?",
    choice1: "Посещаю музеи и театры.",
    choice2: "Провожу время с друзьями.",
    choice3: "Катаюсь на верблюдах.",
    choice4: "Забираюсь на крепостные стены.",
    choice5: "Выезжаю на природу.",
    choice6: "Активно, занимаюсь спортом."
  },
  {
    question:"Какой Ваш любимый фильм/сериал?",
    choice1: "«Зита и Гита»",
    choice2: "«Отель “Гранд Будапешт”»",
    choice3: "«Миссия невыполнима: Протокол Фантом»",
    choice4: "«Игра престолов»",
    choice5: "«Звуки музыки»",
    choice6: "«Марко Поло»"
  },
  {
    question: "Я хотел бы жить…",
    choice1: "Среди джунглей.",
    choice2: "В маленьком доме в сельской местности.",
    choice3: "В доме на крыше небоскреба.",
    choice4: "В старинном замке.",
    choice5: "На ферме в горах.",
    choice6: "В коттедже с видом на снежные горы."
  },
  {
    question: "Ваши музыкальные предпочтения?",
    choice1: "Звуки флейты",
    choice2: "Песни бродячего менестреля",
    choice3: "Звуки ветра в пустыне",
    choice4: "Каверы от 2CELLOS",
    choice5: "Симфоническая музыка",
    choice6: "«Чардаш»"
  },
  {
    question: "Кем бы Вы хотели переродиться?",
    choice1: "Чайным плантатором",
    choice2: "Кузнецом",
    choice3: "Шейхом",
    choice4: "Рыбаком",
    choice5: "Звездой мюзикла",
    choice6: "А я в перерождения не верю."
  },
  {
    question: "В каком направлении Вам было бы интересно работать?",
    choice1: "Откровенно говоря, работать мне не хочется",
    choice2: "Научные исследования",
    choice3: "Авантюризм",
    choice4: "Помощь людям",
    choice5: "Занялся бы музыкой",
    choice6: "Там, где общение с людьми сводится к минимуму"
  }
];

//КОНСТАНТА
const MAX_QUESTIONS = 6;

// Функция запуска теста
startTest = () => {
    questionCounter = 0;
    score = 0;
    availableQuesions = [...questions];
    getNewQuestion();
    
};
// Функция рандомного выбора и получения нового вопроса 
getNewQuestion = () => {
    // Если все вопросы были показаны,
    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        // Перейти на страницу end.html.
        return window.location.assign('end.html');
    }
    // Иначе
    // Увеличить счетчик заданных вопросов
    questionCounter++;
    // Обновить номер текущего вопроса
    progressText.innerText = `Вопрос ${questionCounter}/${MAX_QUESTIONS}`;
    // Обновить индикатор процесса
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    // Выбрать рандомно индекс вопроса
    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionIndex];
    // Отобразить вопрос на странице
    question.innerHTML = currentQuestion.question;


    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        // Отобразить ответ
        choice.innerHTML = currentQuestion['choice' + number];
    });

    // Получить копию массива с вопросами за исключением текущего
    availableQuesions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

// Подсчет баллов 
choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {

        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        // Получение номера ответа
        const selectedAnswer = selectedChoice.dataset['number'];

        if (selectedAnswer == '1') incrementScore(0);
        else if (selectedAnswer == '2') incrementScore(1);
        else if (selectedAnswer == '3') incrementScore(2);
        else if (selectedAnswer == '4') incrementScore(3);
        else if (selectedAnswer == '5') incrementScore(4);
        else incrementScore(5);
        //Получить новый вопрос
        getNewQuestion();
    });
});

// Функция подсчета баллов
incrementScore = (num) => {
    score += num;
};
// Задержка времени для прогрузки спиннера и загрузки страницы с вопросами.
setTimeout(() => {
    // Сделать вопросы видимыми
    game.classList.remove('hidden');
    // Сделать спиннер невидимым
    loader.classList.add('hidden');
    }, 1000);
// Начало теста
startTest();