var menuItem = {
    "id": "spendMoney",
    "title": "Spend Money",
    "contexts": ["selection"]
};
chrome.contextMenus.create(menuItem);

function isInt(value) {
  return !isNaN(value) && parseInt(Number(value)) == value && !isNaN(parseInt(value, 10));
}

chrome.contextMenus.onClicked.addListener(function(clickdata){
	if(clickdata.menuItemId == "spendMoney" && clickdata.selectionText){
		if(isInt(clickdata.selectionText))
		{
			chrome.storage.sync.get(['total','limit'], function(budget){
				var new_total = 0;
				if(budget.total)
				{
					new_total += parseInt(budget.total); 
				}
				new_total += parseInt(clickdata.selectionText);
				chrome.storage.sync.set({'total':new_total}, function(){
					if(new_total > budget.limit)
					{
						var notifoptions = {
                        type:"basic", 
                        iconUrl:"icon48.png",
                        title:"Limit Reached",
                        message:"Uh oh! Looks like you've reached your limit!"
                    	}; 
                       chrome.notifications.create('limitnotif', notifoptions);
                       chrome.notifications.clear('limitnotif');
					}
				});
			});
		}
	}
});
// chrome api whenever there is changes in chrome storage
chrome.storage.onChanged.addListener(function(changes,storageName){ 
		chrome.browserAction.setBadgeText({"text": changes.total.newValue.toString()});  // setting badges
})






