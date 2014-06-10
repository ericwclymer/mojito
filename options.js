//http://stackoverflow.com/questions/13957354/how-to-have-foreach-available-on-pseudo-arrays-returned-by-queryselectorall
['forEach', 'map', 'filter', 'reduce', 'reduceRight', 'every', 'some'].forEach(
    function (p) {
        NodeList.prototype[p] = HTMLCollection.prototype[p] = Array.prototype[p];
    });
var OPTIONS = {};
// Saves options to localStorage.
function save_options() {
    OPTIONS.hideZeroBalance = document.getElementById('cbZero').checked;
    OPTIONS.disableTimeout = document.getElementById('cbTimeout').checked;
	OPTIONS.transactionDateRange = document.getElementById('module-transactiondatefilter').checked;
    var el = document.getElementById('options');
    OPTIONS.layout=[];
    document.querySelectorAll("input[id^='module']").forEach(function (x) {
        if (!!x.value && x.checked==false) {
            OPTIONS.layout.push(x.value);
        }
    });
    chrome.storage.sync.set({ 'options': OPTIONS });
    // Update status to let user know options were saved.
    var status = document.getElementById("status");
    status.innerHTML = "Options Saved.";
    setTimeout(function () { status.innerHTML = "";   }, 750);
}

// Restores select box state to saved value from localStorage.
function restore_options() {
    chrome.storage.sync.get('options', function (obj) {
        if (obj.options == undefined) { obj.options = { layout: [], hideZeroBalance: false, disableTimeout: false }; }
        OPTIONS = obj.options;
        document.getElementById('cbZero').checked = obj.options.hideZeroBalance;
        document.getElementById('cbTimeout').checked = obj.options.disableTimeout;
        obj.options.layout.forEach(function (id) {
            document.getElementById(id).checked = false;
        });
    });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#save').addEventListener('click', save_options);
