'use strict';


(function(global) {
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
	
	
	
	
	
	function _classArgs(args) {
		var members = null;
		var base = null;
		var interfaces = null;
		var length;
		var i;
		
		//Get arguments, depending on length and types.
		if (args.length === 0) {
			//Do nothing, we are calling it for inheritance.
			
		} else if (args.length === 1) {
			members = args[0];
		
		} else if ((args.length === 2) && (args[0] instanceof Function)) {
			base = args[0];
			members = args[1];
		
		} else if ((args.length === 2) && (args[0] instanceof Array)) {
			interfaces = args[0];
			members = args[1];
		
		} else if ((args.length === 3) && (args[0] instanceof Function) && (args[1] instanceof Array)) {
			base = args[0];
			interfaces = args[1];
			members = args[2];
		
		} else {
			throw new TypeError('Invalid parameters passed');
		}
		
		//Check list of interfaces.
		if (interfaces) {
			for (length = interfaces.length; i--; ) {
				if (!(interfaces[i] instanceof Interface)) {
					throw new TypeError('Invalid interface found at position ' + i);
				}
			}
		}
		
		//Return object.
		return {
			members: members,
			base: base,
			interfaces: interfaces
		};
	}
	
	
	function _fillClass(builder, extend, members) {
		var proto;
		var member;
		
		//Get the right prototype object.
		if (extend instanceof Function) {
			proto = new extend(INHERIT);
		} else {
			proto = new Class();
		}
		
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
		
		//Set prototype.
		builder.prototype = proto;
	}
	
	
	function _isImplemented(builder, interfaces) {
		var proto = builder.prototype;
		var iface;
		var method;
		var i;
		
		//Now, check interfaces, if they exist.
		for (i = interfaces.length; i--; ) {
			iface = interfaces[i];
			
			for (method in iface) {
				if (iface.hasOwnProperty(method)) {
					if (!(proto[method] instanceof Function)) {
						throw new ReferenceError('Method ' + method + ' needed for implementing an interface does not exist');
					} else if (proto[method].length !== iface[method].length) {
						throw new ReferenceError('Method ' + method + ' does not match the interface');
					}
				}
			}
		}
	}
	
	
	function Class() {
		var args = _classArgs(arguments);
		var members = args.members;
		var base = args.base;
		var interfaces = args.interfaces;
		var builder;
		
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
						if (typeof this[member] !== 'function') {
							this[member] = clone(this[member]);
						}
					}
					
					if (this.construct instanceof Function) {
						this.construct.apply(this, arguments);
					}
				}
			};
			
			//Fulfill the class.
			_fillClass(builder, base, members);
			
			//Check adequate interface implementation.
			if (interfaces) {
				_isImplemented(builder, interfaces);
				builder.$interfaces = interfaces;
			}
			
			//Return builder.
			return builder;
		}
	}
	
	
	
	
	
	function Interface(methods) {
		var method;
		
		for (method in methods) {
			if (methods.hasOwnProperty(method)) {
				if (!(methods[method] instanceof Function)) {
					throw new TypeError('Interfaces can only contain public methods');
				}
				
				this[method] = methods[method];
			}
		}
	}
	
	
	
	
	
	global.Class = Class;
	global.Interface = Interface;
})(this);