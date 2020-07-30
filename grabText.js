function summary() {
    var texts = document.getElementsByTagName("p");
    var text = "";
    for (var i = 0; i < texts.length; i++){
        if (texts[i].className!="ay de df ba bd dm dd" && texts[i].className!="ar ck cl at aw cm oh") {
            text= text + ' ' + texts[i].innerText;
        }
    }
    return text;
}

//Posts code on webpage
function postText(text){

    var div=document.createElement("div"); 
    div.setAttribute("id", "summarizationSection");
    document.body.appendChild(div); 
    div.style.color = "black";
    div.style.width = "40%";
    div.style.position = "relative";
    div.style.left = "30%";
    div.style.right="30%";
    div.style.top="50px";

    document.getElementById("summarizationSection").scrollIntoView();
}
  
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    if (request=="giveText"){
        sendResponse(summary());
    }
    else{
        postText(request);
    }

})