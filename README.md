# Code Structure & Best Practices
## Node
- package.json
- package-lock.json
- nested vs global packages
- devDependencies
- building production code
 - `npm install --production` OR `NODE_ENV=production`

## Building modules
- exports === module.exports
- private and public
 - private methods and variables should always start with _ (underscore)

```javascript
var _x = 5 // private default value
var Circle = exports = module.exports = function() {
    // setup the object constructor
    this.radius = _x // set initial default radius
}
exports.PI = 3.14 // module constant

Circle.prototype = {
    setRadius: function(radius) {
        return this.radius = radius
    },
    getRadius: function() {    
        return this.radius
    },
    getDiameter: function() {
        return 2 * exports.PI * this.radius
    }
}

// usage
var circle = new Circle();
console.log(circle.getRadius()) // 5
console.log(circle.getDiameter()) // 31.40
console.log(circle.setRadius(10))
console.log(circle.getDiameter()) // 62.80
console.log(circle.getRadius()) // 10
```

[Additional Code Examples](https://github.com/FredKSchott/the-node-way)

# Promises & Async Development
The Promise object represents the eventual completion (or failure) of an asynchronous operation, and its resulting value. [Mozilla Foundation]

## `async` keyword vs Async.js the module
`async` is part of the core Node.js 8 and works with the `await` keyword to return a Promise result
```javascript
// Standard Promise usage
function handler (req, res) {  
  return request('https://user-handler-service')
    .catch((err) => {
      logger.error('Http error', err)
      error.logged = true
      throw err
    })
    .then((response) => Mongo.findOne({ user: response.body.user }))
    .catch((err) => {
      !error.logged && logger.error('Mongo error', err)
      error.logged = true
      throw err
    })
    .then((document) => executeLogic(req, res, document))
    .catch((err) => {
      !error.logged && console.error(err)
      res.status(500).send()
    })
}
```
```javascript
// async/await Promise usage
async function handler (req, res) {  
  let response
  try {
    response = await request('https://user-handler-service')  
  } catch (err) {
    logger.error('Http error', err)
    return res.status(500).send()
  }

  let document
  try {
    document = await Mongo.findOne({ user: response.body.user })
  } catch (err) {
    logger.error('Mongo error', err)
    return res.status(500).send()
  }

  executeLogic(document, req, res)
}
```
Async.js is a utility module which provides straight-forward, powerful functions for working with asynchronous JavaScript [async.js]
```javascript
async.map(['file1','file2','file3'], fs.stat, function(err, results) {
    // results is now an array of stats for each file
})

async.filter(['file1','file2','file3'], function(filePath, callback) {
  fs.access(filePath, function(err) {
    callback(null, !err)
  })
}, function(err, results) {
    // results now equals an array of the existing files
})

async.parallel([
    function(callback) { ... },
    function(callback) { ... }
], function(err, results) {
    // optional callback
})

async.series([
    function(callback) { ... },
    function(callback) { ... }
])
```

## Escaping callback hell
- Provides cleaner more readable code.

### Waterfall
    hell_gate.js -> heaven_gate.js
### Parallel
    hot_potato.js -> loaded_potato.js
### Handle Scope
    scope_variable.js

## Error Handling
- Promise
```javascript
doSomethingAsync()
    .then((one) => {
        // ... do something with results
        return doAsyncTwo()
    })
    .then((two) => {
        // ... do something with results
        return processed_result
    })
    .catch((err) => {
        // Handle error from either async process
        // `err` will pertain to the function call that failed
        // all further processing before this catch will stop
    })
    .then(() => {
        // ... do something after the error catch
    })
    .catch((err) => {
        // caught something again...
    })
```
- Async.js
```javascript
async.waterfall([
    function(next) {
        next(null, arg1, arg2, ... argN)
    },
    function(arg1, arg2, ... argN, next) {
        next(null, blarg1, blarg2)
    },
    function(blarg1, blarg2, next) {
        next(null, narg1)
    }
], function(err, result) {
    // result == blarg1 + blarg2

    // `err` will pertain to the function call that failed
    // all further processing will stop and return to this callback
})
```

## Promise Guidelines
- **Whenever you create a promise in a then, return it** - any promise you don't return will not be waited for outside. -[SO]
- **Whenever you create multiple promises, .all them** - that way it waits for all the promises and no errors from any of them are silenced. -[SO]
- **Whenever you nest thens, you can typically return in the middle** - then chains are usually at most 1 level deep. -[SO]
- **Whenever you perform IO, it should be with a promise** - either it should be in a promise or it should use a promise to signal its completion. -[SO]
- **Mapping is better done with .map than with for/push** - if you're mapping values with a function, map lets you concisely express the notion of applying actions one by one and aggregating the result. -[SO]
- **Concurrency is better than sequential execution if it's free** - it's better to execute things concurrently and wait for them Promise.all then to execute things one after the other - each waiting before the next. -[SO]

[SO]:https://stackoverflow.com/a/31414472
[Mozilla Foundation]:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
[async.js]:http://caolan.github.io/async/


## Additional Resources
- [Best Practices for Node.js Development
](https://devcenter.heroku.com/articles/node-best-practices)
- [A Gentle Introduction to Composition in JavaScript](http://blog.ricardofilipe.com/post/javascript-composition-for-dummies)
- [The Node Way](http://thenodeway.io/introduction/)
- [Callback Hell](http://callbackhell.com/)
- [JavaScript Standard Style](https://standardjs.com/)
- [Just About Everything by TJ Holowaychuk](https://github.com/tj)


## Slides
[http://slides.com/jeffdupont/node-js](http://slides.com/jeffdupont/node-js)
