import React from "react";
import { useState } from "react";
import "./Calculator.css";

const Calculator = () => {
  // States
  const [displayValue, setDisplayValue] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState(null);
  const [overwrite, setOverwrite] = useState(false);
  const [operator, setOperator] = useState(null);

  // Compute
  const compute = (a, b, op) => {
    const numA = parseFloat(a);
    const numB = parseFloat(b);

    switch (op) {
      case "+":
        return numA + numB;
      case "-":
        return numA - numB;
      case "*":
        return numA * numB;
      case "/":
        return numB === 0 ? Infinity : numA / numB;
      case "%":
        return (numA * numB) / 100;
      default:
        return numB;
    }
  };

  // InputValue
  const handleInputValue = (value) => {
    if (overwrite) {
      setInputValue(value === "." ? "0." : value.toString());
      setDisplayValue(value === "." ? "0." : value.toString());
      setOverwrite(false);
    } else {
      if (value === "." && inputValue.includes(".")) return;

      if (value === "0" && inputValue === "0") return;

      setInputValue((prev) =>
        prev === "0" && value !== "."
          ? value.toString()
          : prev + value.toString()
      );
    }
  };

  // Clear
  const handleClear = () => {
    setInputValue("");
    setDisplayValue("");
    setResult(null);
    setOperator(null);
    setOverwrite(false);
    setPrevInput(""); // Also clear previous input
  };

  // CE
  const handleClearEntry = () => {
    if (inputValue === "" && displayValue !== "") {
      setDisplayValue("");
      setResult(null);
    } else {
      setPrevInput(inputValue);
      setInputValue("");
    }
  };

  // Operator
  const handleOperator = (op) => {
    if (op === "%") return; // Handled separately

    if (inputValue === "" && !overwrite) return;

    if (overwrite && result !== null) {
      setDisplayValue(`${result} ${op}`);
      setInputValue("");
      setOperator(op);
      setOverwrite(false);
      return;
    }

    let newResult;
    if (result === null) {
      newResult = Number(inputValue || "0");
    } else {
      newResult = compute(result, Number(inputValue || "0"), operator);
    }

    setDisplayValue(`${newResult} ${op}`.replace(/\s+/g, " ").trim());
    setResult(newResult);
    setInputValue("");
    setOperator(op);
    setOverwrite(false);
  };

  // Plus Minus
  const handlePlusMinus = () => {
    if (!inputValue) return;
    setInputValue((prev) =>
      prev.startsWith("-") ? prev.slice(1) : "-" + prev
    );
  };

  // Percentage
  const handlePercentage = () => {
    if (inputValue === "") return;

    if (operator === null) {
      const percentValue = Number(inputValue) / 100;
      setInputValue(percentValue.toString());
      setDisplayValue(percentValue.toString());
      return;
    }

    const percentageValue = (Number(inputValue) / 100) * result;
    setInputValue(percentageValue.toString());
  };

  // Equal
  const handleEqual = () => {
    if (operator && inputValue !== "") {
      let computed;
      if (displayValue.includes("%")) {
        computed = (result * Number(inputValue)) / 100;
      } else {
        computed = compute(result, Number(inputValue), operator);
      }

      setResult(computed);
      setDisplayValue(`${result} ${operator} ${inputValue} = ${computed}`);
      setInputValue(computed.toString());
      setOverwrite(true);
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12 col-md-12 p-4 "></div>
          <div className="col-sm-12 col-md-6 p-2 p-md-4 ">
            <div className="container p-4 text-start text-md-center">
              <h1 className="fs-1">Calculator App</h1>
              <h4 className="fs-4 text-muted">React Calculator App</h4>
            </div>
          </div>
          <div className="col-sm-12 col-md-5 p-4">
            <div className="calculator-container container p-4 rounded-2 ">
              <input
                type="text"
                className={`form-control form-control-lg  ${
                  inputValue === "Infinity" ? "text-danger" : ""
                }`}
                value={inputValue || displayValue || "0"}
                disabled
              />
              <div className="container p-3"></div>
              <div className="container p-0 d-flex">
                <div className="container p-2 m-1 bg-light d-flex justify-content-center align-items-center rounded-2 clear-container">
                  <button
                    className="btn btn-lg btn-light m-1  border-1 clear"
                    onClick={handleClear}
                  >
                    C
                  </button>
                </div>
                <div className="container p-2 m-1 bg-light d-flex justify-content-center align-items-center rounded-2">
                  <button
                    className="btn btn-lg btn-light border-secondary border-1 m-1"
                    onClick={handlePercentage}
                  >
                    %
                  </button>
                </div>
                <div className="container p-2 m-1 bg-light d-flex justify-content-center align-items-center rounded-2">
                  <button
                    className="btn btn-lg btn-light border-1 border-secondary m-1"
                    onClick={handlePlusMinus}
                  >
                    +/-
                  </button>
                </div>
                <div className="container p-2 m-1 bg-light d-flex justify-content-center align-items-center rounded-2">
                  <button
                    className="btn btn-lg btn-light border-1 border-secondary m-1"
                    onClick={() => handleOperator("/")}
                  >
                    /
                  </button>
                </div>
              </div>
              <div className="container p-0  d-flex">
                <div className="container p-2 m-1 bg-light d-flex justify-content-center align-items-center rounded-2">
                  <button
                    className="btn btn-lg btn-light border-1 border-secondary m-1"
                    onClick={() => handleInputValue(1)}
                  >
                    1
                  </button>
                </div>
                <div className="container p-2 m-1 bg-light d-flex justify-content-center align-items-center rounded-2">
                  <button
                    className="btn btn-lg btn-light border-1 border-secondary m-1"
                    onClick={() => handleInputValue(2)}
                  >
                    2
                  </button>
                </div>
                <div className="container p-2 m-1 bg-light d-flex justify-content-center align-items-center rounded-2">
                  <button
                    className="btn btn-light border-1 border-secondary m-1"
                    onClick={() => handleInputValue(3)}
                  >
                    3
                  </button>
                </div>
                <div className="container p-2 m-1 bg-light d-flex justify-content-center align-items-center rounded-2">
                  <button
                    className="btn btn-lg btn-light border-1 border-secondary m-1 fs-2"
                    onClick={() => handleOperator("*")}
                  >
                    *
                  </button>
                </div>
              </div>
              <div className="container p-0  d-flex">
                <div className="container p-2 m-1 bg-light d-flex justify-content-center align-items-center rounded-2">
                  <button
                    className="btn btn-lg btn-light border-1 border-secondary m-1"
                    onClick={() => handleInputValue(4)}
                  >
                    4
                  </button>
                </div>
                <div className="container p-2 m-1 bg-light d-flex justify-content-center align-items-center rounded-2">
                  <button
                    className="btn btn-lg btn-light border-1 border-secondary m-1"
                    onClick={() => handleInputValue(5)}
                  >
                    5
                  </button>
                </div>
                <div className="container p-2 m-1 bg-light d-flex justify-content-center align-items-center rounded-2">
                  <button
                    className="btn btn-lg btn-light border-1 border-secondary m-1"
                    onClick={() => handleInputValue(6)}
                  >
                    6
                  </button>
                </div>
                <div className="container p-2 m-1 bg-light d-flex justify-content-center align-items-center rounded-2">
                  <button
                    className="btn btn-lg btn-light border-1 border-secondary m-1 "
                    onClick={() => handleOperator("+")}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="container p-0  d-flex">
                <div className="container p-2 m-1 bg-light d-flex justify-content-center align-items-center rounded-2">
                  <button
                    className="btn btn-lg btn-light border-1 border-secondary m-1"
                    onClick={() => handleInputValue(7)}
                  >
                    7
                  </button>
                </div>
                <div className="container p-2 m-1 bg-light d-flex justify-content-center align-items-center rounded-2">
                  <button
                    className="btn btn-lg btn-light border-1 border-secondary m-1"
                    onClick={() => handleInputValue(8)}
                  >
                    8
                  </button>
                </div>
                <div className="container p-2 m-1 bg-light d-flex justify-content-center align-items-center rounded-2">
                  <button
                    className="btn btn-lg btn-light border-1 border-secondary m-1"
                    onClick={() => handleInputValue(9)}
                  >
                    9
                  </button>
                </div>
                <div className="container p-2 m-1 bg-light d-flex justify-content-center align-items-center rounded-2">
                  <button
                    className="btn btn-lg btn-light border-1 border-secondary m-1"
                    onClick={() => handleOperator("-")}
                  >
                    -
                  </button>
                </div>
              </div>
              <div className="container p-0  d-flex">
                <div className="container p-2 m-1 bg-light d-flex justify-content-center align-items-center rounded-2">
                  <button
                    className="btn btn-lg btn-light border-1 border-secondary m-1"
                    onClick={() => handleInputValue(0)}
                  >
                    0
                  </button>
                </div>
                <div className="container p-2 m-1 bg-light d-flex justify-content-center align-items-center rounded-2">
                  <button
                    className="btn btn-lg btn-light border-1 border-secondary m-1 fw-bold"
                    onClick={() => handleInputValue(".")}
                  >
                    .
                  </button>
                </div>
                <div className="container p-2 m-1 bg-light d-flex justify-content-center align-items-center rounded-2">
                  <button
                    className="btn btn-lg btn-light border-1 border-secondary m-1"
                    onClick={handleClearEntry}
                  >
                    CE
                  </button>
                </div>
                <div className="container p-2 m-1  d-flex justify-content-center align-items-center rounded-2 equal-container  ">
                  <button
                    className="btn btn-lg btn-light border-1  m-1 equal"
                    onClick={handleEqual}
                  >
                    =
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Calculator;
