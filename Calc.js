let input = [];
// 数字を画面に表示・配列に追加
function addNumber(num) {
  input.push(num);
  updateDisplay();
}

// 演算子を画面に表示・配列に追加
function addOperator(op) {
  // 演算子が連続していればスキップ
  let last = input[input.length - 1];
  if (["+", "-", "÷", "×"].includes(last)) {
  } else {
    input.push(op);
  }
  updateDisplay();
}

function calcResult() {
  try {
    // 配列を文字列に変換、除算・乗算の記号を変換
    let formula = input.join("").replace(/×/g, "*").replace(/÷/g, "/");

    // 数字と演算子に分けて配列にする
    let tokens = formula.match(/(\d+(\d+)?|\+|\-|\*|\/)/g);

    let stack = [];
    let i = 0;

    // 除算・乗算を計算
    while (i < tokens.length) {
      if (tokens[i] === "*" || tokens[i] === "/") {
        let num1 = parseFloat(stack.pop());
        let num2 = parseFloat(tokens[i + 1]);

        let result;
        if (tokens[i] === "*") {
          result = num1 * num2;
        } else {
          result = num1 / num2;
        }
        stack.push(result);
        i += 2;
      } else {
        stack.push(tokens[i]);
        i++;
      }
    }

    // 足し算・引き算を計算
    let result = parseFloat(stack[0]);
    for (let j = 1; j < stack.length; j += 2) {
      let op = stack[j];
      let num = parseFloat(stack[j + 1]);

      if (op === "+") {
        result += num; 
      } else if (op === "-") {
        result -= num; 
      }
    }

    document.getElementById("display").value = result;
    input = [result.toString()];
  } catch (error) {
    document.getElementById("display").value = "Error";
    input = [];
  }
}

// 画面を初期化
function clearDisplay() {
  input = [];
  updateDisplay();
}

// 画面表示を更新
function updateDisplay() {
  document.getElementById("display").value = input.join("");
}
