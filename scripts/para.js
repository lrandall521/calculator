/* Could not get parenthesis to work

calc = checkForParentheses(calc);

if(calc === "incorrect") {
    alert("Incorrect parantheses! Please hit Clear or Backspace.");
    return;
}

function checkForParentheses(calc) {
    for (i = 0; i < calc.length; i++) {
        if(calc[i] === "(") {
            for (j = 0; j < calc.length; j++) {
                if(calc[j] === ")") {
                    calc[i] = "checked(";
                    calc[j] = "checked)";
                    break;
    }   }   }   }

    if(calc.indexOf("(") > -1 || calc.indexOf(")") > -1)
        return "incorrect";
    
    for (i = calc.length - 1; i >= 0; i--) {
        console.table(calc, i)
        if(calc[i] === "(" && calc[i - 1] === "checked)") {
            calc.splice(i + 1, 0, "*");
            i++;
        }
        if(calc[i] === "checked(")
            calc[i] = "(";
        if(calc[i] === "checked)")
            calc[i] = ")";
    }
    return calc;
}

*/
