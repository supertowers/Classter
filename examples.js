'use strict';


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
	}
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


var a = new A();
var b = new B();
var v = new B();

console.log(a instanceof A); //Should return true;
console.log(b instanceof B); //Should return true;
console.log(b instanceof A); //Should return true;

console.log(a.group.of.nested.objects); //Should return 'A';
console.log(b.group.of.nested.objects); //Should return 'B';

console.log(b.objString === v.objString); //Should return false.

//Should print 'Ok'.
try {
	var x = A();
} catch (err) {
	(err instanceof TypeError) && console.log('Ok');
}