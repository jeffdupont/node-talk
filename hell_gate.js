// inner gates of hell
foo(5, function(err, resultA) {
    bar(resultA, function(err, resultB) {
        baz(resultB, function(err, resultC) {
            console.log(resultC); // 8
        });
    });
});

function baz(a, callback) {
    return callback(null, a+1);
}

function bar(b, callback) {
    return callback(null, b+1);
}

function foo(c, callback) {
    return callback(null, c+1);
}
