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
		
		case (obj instanceof Function):
			return obj;
		
		case (obj instanceof RegExp):
			return new RegExp(obj.source, (obj.global && 'g') + (obj.ignoreCase && 'i') + (obj.multiline && 'm'));
		
		//Valid for Date objects, see 15.9.5.8.
		case (obj instanceof Date):
		case (obj instanceof Boolean):
		case (obj instanceof String):
		case (obj instanceof Number):
			return new obj.constructor(obj.valueOf());
		
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
		if (obj instanceof Object) {
			return _cloneObject(obj);
		} else {
			return obj;
		}
	}
	
	
	function Class(members, extend) {
		var builder;
		var member;
		var proto;
		
		//Create builder (which wraps the constructor.
		builder = function() {
			if (arguments[0] !== INHERIT) {
				for (member in this) {
					this[member] = clone(this[member]);
				}
				
				this.constructor.apply(this, arguments);
			}
		};
		
		//Extend prototype.
		if (typeof extend === 'function') {
			proto = builder.prototype = new extend(INHERIT);
			
			for (member in proto) {
				if (proto.hasOwnProperty(member)) {
					proto[member] = clone(proto[member]);
				}
			}
			
			for (member in members) {
				if (members.hasOwnProperty(member)) {
					proto[member] = members[member];
				}
			}
		} else {
			builder.prototype = members;
		}
		
		//Return builder.
		return builder;
	}
	
	
	return Class;
})();