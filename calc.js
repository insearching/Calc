var phrase = "";

function input(id) {
    if(id == /D./g && phrase == ""){
        print("0");
        return;
    }

    if (id == "=") {
        phrase = evaluate(phrase.trim());
        print(phrase);
        return;
    } else if(id == "CE" || id == "C"){
        phrase = "";
        print("0");
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

const operators = {
    '+': (x, y) => x + y,
    '-': (x, y) => x - y,
    '*': (x, y) => x * y,
    '/': (x, y) => x / y,
    '%': (x, y) => x / 100 * y
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



