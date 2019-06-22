var phrase = "";

function input(id) {
    if(!(id in supportedOperators) && isNaN(id)){
        alert("Operation is not supported yet :(")
        return;
    }
    if (id == /D./g && phrase == "") {
        print("0");
        return;
    }

    if (id == "=") {
        phrase = evaluate(phrase.trim());
        print(phrase);
        return;
    } 
    if (id == "CE" || id == "C") {
        reset()
        return;
    } 
    if (id == "rm"){
        phrase = phrase.substring(0, phrase.length - 1);
        if(phrase.length == 0){
            reset()
            return;
        }
        print(phrase);
        return;
    }

    if (id in operators) {
        id = " " + id + " ";
    }

    phrase += id;
    print(phrase);
}

function print(output){
    document.getElementById("input").innerHTML = output;
}

function reset(){
    phrase = "";
    print("0");
}

const operators = {
    '+': (x, y) => x + y,
    '-': (x, y) => x - y,
    '*': (x, y) => x * y,
    '/': (x, y) => x / y,
    '%': (x, y) => x / 100 * y
};

const supportedOperators = {
    '+': "plus",
    '-': "minus",
    '*': "multipy",
    '/': "divide",
    '=': "equal",
    '%': "percent",
    'C': "clear",
    'CE': "clear-all",
    '.': "dot",
    'rm': "remove"
};

let evaluate = (expr) => {
    let stack = [];
    let pol = convert(expr);
    console.log(pol);
    pol.split(' ').forEach((token) => {
        if (token in operators) {
            console.log(token);
            let [y, x] = [stack.pop(), stack.pop()];
            console.log(x, y);
            stack.push(operators[token](x, y));
        } else {
            console.log("adding " + token);
            stack.push(parseFloat(token));
        }
    });

    return stack.pop();
};


let convert = (expr) => {
    let numbers = [];
    let operations = [];
    expr.split(" ").forEach((token) => {
        if (token in operators) {
            operations.push(token);
        } else {
            numbers.push(parseFloat(token));
        }
    });
    return numbers.join(" ").concat(" " + operations.join(" "))
};



