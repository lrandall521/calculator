const totalOperations = {
"+": (a, b) => a + b,
"−": (a, b) => a - b,
"*": (a, b) => a * b,
"/": (a, b) => a / b,
"%": (a, b) => a % b,
"^": (a, b) => Math.pow(a, b),
"√": (a, b) => Math.pow(a, 1/b)
};

const operations = ["+", "−", "*", "/", "%", "^", "√"];
const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "Ans","."];

let oString = "";
let answer = 0;
let prevAnswer = false; //clears previous answer
let correct = true; //checks for correct decimals

function addValue(operand) {
    if(prevAnswer) {
        display("#input-screen", "", true);
        prevAnswer = false;
    }

    operations.forEach((e) => {
       if (oString.charAt(oString.length - 2) === e && operations.includes(operand)) 
            oString = oString.substring(0, oString.indexOf(e));
    }); //only allows one operator at a time

    if (oString.length > 18)
        alert("Too many numbers! Please hit Enter or Backspace.");
    else if (operations.includes(operand)) {
        if(oString.length === 0) oString += "Ans";
        oString += ` ${operand} `;}
    else if (numbers.includes(operand)) {
        if (oString.substr(oString.length - 3, 3) === "Ans" || isNumber(oString.substr(oString.length - 1, 1)))
            oString += " * Ans";
        else oString += operand;
    }
    else console.log("Error: non number or operation inputed")

    display("#input-screen", oString, false);
}   

function sendToCalculate(numberString) {
    let calc = numberString.split("");
    
    calc = checkNumberArray(calc);

    if(isNaN(Number(calc[calc.length - 1]))) {
        calc.pop(); //removes last operation if incomplete
        backspace();
    }

    answer = calculate(PEMDASify(PEMDASify(calc, "^", "√"),"*","/","%"));
    prevAnswer = true;

    if (answer > 99999999) {
        display("#output-screen", "Overflow error", true);
        return;
    }

    if (`${answer}`.length > 7) answer = Math.round(answer * Math.pow(10, 7)) / Math.pow(10, 7);
    
    if(correct) {
        if (answer != "") display("#output-screen", `= ${answer}`, false);
        else display("#output-screen", `= 0`, false);
    }
}

function calculate(calc) {
    let calcLength = calc.length + 1;
    resetCalcVariables();
    for(let i = 0; i < calcLength; i++) {
        console.table([i,calc,firstNum,operator,lastNum]);

        if(firstNum.status === "full" && lastNum.status === "full" && checkDecimals()) {
            calc.unshift(totalOperations[operator](Number(firstNum.value), Number(lastNum.value)));
            resetCalcVariables();
            calcLength = calc.length + 1, i = -1;
            if(calc.length == 1) return calc[0];
        }
        else if(!isNumber(calc[0])){
            operator = calc[0];
            calc.shift();
        }
        else if(firstNum.status === "empty") {
            firstNum.value += calc[0];
            if(!isNumber(calc[1]))
                firstNum.status = "full";
            calc.shift();
        }
        else if(lastNum.status === "empty") {
            lastNum.value += calc[0];
            if(!isNumber(calc[1]))
                lastNum.status = "full";
            calc.shift();
        }
        else console.log("Error: nothing runs in calculation");
    }
    if(checkDecimals()) return firstNum.value; //if only one number entered
}

function PEMDASify(calc, o1, o2, o3 = null){
    let cLength = calc.length;
    let PEMDASarray = [];
    for(let i = 0; i < cLength; i++) {
        if ([o1, o2, o3].includes(calc[i])) {
            let j = i - 1;
            while(isNumber(calc[j]))
                j--;
            let k = ++j;
            while(isNumber(calc[j]) || calc[j] === calc[i]) {
                PEMDASarray.push(calc[j]);
                j++;
            }
            calc.splice(k, PEMDASarray.length, calculate(PEMDASarray));
        }
    }
    return calc;
}

function checkDecimals() {
    if (firstNum.value.split(".").length - 1 > 1 ||
        lastNum.value.split(".").length - 1 > 1 ||
        isNaN(firstNum.value) || isNaN(lastNum.value)) {
        alert("Incorrect decimals! Please backspace or click clear.");
        correct = false;
        return false;
    }
    else {
        correct = true;
        return true;
    }
}

const firstNum = {
    name: "first",
    value: "",
    status: "empty"};
const lastNum = {
    name: "last",
    value: "",
    status: "empty"};
let operator = "";

function resetCalcVariables() {
    firstNum.value = "";
    firstNum.status = "empty";
    
    lastNum.value = "";
    lastNum.status = "empty";

    operator = "";
}

function checkNumberArray(calc) {
    for (i = calc.length - 1; i >= 0; i--) {
        if([" ", "n", "s"].indexOf(calc[i]) !== -1)
            calc.splice(calc.indexOf(calc[i]), 1);
        if(calc[i] === "A") calc[i] = answer;
    }
    return calc;
}

function isNumber(num) {
    if(isNaN(Number(num)) && !(numbers.includes(num)))
        return false;
    else return true;
}

function display(element, string, clear) {
    if(clear) oString = "";
    document.querySelector(element).textContent = string;
}

function backspace() {
    if(oString.length < 2) display("#input-screen", "", true);
    if(prevAnswer) prevAnswer = false;
    if(numbers.includes(oString.substring(oString.length - 1, oString.length)))
        oString = oString.substring(0, oString.length - 1);
    else oString = oString.substring(0, oString.length - 3);
    display("#input-screen", oString, false);
}

document.addEventListener("keypress", e => { //keyboard support
    ["+", "*", "/", "%", "^", "1", "2", "3",
    "4", "5", "6", "7", "8", "9", "0", "(",")"].forEach(op => {
        if (e.key == op) addValue(op);
    })
    if (e.key == "c") display("#input-screen", "", true);
    if (e.key == "a") addValue("Ans");
    if (e.key == "Enter") sendToCalculate(oString);
    if (e.key == "b") backspace();
    if (e.key == "-") addValue("−");
});
