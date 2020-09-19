const totalOperations = {
"+": (a, b) => a + b,
"−": (a, b) => a - b,
"*": (a, b) => a * b,
"/": (a, b) => a / b,
"%": (a, b) => a % b,
"^": (a, b) => Math.pow(a, b)
};

const operations = ["+", "−", "*", "/", "%", "^"];
const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "Ans"];

let oString = "";
let answer = 0;

function addValue(operand) {
    operations.forEach((e) => {
       if (oString.charAt(oString.length - 2) === e && operations.includes(operand)) 
            oString = oString.substring(0, oString.indexOf(e));
    }); //only allows one operator at a time

    if (oString.length > 40)
        alert("Too many numbers! Please hit Enter or Backspace."); //optomize this
    else if (operations.includes(operand)) {
        if(oString.length === 0) oString += "Ans";
        oString += ` ${operand} `;}
    else if (numbers.includes(operand)) 
        oString += operand;
    else console.log("Error: non number or operation inputed")
    
    display("#input-screen", oString, false);
}   

function calculate() {
    let calc = oString.split("");
    for (i = calc.length - 1; i >= 0; i--) { //removes spaces and adds previous answer if needed
        if([" ", "n", "s"].indexOf(calc[i]) !== -1)
            calc.splice(calc.indexOf(calc[i]), 1);
        if(calc[i] === "A") calc[i] = answer;
    }
    if(isNaN(Number(calc.length))) calc.pop(); //removes last operation if incomplete

    answer = finalCalc(PEMDAS(calc));

    display("#output-screen", `= ${answer}`, true);
}

function finalCalc(calc) {
    let calcLength = calc.length + 1;
    for(let i = 0; i < calcLength; i++) {
        if(firstNum.status === "full" && lastNum.status === "full") {
            calc.unshift(totalOperations[operator](Number(firstNum.value), Number(lastNum.value))); //update to work with PEMDAS
            resetCalcVariables();
        }
        else if(isNaN(Number(calc[0]))){
            operator = calc[0];
            calc.shift();
        }
        else if(firstNum.status === "empty") {
            firstNum.value += calc[0];
            if(isNaN(Number(calc[1])))
                firstNum.status = "full";
            calc.shift();
        }
        else if(lastNum.status === "empty") {
            lastNum.value += calc[0];
            if(isNaN(Number(calc[1])))
                lastNum.status = "full";
            calc.shift();
        }
        else console.log("Error: nothing runs in calculation");
    }

    return calc[0];
}

function PEMDAS(calc){
    return calc;
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

function display(element, string, clear) {
    if(clear) oString = "";
    document.querySelector(element).textContent = string;
}

function backspace() {
    if(oString.length < 2) display("#input-screen", "", true);
    if(numbers.includes(oString.substring(oString.length - 1, oString.length)))
        oString = oString.substring(0, oString.length - 1);
    else oString = oString.substring(0, oString.length - 3);
    display("input-screen", oString, false);
}

/*
Things to add/fix:
 - backspace()
 - PEMDAS()
 - decimal points
 - after hitting enter, backspace should clear
 - make CSS pretty
*/
