function restore_options() {
	var ttl = localStorage["ttl"];
	var rest_dns = localStorage["rest_dns"];
	if (!ttl) ttl = default_ttl;
	if (!rest_dns) rest_dns = default_rest_dns;
	document.getElementById("ttl").value = ttl/1000;
	document.getElementById("restDNS").value = rest_dns;

	HumanReadable();
}

function save_options() {
	var status = document.getElementById("status");
	localStorage["ttl"] = document.getElementById("ttl").value*1000;
	localStorage["rest_dns"] = document.getElementById("restDNS").value;
	status.innerHTML = "Options saved...";
	setTimeout(function() {
			status.innerHTML = "";
			}, 750);
}

function HumanReadable() {
	var ttl = document.getElementById("ttl").value;
	var hr = document.getElementById("hr");
	var tmptxt = "";

	var seconds = ttl%60;
	var minutes = Math.round(ttl/60%60);
	var hours   = Math.round(ttl/3600%24);
	var days    = Math.floor(ttl/86400);

	tmptxt=days+" day";
	if ( days > 1 )
		tmptxt=tmptxt+"s, ";
	else 
		tmptxt=tmptxt+", ";

	tmptxt=tmptxt+hours+" hours, "+minutes+" minutes, "+seconds+" seconds";

	hr.innerHTML=tmptxt;

}


document.addEventListener('DOMContentLoaded', function() {
	restore_options();

	document.getElementById('ttl').addEventListener('change', function() {
		HumanReadable();
	}, false);

	document.getElementById('saveButton').addEventListener('click', function() {
		save_options();
	});
});
