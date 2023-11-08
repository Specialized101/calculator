const add = (a, b) => a + b;
const substract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
const operate = (operator, a, b) => {
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return substract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            if (b === 0)
                return 'LOL';
            return Math.round(divide(a, b) * 100) / 100;
    }
}

const updateDisplay = () => {
    const display = document.querySelector('#display');
    display.textContent = displayValue;
}

const buttons = document.querySelectorAll('.btn');
const numericButtons = Array.from(buttons).filter(button => !isNaN(button.value));
const operatorButtons = Array.from(buttons).filter(button => isNaN(button.value));


let displayValue = '';

let firstNumber = null;
let secondNumber = null;
let operator = null;

numericButtons.forEach(button => {
    button.addEventListener('click', () => {
        displayValue = displayValue.concat(button.value);
        updateDisplay(displayValue);
    });
});

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        switch (button.value) {
            case '+':
            case '-':
            case '/':
            case '*':
                if (operator) {
                    secondNumber = parseFloat(displayValue);
                    displayValue = operate(operator, firstNumber, secondNumber);
                }
                operator = button.value;
                firstNumber = parseFloat(displayValue);
                updateDisplay();
                displayValue = '';
                break;
            case 'clear':
                displayValue = '';
                firstNumber = null;
                secondNumber = null;
                operator = null;
                updateDisplay();
                break;
            case '=':
                secondNumber = parseFloat(displayValue);
                displayValue = operate(operator, firstNumber, secondNumber);
                operator = null;
                updateDisplay();
                break;
        }
    });
});


