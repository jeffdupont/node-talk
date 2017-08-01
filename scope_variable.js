// scope for passing token
(function level1(a, token) {
    foo(a, token, function(err, result) {
        console.log(result); // [1,2,3]
    });
})([1], "secret-token");

function foo(x, token, callback) {
    x.push(2);
    bar(x, function(err, result) {
        baz(result, token, callback);
    });
}

function bar(x, callback) {
    x.push(3);
    callback(null, x);
}

function baz(y, token, callback) {
    // this function needs a token to make an api call
    console.log(token);
    callback(null, y);
}






























// // promise cleanup
// (function level1(a, token) {
//     foo(a)
//         .then(bar)
//         .then(result => {
//             return baz(result, token);
//         })
//         .then(console.log); // [1,2,3]
// })([1], "secret-token");
//
// function foo(x) {
//     x.push(2);
//     return new Promise(resolve => resolve(x));
// }
//
// function bar(x) {
//     x.push(3);
//     return new Promise(resolve => resolve(x));
// }
//
// function baz(y, token) {
//     // this function needs a token to make an api call
//     console.log(token); // "secret-token"
//     return new Promise(resolve => resolve(y));
// }
