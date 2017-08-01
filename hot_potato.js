// pass the hot potato
foo([1], function(err, result) {
    console.log(result); // [1,2,3]
});

function foo(x, callback) {
    x.push(2);
    bar(x, function(err, result) {
        baz(result, callback);
    });
}

function bar(x, callback) {
    x.push(3);
    callback(null, x);
}

function baz(y, callback) {
    callback(null, y);
}
