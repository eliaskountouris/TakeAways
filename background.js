chrome.tabs.onActivated.addListener(tab => {
    chrome.tabs.get(tab.tabId, current_tab_info => {
        console.log(current_tab_info.url)
        if (/^https:\/\/www.medium/.test(current_tab_info.url)){
            chrome.tabs.executeScript(null, {file: "./foreground.js"}, () => console.log("hello"))
            console.log("medium")
        }
        if (/^https:\/\/www.google/.test(current_tab_info.url)){
            console.log("google")
            chrome.tabs.executeScript(null, {file: "./foreground.js"}, () => console.log("hello"))
        }
    })
})

