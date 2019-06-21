var phrase = "";

function input(id){
    if(id == "=") {
        document.getElementById("input").innerHTML = evaluate(phrase.trim());
        phrase = "";
        return;
    } else if(id == "CE"){
        phrase = "";
        document.getElementById("input").innerHTML = "0";
        return;
    }

    phrase += id + " ";
    document.getElementById("input").innerHTML = phrase;
}

const operators = {
    '+': (x, y) => x + y,
    '-': (x, y) => x - y,
    '*': (x, y) => x * y,
    '/': (x, y) => x / y
};

let convert = (expr) => {
    let numbers = [];
    let operations = [];
    expr.split(' ').forEach((token) => {
        if (token in operators) {
            console.log("operator add " + token);
            operations.push(token);
        } else {
            numbers.push(parseFloat(token));
        }
    });
    return numbers.join(" ").concat(" " + operations.join(" "))
}

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



