/*
 * Very simple caching class
 */
var Cache = function() {
        this.entry = {};
        this.ttl = ( 8 * 60 * 60 * 1000 );

        this.Add = function(k,o) {
                var newEntry = {
                        data: {},
                        ttl: {}
                };
                newEntry.data = o;
                newEntry.ttl = new Date().getTime()+this.ttl;
                this.entry[k] = newEntry;
        }
        this.Get = function(k) {
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
        this.Remove = function(k) {
                delete this.entry[k];
        }
        this.hasKey = function(k) {
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
        this.length = function() {
                var l=0;
                for(var i in this.entry) {
                        l++;
                }
                return l;
        }
}
/* vim: set ts=8 sw=8 tw=0 ft=javascript noet : */
