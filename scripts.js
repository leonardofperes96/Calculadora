// Elementos para manipulação

const previousOperandText = document.querySelector('[data-previous-operand]');
const currentOperandText = document.querySelector('[data-current-operand]');
const operationButtons = document.querySelectorAll('[data-operator]');
const deleteButton = document.querySelector('[data-delete-button]');
const clearButton = document.querySelector('[data-clear-button]');
const equalButton = document.querySelector('[data-equal-button]');
const numbersButton = document.querySelectorAll('[data-number]');

class Calculator {
  constructor(previousOperandText, currentOperandText) {
    this.previousOperandText = previousOperandText;
    this.currentOperandText = currentOperandText;
    this.clear();
  }
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  calculate() {
    const previousOperandFloat = parseFloat(this.previousOperand);
    const currentOperandFloat = parseFloat(this.currentOperand);
    let result;

    if (isNaN(previousOperandFloat) || isNaN(currentOperandFloat)) return;

    switch (this.operation) {
      case '+':
        result = previousOperandFloat + currentOperandFloat;
        break;
      case '-':
        result = previousOperandFloat - currentOperandFloat;
        break;
      case '*':
        result = previousOperandFloat * currentOperandFloat;
        break;
      case '/':
        result = previousOperandFloat / currentOperandFloat;
        break;
      default:
        return;
    }

    this.currentOperand = result;
    this.operation = undefined;
    this.previousOperand = '';
  }

  operatorFunction(operation) {
    if (this.previousOperand !== '') {
      this.calculate();
    }
    if (this.currentOperand === '') return;
    this.operation = operation;
    this.previousOperand = `${this.currentOperand} ${operation}`;
    this.currentOperand = '';
  }

  addNumber(number) {
    if (this.currentOperand.includes('.') && number === '.') return;
    this.currentOperand = `${this.currentOperand}${number}`;
  }
  equal(operation) {}
  clear() {
    this.previousOperand = '';
    this.currentOperand = '';
    this.operation = undefined;
  }

  updateDisplay() {
    this.previousOperandText.innerText = this.previousOperand;
    this.currentOperandText.innerText = this.currentOperand;
  }
}

const calculator = new Calculator(previousOperandText, currentOperandText);

// Eventos

clearButton.addEventListener('click', () => {
  calculator.clear();
  calculator.updateDisplay();
});

numbersButton.forEach((number) => {
  number.addEventListener('click', () => {
    calculator.addNumber(number.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((operation) => {
  operation.addEventListener('click', () => {
    calculator.operatorFunction(operation.innerText);
    calculator.updateDisplay();
  });
});

equalButton.addEventListener('click', () => {
  calculator.calculate();
  calculator.updateDisplay();
});

deleteButton.addEventListener('click', () => {
  calculator.delete();
  calculator.updateDisplay();
});
