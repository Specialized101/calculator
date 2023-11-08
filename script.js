const add = (a, b) => a + b;
const substract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
const operate = (operator, a, b) => {
    switch (operator) {
        case '+':
            return Math.round(add(a, b) * 100) / 100;
        case '-':
            return Math.round(substract(a, b) * 100) / 100;
        case '*':
            return Math.round(multiply(a, b) * 100) / 100;
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
const disableDotButton = (value) => {
    let dotBtn = document.querySelector('.btn-dot');
    dotBtn.disabled = value;
};

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
                disableDotButton(false);
                if (operator) {
                    secondNumber = parseFloat(displayValue);
                    displayValue = operate(operator, firstNumber, secondNumber);
                }
                operator = button.value;
                firstNumber = parseFloat(displayValue);
                updateDisplay();
                displayValue = '';
                break;
            case '.':
                if(displayValue === '')
                    displayValue = '0';
                displayValue = displayValue.concat(button.value);
                updateDisplay(displayValue);
                if (displayValue.includes('.'))
                    disableDotButton(true);
                break;
            case 'backspa':
                displayValue = displayValue.replace(
                    displayValue.charAt(displayValue.length - 1), ''
                );
                updateDisplay();
                break;
            case 'clear':
                displayValue = '';
                firstNumber = null;
                secondNumber = null;
                operator = null;
                disableDotButton(false);
                updateDisplay();
                break;
            case '=':
                if (!firstNumber || !displayValue)
                    break;
                secondNumber = parseFloat(displayValue);
                displayValue = operate(operator, firstNumber, secondNumber);
                operator = null;
                updateDisplay();
                break;
        }
    });
});

const body = document.body;

body.addEventListener('keydown', (e) => {
    e.preventDefault();
    const btn = Array.from(buttons).filter(button => button.value === e.key);
    
    btn.forEach(button => button.click());

});
