document.addEventListener('DOMContentLoaded', function() {
        var manifest = chrome.runtime.getManifest();
        var version = document.getElementById("version");
        version.innerHTML = "Version: "+manifest.version;
        chrome.runtime.sendMessage({ command: "selected-tab" });
});
