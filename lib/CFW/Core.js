Function.prototype.bind = function(bind) {
	var self = this;
	return function(){
		var args = Array.prototype.slice.call(arguments);
		return self.apply(bind || null, args);
	};
};

//canvas framework
window.CFW = {
	scene: null,
	CONFIG: {
		DEBUG: true,
	},
	resources: [],
	$: function(selector) {
		return selector.charAt(0) == '#' ? document.getElementById(selector.substr(1)) : document.getElementsByTagName(selector);
	},
	$new: function(name) {
		return document.createElement(name);
	},
	isObject: function(obj) {
		return obj != null && typeof(obj) == 'object';
	},
	isPlainObject: function(obj) {
		return Object.prototype.toString(obj) == '[object Object]';
	},
	//判断是否是function
	isFunction: function(source) {
		// chrome下,'function' == typeof /a/ 为true.
		return '[object Function]' == Object.prototype.toString.call(source);
	},
};
//判断是否支持 requestAnimationFrame
if (window.requestAnimationFrame) {
	let id = 1,
		anims = {};
	CFW.setAnimation = function(callback, ele) {
		let current = id++;
		anims[current] = true;
		let animate = function() {
			if (!anims[current]) {
				throw ('看看有没有~');
				return;
			}
			window.requestAnimationFrame(animate, ele);
			callback();
		};
		window.requestAnimationFrame(animate, ele);
		return current;
	};
	CFW.clearAnimation = function(id) {
		delete anims[id];
	};
} else {
	//估计就该死的ie了
	CFW.setAnimation = function(callback, element) {
		return window.setInterval(callback, 1000 / 60);
	};
	CFW.clearAnimation = function(id) {
		window.clearInterval(id);
	};
};

export default CFW;