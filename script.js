let name = ''
let number = Math.floor(Math.random() * 100)
let guesses = 0

const output = document.querySelector('#output')
const prompt = document.querySelector('#prompt')
const input = document.querySelector('#prompt input')

prompt.addEventListener('submit', handleSubmit)

input.focus();

function handleSubmit (event) {
    event.preventDefault()
    console.log(input.value);

    input.value = ''
}