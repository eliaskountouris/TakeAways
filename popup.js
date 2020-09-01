//injects grabText content script
window.onload = function(){
    chrome.tabs.query({currentWindow: true, active: true},
        function(tabs){
            chrome.tabs.sendMessage(tabs[0].id, "giveText")
        })
}

//sends message when Summarize pressed
document.addEventListener("DOMContentLoaded", function () {document.querySelector('button').addEventListener('click',onclick,false) 
function onclick(){
    chrome.tabs.query({currentWindow: true, active: true},
    function(tabs){
        chrome.tabs.sendMessage(tabs[0].id, "giveText", getText)
    })
}

//requests text from grabText
function getText (text) {
    var summarizer = new JsSummarize();
    var summary = summarizer.summarize("Summary", String(text));
    addText(summary);

}

//posts text
function addText(texts){
    var ul = document.getElementById("list")

    for (var i =0; i<texts.length;i++){
        var text = texts[i];
        var li = document.createElement('li');
        li.appendChild(document.createTextNode(text));
        ul.appendChild(li);
    }
}

},false)
