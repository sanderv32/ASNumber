var hostName;
var restdns;
var cache = new Cache();
var req = new XMLHttpRequest();

String.prototype.getHostname = function() {
	try {
		var re = new RegExp('^(?:f|ht)tp(?:s)?\://([^/:]+)', 'im');
		return this.match(re)[1].toString();
	} catch(err) {
		return null;
	}
}

function getIP(hostname) {
	req.overrideMimeType("application/xml");
	req.open("GET",rest_dns.replace("%s",hostname),false);
	req.send(null);
	if ( req.response ) {
		eval("restdns="+req.response);
	}

	if ( rest_dns.match("restdns.net") )
		return restdns.A[0];
	else if ( rest_dns.match("jsondns.org")) {
		for(var r=0;r<restdns.answer.length;r++) {
			if (restdns.answer[r].type == "A") return restdns.answer[r].rdata;
		}
	}
	return null;
}

function getAS(ip) {
	req.overrideMimeType("text/html");
	req.open("GET","http://eu.asnumber.networx.ch/asnumber/asnum?ip="+ip,false);
	req.send(null);
	return req.response;
}

function extractPrefix(response) {
	var span = document.createElement('span');
	span.innerHTML = response;

	var prefix = span.getElementsByTagName('tbody')[1].getElementsByTagName('td')[2].textContent;
}

function getASN(url) {
	var popup = chrome.extension.getViews({type: 'popup'});
	var stats  = popup[0].document.getElementById("status");
	var result = popup[0].document.getElementById("result");
	var hostName = url.getHostname();
	
	if (cache.hasKey(hostName)) {
		result.innerHTML = cache.Get(hostName).data;
	} else {
		if (hostName != null) {
			var as = getAS(getIP(hostName));
			extractPrefix(as);
			result.innerHTML=as;
			cache.Add(hostName,as);
		} else {
			result.innerHTML = "AS n/a";
		}
	}
	stats.innerText = "";
}

var ttl = localStorage["ttl"];
var rest_dns = localStorage["rest_dns"];
if (!rest_dns) {
	localStorage["rest_dns"] = default_rest_dns;
	rest_dns = default_rest_dns;
}

if (!ttl) {
	localStorage["ttl"] = default_ttl;
	ttl = default_ttl;
}
cache.ttl = ttl;

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) 
{ 
	getASN(request.url);
}); 
