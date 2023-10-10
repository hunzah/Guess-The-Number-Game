document.addEventListener('DOMContentLoaded', function() {
    let name = ''
    let number = Math.floor(Math.random() * 1000)
    let guesses = 0
    let wrongGuesses = 0
    let isHint = false

    const output = document.querySelector('#output')
    const prompt = document.querySelector('#prompt')
    const input = document.querySelector('#prompt input')
    const restartButton = document.querySelector('#restartButton')

    prompt.addEventListener('submit', handleSubmit);



    const customNumberCheckbox = document.querySelector('#customNumberCheckbox')
    const customNumberInputContainer = document.querySelector('#customNumberInputContainer')
    const checkboxContainer = document.querySelector('.guess-checkbox-container')
    const customNumberInput = document.querySelector('#customNumber')
    const numberErrorMessage = document.querySelector('#numberErrorMessage')
    const guessNumberText = document.querySelector('.guess-checkbox-container #guessNumberText')
    const guessNumberTextChecked = document.querySelector('.guess-checkbox-container #guessNumberTextChecked')

    customNumberCheckbox.addEventListener('change', (event) => {
        if (customNumberCheckbox.checked) {
            customNumberInputContainer.style.display = 'block';
            guessNumberText.style.display = 'none'
            guessNumberTextChecked.style.display = 'block';
            
        } else {
            customNumberInputContainer.style.display = 'none';
            guessNumberText.style.display = 'block'
            guessNumberTextChecked.style.display = 'none';
        }
    });


    printMessage('Введите имя игрока:');


    customNumberInput.addEventListener('keydown', (event) => {
        if (event.key === "Enter") { 
            event.preventDefault(); 
            
            const inputValue = +event.target.value;
            if (inputValue === "") {
                customNumberInput.disabled = false; 
                numberErrorMessage.textContent = ""; 
                checkboxContainer.style.display = 'none'
                customNumberInputContainer.style.display = 'none'
            } else {
                const parsedValue = parseInt(inputValue);
                if (parsedValue < 0) {
                    numberErrorMessage.textContent = "Число должно быть больше 0";
                    event.target.value = "";
                } else if (parsedValue > 1000) {
                    numberErrorMessage.textContent = "Число должно быть меньше 1000";
                    event.target.value = ""; 
                } else {
                    number = parsedValue;
                    customNumberInput.disabled = false; 
                    numberErrorMessage.textContent = ""; 
                    checkboxContainer.style.display = 'none'
                    customNumberInputContainer.style.display = 'none'
                }
            }
        }
    });
    


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
            printMessage(`${name}, загадано число от 0 до 1000. Попробуй отгадать его за наименьшее количество попыток. После каждой попытки я скажу "мало", "много" или "верно".`)
            checkboxContainer.style.display = 'none'
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
            prompt.style.display = 'none'
            restartButton.style.display = 'block'
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

    restartButton.addEventListener('click', () => {
        while (output.firstChild) {
            output.removeChild(output.firstChild);
        }

        name = ''
        number = Math.floor(Math.random() * 1000)
        guesses = 0
        wrongGuesses = 0
        isHint = false


        clearOutput();
        input.value = ''

        

        input.focus()
        prompt.style.display = 'block'
        restartButton.style.display = 'none'
        guessNumberText.classList.add('guess-checkbox-container')
        guessNumberTextChecked.style.display = 'none'
        customNumberInputContainer.style.display = 'none'
        customNumberInputContainer.style.display = 'none'
        customNumberInput.value = ''
        customNumberInput.disabled = false
        numberErrorMessage.textContent = ''
        printMessage('Введите имя игрока:');
    })
})