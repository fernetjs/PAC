
/*
  Image Resources for the Engine.
*/

Pac.Repository = (function(){
	var resources = {},
			loaded = 0,
			total = (function (a) { var r = 0; for (var i in a) r++; return r; })(resources);
	
	var events = {
		complete: function(){},
		report: function(){}
	};

	var imageLoaded = function() {
		var prg = (++loaded * 100) / total;
		events.report(prg);
		if (prg >= 100) events.complete();
	};

	return {
		on: function(eventName, callback){
			if (events[eventName])
			events[eventName] = callback;
			return this;
		},
		
		loadOne: function(name, callback){
			var cb = (callback || function(){});
			
			if (!name) throw "Parameter 'name' not specify";
			
			if (resources[name]){
				this[name] = new Image();
				this[name].onload = cb;
				this[name].src = resources[name];
				if (this[name].complete) cb();
			} else throw "Resource " + name + " not found!. Use addReource() before load.";
			return this;
		},
		
		load: function(){
			loaded = 0;
			for (var img in resources) {
				this[img] = new Image();
				this[img].onload = imageLoaded;
				this[img].src = resources[img];
				if (this[img].complete) imageLoaded();
			}
			return this;
		},
		
		addResources: function(newResources){
			for(var r in newResources){
				if (resources.hasOwnProperty(r)) throw 'The resource ' + r + ' already exists.';
				resources[r] = newResources[r];
			}
			return this;
		},
		
		clear: function(){
			var i = resources.length;
			do {
				if (this[resources[i]]){
					this[resources[i]] = null;
					delete this[resources[i]];
				}
			} while (i--);
			resources = {};
		}
		
	};
	
})();

