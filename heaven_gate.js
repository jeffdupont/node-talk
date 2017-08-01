// promise heaven "waterfall"
foo(5)
    .then(bar)
    .then(baz)
    .then(console.log); // 8


function baz(a) {
    return new Promise(resolve => resolve(a+1));
}

function bar(b) {
    return new Promise(resolve => resolve(b+1));
}

function foo(c) {
    return new Promise(resolve => resolve(c+1));
}
