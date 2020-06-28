chrome.contextMenus.removeAll(function() {
  chrome.contextMenus.create({
    "id": "Addword",
    "title": "Add This Word",
    "contexts": ["selection"]
  });
});

chrome.contextMenus.removeAll(function() {
  chrome.contextMenus.create({
    "id": "search",
    "title": "Search This Word",
    "contexts": ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener(function(clickdata){
    if(clickdata.menuItemId == "search" && clickdata.selectionText)
    {
        chrome.tabs.create({'url': "https://www.google.com/search?q=" +clickdata.selectionText+" meaning"});
    }
    else if(clickdata.menuItemId == "Addword" && clickdata.selectionText){
         var text = clickdata.selectionText;
         if(text.indexOf(' ') >= 0){
             var notifoptions = {
                            type:"basic", 
                            iconUrl:"images/logo128.png",
                            title:"Word Thesaurus",
                            message:"Cannot add this word. It contains whitespace."
                            }; 
                chrome.notifications.create('limitnotif', notifoptions);
                chrome.notifications.clear('limitnotif');
        }
        else{

            if(clickdata.menuItemId == "Addword" && clickdata.selectionText)
                {
            
                    chrome.storage.sync.set({[clickdata.selectionText]:"pracheta"}, function(){
                        var notifoptions = {
                                type:"basic", 
                                iconUrl:"images/logo128.png",
                                title:"Word Thesaurus",
                                message:"Word Added to your Dictionary"
                                }; 
                    chrome.notifications.create('limitnotif', notifoptions);
                    chrome.notifications.clear('limitnotif');
                  });
                }
        }
    }
    
});
