// do it together
foo([1])
    .then(result => {
        console.log(result) // [1,2,3]
    });

function foo(x) {
    return bar(x);
}

function bar(x) {
    x.push(2);
    return baz(x);
}

function baz(x) {
    x.push(3)
    return new Promise(resolve => resolve(x));
}
