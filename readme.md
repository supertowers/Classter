# Classter

Classter is a library (still in beta) **developed to hide prototypal inheritance** (and its advantages and inconveniences) to **developers familiarizated with classical concepts of OOP**, like classes, abstract classes, interfaces... The library is designed to be lightweight, with the minimum overload. Additionally, it is a standalone library; and fully compatible with major frameworks, although some of them already implement a similar system.

In addiion, Classter has other advantages, that some developers will find useful because it fits their general 

 * Compatible with Google Closure Compiler at advanced optimizations mode.
 * Made using strict mode.
 * Passes Douglas Crockford JS linter.
 * Heavily tested (well, you caught me, this is still in progress).
 * Easy to use for non-native JS developers.
 * Works in client-side and server-side (NodeJS) with minimal changes.
 
 
**Classter is MIT licensed.** For further details, see license.md file.


## Getting started

For getting started, you only need to include the minified version of the library, although is recommended to use the development version (as it will help you to detect and solve problem, plus inform more precisely about bugs you will find). Once you have it included, you can already start to write your first class:

```js
var Network = new Class({
    _name: 0,
    
    
    construct: function(name) {
        this._name = name;
    },
    
    
    getName: function() {
        return this._name;
    },
    
    
    post: function(msg) {
        //Code here...
    }
});
```

As you can notice, you can define a constructor, by calling it **construct**. The method will be executed when instantiated. Once you have defined, the class, you can make different instances, by using the **new** keyword:

```js
var facebook = new Network('facebook');
var twitter = new Network('twitter');
```

Notice that forgetting the **new** keyword will make the class system to throw a **TypeError**. This adds an extra help for developers, in order to reduce bugs:

```js
try {
    var tuenti = Network('tuenti');
} catch (err) {
    //Error will be caught at this point (instance of TypeError).
}
```

Classter is fully compatible with **instanceof** operator, so you can use at any time to check whether your objects belongs to a particular type or not.

```js
function postInNetwork(network, msg) {
    if (network instanceof Network) {
        network.post(msg);
    } else {
        throw new TypeError('Expected a network instance');
    }
}
```


## Extending classes

Classter supports class extension (at the moment, only simple inheritance is supported, due to JS restrictions). The extension is also compatible with the **instanceof** operator. In order to extend aclass, you only need to pass it as the first argument of the class constructor:

```js
var SocialNetwork = new Class(Network, function() {
    _friends: [],
    
    
    getFriends: function() {
         return this._friends;
    },
    
    
    addFriend: function(friend) {
         this._friends.push(friend);
    }
});
```

With the following, code, you could do:

```js
var tuenti = new SocialNetwork('tuenti');

tuenti instanceof SocialNetwork; //true
tuenti instanceof Network; //true
```

Keep in mind that Classter can only extend (for the moment) classes created by its own class constructor (for example, you cannot extend **Error** by using Class).


## Full documentation

Full documentation is still in progress. For the moment, you can contact me at twitter (**@mjesun**). I will be pretty glad to solve any problem/issues you will find.