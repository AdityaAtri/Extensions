$(function(){
	$('#savelimit').click(function(){
		var limit = $('#limit').val();
		if(limit)
		{
			chrome.storage.sync.set({'limit':limit}, function(){
 				close(); 
			});
		}

	}); 
	$('#resettotal').click(function(){
		chrome.storage.sync.set({'total':0}, function(){
					var notifoptions = {
                        type:"basic", 
                        iconUrl:"icon48.png",
                        title:"Total Reset",
                        message:"You reset the total to 0!"
                    }
                    chrome.notifications.create('resetnotif', notifoptions);
                    chrome.notifications.clear('resetnotif');
			
		});
	});
});


