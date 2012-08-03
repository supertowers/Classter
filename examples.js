var A = new Class({
	constructor: function() {
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


var B = new Class({
	constructor: function() {
		console.log('created instance of B');
	},
	
	
	group: {
		of: {
			nested: {
				objects: 'B'
			}
		}
	}
}, A); //Inherits from A.


var a = new A();
var b = new B();


console.log(a instanceof A); //Should return true;
console.log(b instanceof B); //Should return true;
console.log(b instanceof A); //Should return true;

console.log(a.group.of.nested.objects); //Should return 'A';
console.log(b.group.of.nested.objects); //Should return 'B';