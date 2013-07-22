/*
 * Very simple cachine class
 */
function Cache() {
	this.entry = {};
	this.ttl = ( 8 * 60 * 60 * 1000 );
}
Cache.prototype.Add = function(k,o) {
	var newEntry = {
		data: {},
		ttl: {}
	};
	newEntry.data = o;
	newEntry.ttl = new Date().getTime()+this.ttl;
	this.entry[k] = newEntry;
}
Cache.prototype.Get = function(k) {
	var d = new Date();
	if (this.entry[k]) {
		if (this.entry[k].ttl < d.getTime()) {
			/* Entry expired, delete it */
			delete this.entry[k];
			return null;
		} else {
			/* Entry not expired, but queried within ttl time
			 * update ttl time again
			 */
			this.entry[k].ttl = d.getTime()+this.ttl;
		}
	}
	return this.entry[k];
}
Cache.prototype.Remove = function(k) {
	delete this.entry[k];
}
Cache.prototype.hasKey = function(k) {
	var d = new Date();
	var result = false;

	if (this.entry[k]) {
		result = true;
	} else {
		result=false;
	}

	if (result==true && this.entry[k].ttl < d.getTime()) {
		delete this.entry[k];
		result=false;
	}

	return result;
}
Cache.prototype.length = function() {
	var l=0;
	for(var i in this.entry) {
		l++;
	}
	return l;
}
