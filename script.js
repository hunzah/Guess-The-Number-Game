let name = '';
let number = Math.floor(Math.random() * 100);
let guesses = 0;
let wrongGuesses = 0;
let isHint = false;

const output = document.querySelector('#output');
const prompt = document.querySelector('#prompt');
const input = document.querySelector('#prompt input');

prompt.addEventListener('submit', handleSubmit);




const customNumberCheckbox = document.querySelector('#customNumberCheckbox');
const customNumberInputContainer = document.querySelector('#customNumberInputContainer');
const customNumberInput = document.querySelector('#customNumber');
const guessNumberText = document.querySelector('#guessNumberText')

customNumberCheckbox.addEventListener('change', (event) => {
    if (customNumberCheckbox.checked) {
        customNumberInputContainer.style.display = 'block'; // Показать инпут, если чекбокс отмечен
        guessNumberText.style.display = 'block';
    } else {
        customNumberInputContainer.style.display = 'none'; // Скрыть инпут, если чекбокс не отмечен
        guessNumberText.style.display = 'none';
    }
});

printMessage('Введите имя игрока:');


input.focus();

function handleSubmit (event) {
    event.preventDefault()
    processInput(input.value);
    input.value = ''
}


function printMessage(message, isHint = false) {
    let li = document.createElement('li');
    li.textContent = message;
    
    if (isHint) {
        li.classList.add('hint'); 
    }
    
    output.appendChild(li);
}



function clearOutput() {
    for (let i = 0; i < output.children.length; i++) {
        output.removeChild(output.children[i]);
    }
}

function processInput(inputText) {
    if (!inputText) return;

    if (!name) {
        name = inputText;
        clearOutput();
        printMessage(`${name}, загадано число от 0 до 100. Попробуй отгадать его за наименьшее количество попыток. После каждой попытки я скажу "мало", "много" или "верно".`);
        return;
    }

    printMessage(inputText);

    let guess = Number.parseInt(inputText);

    if (Number.isNaN(guess)) return;

    guesses += 1;

    if (guess > number) {
        printMessage('Много. Попробуй еще раз.');
    } else if (guess < number) {
        printMessage('Мало. Попробуй еще раз.');
    } else {
        printMessage(`Верно, это число ${guess}.`);
        printMessage(`Количество попыток: ${guesses}.`);
        printMessage('GAME OVER');
        prompt.remove();
    }

    if (guess !== number) {
        wrongGuesses += 1;
        if (wrongGuesses === 3) {
            if (number % 2 === 0) {
                printMessage('Подсказка: Загаданное число является четным.', true);
            } else {
                printMessage('Подсказка: Загаданное число является нечетным.', true);
            }
        }
    }
}