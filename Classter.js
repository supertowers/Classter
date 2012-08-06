'use strict';


var Class = (function() {
	var INHERIT = {};
	
	
	function _cloneObject(obj) {
		switch (true) {
		case (obj instanceof Array):
			var cloned = [];
			var length = obj.length;
			
			for (var i = 0; i < length; i++) {
				cloned[i] = clone(obj[i]);
			}
			
			return cloned;
		
		case (obj instanceof RegExp):
			var flags = (obj.global? 'g' : '') + (obj.ignoreCase? 'i' : '') + (obj.multiline? 'm' : '');
			
			return new RegExp(obj.source, flags);
		
		//Valid for Date objects, see 15.9.5.8.
		case (obj instanceof Date):
		case (obj instanceof Boolean):
		case (obj instanceof String):
		case (obj instanceof Number):
			return new obj.constructor(obj.valueOf());
		
		case (obj instanceof Class):
			if (typeof obj.clone === 'function') {
				return obj.clone();
			} else {
				throw new ReferenceError('Classes needs to implement a "clone" method for being cloned');
			}
		
		case (obj instanceof Object):
			var cloned = {};
			
			for (var member in obj) {
				if (obj.hasOwnProperty(member)) {
					cloned[member] = clone(obj[member]);
				}
			}
			
			return cloned;
		}
	}
	
	
	function clone(obj) {
		if ((obj instanceof Object) && (typeof obj !== 'function')) {
			return _cloneObject(obj);
		} else {
			return obj;
		}
	}
	
	
	function Class() {
		var members = null;
		var extend = null;
		var builder;
		var member;
		var proto;
		
		//Check arguments.
		switch (arguments.length) {
		case 1:
			members = arguments[0];
			break;
			
		case 2:
			members = arguments[1];
			extend = arguments[0];
			break;
		}
		
		if (members) {
			if (!(members instanceof Object)) {
				throw new TypeError('Invalid members object passed');
			}
			
			//Create builder (which wraps the constructor).
			builder = function(inheriting) {
				var member;
				
				if (inheriting !== INHERIT) {
					if (!(this instanceof builder)) {
						throw new TypeError('Invalid context detected. Forgot the "new" keyword?');
					}
					
					for (member in this) {
						if (typeof this !== 'function') {
							this[member] = clone(this[member]);
						}
					}
					
					if (this.construct instanceof Function) {
						this.construct.apply(this, arguments);
					}
				}
			};
			
			//Create the adequate prototype, depending on whether there is a base class or not.
			if (extend instanceof Function) {
				proto = new extend(INHERIT);
			} else {
				proto = new Class();
			}
			
			//Set prototype.
			builder.prototype = proto;
			
			//Extend prototype.
			for (member in proto) {
				if (proto.hasOwnProperty(member) && (typeof member !== 'function')) {
					proto[member] = clone(proto[member]);
				}
			}
			
			for (member in members) {
				if (members.hasOwnProperty(member)) {
					proto[member] = members[member];
				}
			}
			
			//Return builder.
			return builder;
		}
	}
	
	
	return Class;
})();