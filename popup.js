window.onload = function(){
    chrome.tabs.query({currentWindow: true, active: true},
        function(tabs){
            chrome.tabs.sendMessage(tabs[0].id, "giveText")
        })
}


document.addEventListener("DOMContentLoaded", function () {document.querySelector('button').addEventListener('click',onclick,false) 
function onclick(){
    chrome.tabs.query({currentWindow: true, active: true},
    function(tabs){
        chrome.tabs.sendMessage(tabs[0].id, "giveText", getText)
    })
}

function getText (text) {
    var summarizer = new JsSummarize();
    var summary = summarizer.summarize("Summary", String(text));
    addText(summary);
    /*
    Code for posting summary on website
    
    chrome.tabs.query(
    {currentWindow: true, active: true},
    function(tabs){
        chrome.tabs.sendMessage(tabs[0].id, summary)
    }); 
    */
}

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
