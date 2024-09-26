import { useState } from "react"
import "./App.css"

function App() {

  const [number1, setNumber1] = useState('');
  const [number2, setNumber2] = useState('');
  const [operation, setOperation] = useState('');
  const [result, setResult] = useState('');
  const [store, setStore] = useState([]);

  const storeResult = () => {
    if (result !== 0) {
      setStore((prev) => [...prev, result]);
    }
    clearInputs();
    console.log(store);
  } 

  const clearInputs = () => {
    setNumber1('');
    setNumber2('');
    setOperation('');
    setResult('');
  }

  const inputNumber = (num, isNumber2 = false) => {
    if (isNumber2) {
      setNumber2((prev) => prev === '0' ? num : prev + num);
    } else {
      setNumber1((prev) => prev === '0' ? num : prev + num);
    }
  }

  const operatorInput = (operator) => {
    setOperation(operator);
  }

  const calculateResult = () => {
    if (!isNaN(number1) && !isNaN(number2)) {
      let answer = 0;
      switch(operation) {
        case '+':
          answer = number1 + number2;
          break;
        case '-':
          answer = number1 - number2;
          break;
        case '*':
          answer = number1 * number2;
          break;
        case '÷': 
          answer = number1 / number2;
          break;
        default: 
          answer = 0;
      }
        setResult(answer);
      }
    }

    const recallStoredAnswer = (index) => {
      if (store.length === 0) {
        console.log("Emtpry list!");
        return;
      }

      if (index === 1) {
        setNumber1(store[store.length-1]);
      } else if (index === 2) {
        setNumber2(store[store.length-1]);
      } else {
       return 'Store is empty or something is wrong!';
      }
    }



  return (
    <div className="calculator">
      <div className="panel">
        <p>{number1 || '0'}</p>
        <div className="numbers">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
          <button key={num} onClick={() => inputNumber(num, false)}>
            {num}
          </button>
        ))}
        
          <button onClick={clearInputs}>Clear</button>
          <button onClick={() => recallStoredAnswer(1)}>Recall</button> 
        </div>
      </div>

      <div className="panel">
        <p>{operation || '+'}</p>
        <div className="numbers">
          {['+', '-', '*', '÷'].map((operator) => (
            <button key={operator} onClick={() => operatorInput(operator)}> 
              {operator}
            </button>
          ))}
        </div>
      </div>

      <div className="panel">
        <p>{number2 || '0'}</p>
        <div className="numbers">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
          <button key={num} onClick={() => inputNumber(num, true)}>
            {num}
          </button>
        ))}
        
          <button onClick={clearInputs}>Clear</button>
          <button onClick={() => recallStoredAnswer(2)}>Recall</button>
        </div>
      </div>
      <div className="panel answer">
        <p>{result || '0'}</p>
        <div>
          <button onClick={calculateResult}>=</button>
          <button onClick={storeResult}>Store</button>
        </div>
      </div>
    </div>
  )
}

export default App
