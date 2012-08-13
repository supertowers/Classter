'use strict';


var protoTest = function() {};
protoTest.prototype.a = true;


var pI = new protoTest();


var A = new Class({
	construct: function() {
		console.log('created instance of A');
	},
	
	
	group: {
		of: {
			nested: {
				objects: 'A'
			}
		}
	},
	
	
	pI: new protoTest()
});


var B = new Class(A, {
	construct: function() {
		console.log('created instance of B');
	},
	
	
	group: {
		of: {
			nested: {
				objects: 'B'
			}
		}
	},
	
	
	objString: new String('Hello')
}); //Inherits from A.


var probe = {aa: true};

var probeGen = function(){}
probeGen.prototype = probe;

var probeWrapper = Class({
    probe: new probeGen()
});

var aa = new probeWrapper();
var bb = new probeGen();

console.log( probe.isPrototypeOf(bb)); //Should return true;
console.log( probe.isPrototypeOf(aa.probe));  //Should return true;


var a = new A();
var b = new B();
var v = new B();


console.log(a instanceof A); //Should return true;
console.log(b instanceof B); //Should return true;
console.log(b instanceof A); //Should return true;

console.log(a.group.of.nested.objects); //Should return 'A';
console.log(b.group.of.nested.objects); //Should return 'B';

console.log(pI instanceof protoTest); //Should return true;
console.log(a.pI instanceof protoTest); //Should return true;

console.log(pI instanceof protoTest); //Should return true;
console.log(a.pI instanceof protoTest); //Should return true;



console.log(b.objString === v.objString); //Should return false.

//Should print 'Ok'.
try {
	var x = A();
} catch (err) {
	(err instanceof TypeError) && console.log('Ok');
}