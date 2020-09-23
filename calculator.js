let displayValue = '0';
let firstOperand = null;
let secondOperand = null;
let firstOperator = null;
let secondOperator = null;
let result = null;
const buttons = document.querySelectorAll('button');

function updateDisplay() {
  const display = document.getElementById('display');
  display.innerText = displayValue;
  if(displayValue.length > 9) {
      display.innerText = displayValue.substring(0, 9);
  }
}
document.getElementById('clearButton').addEventListener('click', function() {
  displayValue = '0';
  firstOperand = null;
  secondOperand = null;
  firstOperator = null;
  secondOperator = null;
  result = null
	updateDisplay();
});

function clickButton() {
  for(let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', function() {
          if(buttons[i].classList.contains('operand')) {
              inputOperand(buttons[i].value);
              updateDisplay();
          } else if(buttons[i].classList.contains('operator')) {
              inputOperator(buttons[i].value);
          } else if(buttons[i].classList.contains('equals')) {
              inputEquals();
              updateDisplay();
          }
        })
}
}

clickButton();

document.getElementById('oneButton').addEventListener('click', function() {
	console.log('1');
});

window.addEventListener('keydown', function(e){
    const key = document.querySelector(`button[data-key='${e.keyCode}']`);
    key.click();
});
function inputOperand(operand) {
  if(firstOperator === null) {
      if(displayValue === '0' || displayValue === 0) {
          displayValue = operand;
      } else if(displayValue === firstOperand) {
          displayValue = operand;
      } else {
          displayValue += operand;
      }
  } else {
    
      if(displayValue === firstOperand) {
          displayValue = operand;
      } else {
          displayValue += operand;
      }
  }
}

function inputOperator(operator) {
  if(firstOperator != null && secondOperator === null) {
      
      secondOperator = operator;
      secondOperand = displayValue;
      result = operate(Number(firstOperand), Number(secondOperand), firstOperator);
      displayValue = roundAccurately(result, 15).toString();
      firstOperand = displayValue;
      result = null;
  } else if(firstOperator != null && secondOperator != null) {
      
      secondOperand = displayValue;
      result = operate(Number(firstOperand), Number(secondOperand), secondOperator);
      secondOperator = operator;
      displayValue = roundAccurately(result, 15).toString();
      firstOperand = displayValue;
      result = null;
  } else { 
      
      firstOperator = operator;
      firstOperand = displayValue;
  }
}

function inputEquals() {
  if(firstOperator === null) {
      displayValue = displayValue;
  } else if(secondOperator != null) {
      secondOperand = displayValue;
      result = operate(Number(firstOperand), Number(secondOperand), secondOperator);
      if(result === 'Ya basic') {
          displayValue = 'Ya basic';
      } else {
          displayValue = roundAccurately(result, 15).toString();
          firstOperand = displayValue;
          secondOperand = null;
          firstOperator = null;
          secondOperator = null;
          result = null;
      }
  } else {
      secondOperand = displayValue;
      result = operate(Number(firstOperand), Number(secondOperand), firstOperator);
      if(result === 'Ya basic!') {
          displayValue = 'Ya basic!';
      } else {
          displayValue = roundAccurately(result, 15).toString();
          firstOperand = displayValue;
          secondOperand = null;
          firstOperator = null;
          secondOperator = null;
          result = null;
      }
  }
}


//function will take the numbers and call the other functions
function operate(x, y, op) {
  if(op === '+') {
      return x + y;
  } else if(op === '-') {
      return x - y;
  } else if(op === '*') {
      return x * y;
  } else if(op === '/') {
      if(y === 0) {
          return 'Ya basic!';
      } else {
      return x / y;
      }
  }
}

function roundAccurately(num, places) {
  return parseFloat(Math.round(num + 'e' + places) + 'e-' + places);
}

