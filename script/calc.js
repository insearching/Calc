var phrase = "";
var InputEnum = Object.freeze({ "NUMBER": 1, "OPERATION": 2, "NONE": 3 })
var previousInput = InputEnum.NONE;
let initial = "0"

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

function input(id) {
    console.log("wtf input " + id);
    if (!(id in supportedOperators) && isNaN(id)) {
        alert("Operation is not supported yet :(")
        return;
    }

    if (id == /D./g && phrase == "") {
        print(initial);
        return;
    }

    switch (id) {
        case '=':
            phrase = evaluate(trim(phrase));
            print(phrase);
            return;
        case 'CE': 
        case 'C':
            reset();
            return;
        case 'rm':
            if (phrase == initial) {
                return;
            }
            let trimLength = trim(phrase).toString().length;
            phrase = phrase.toString().substring(0, trimLength - 1);
            if (phrase.length == 0) {
                reset()
                return;
            }
            print(phrase);
            return;
    }

    if (id in operators) {
        if (previousInput == InputEnum.OPERATION || previousInput == InputEnum.NONE) {
            return;
        }
        id = " " + id + " ";
        previousInput = InputEnum.OPERATION
    } else {
        previousInput = InputEnum.NUMBER
    }

    phrase += id;
    print(phrase);
}

function print(output) {
    document.getElementById("input").innerHTML = output;
}

function reset() {
    console.log("reset")
    phrase = "";
    previousInput = InputEnum.NONE;
    print(initial);
}

function trim(value) {
    return value.toString().trim()
}

let evaluate = (expr) => {
    let stack = [];
    let pol = convert(expr);
    console.log(pol);
    pol.split(' ').forEach((token) => {
        if (token in operators) {
            let [y, x] = [stack.pop(), stack.pop()];
            stack.push(operators[token](x, y));
        } else {
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

document.onkeypress = function(e) {
    e = e || window.event;
    var charCode = (typeof e.which == "number") ? e.which : e.keyCode;
    if (charCode) {
        let value = String.fromCharCode(charCode);

        if(e.keyCode == 13){
            value = '='
        }
        
        console.log("wtf " + value);
        input(value);
    }
};

