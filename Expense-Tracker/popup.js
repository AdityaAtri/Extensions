$(function(){

    chrome.storage.sync.get(['total','limit'],function(budget){
        $('#total').text(budget.total);   // every time you are opening the extension - retrieve the stored value in Total var
        $('#limit').text(budget.limit); 
    })
    $('#spendAmount').click(function(){
        chrome.storage.sync.get(['total','limit'],function(budget){
            var newTotal = 0;
            if (budget.total){
                newTotal += parseInt(budget.total);
            }

            var amount = $('#amount').val();
            if (amount){
                newTotal += parseInt(amount);
            }

            chrome.storage.sync.set({'total': newTotal}, function(){
                if(amount && newTotal > budget.limit)
                {
                    var notifoptions = {
                        type:"basic", 
                        iconUrl:"icon48.png",
                        title:"Limit Reached",
                        message:"Uh oh! Looks like you've reached your limit!"
                    }
                    chrome.notifications.create('limitnotif', notifoptions);
                    chrome.notifications.clear('limitnotif');
                    // create it every time when you reached above the limit, first you need to delete that notification 
                }
            });
            $('#total').text(newTotal);
            $('#amount').val('');
        });
    });
});