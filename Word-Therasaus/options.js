document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.sync.get(null, function(items) {
    var allKeys = Object.keys(items);
    for(var i=0; i<allKeys.length; i++){
        var word = allKeys[i];
        var x1 = "<div class='col-lg-3 col-sm-6'><div class='thumbnail'><img src='images/1.jpg'><h1>";
        var x2 = "</h1></div><button class='btn del_btn'"+" id="+word+"><i class='fa fa-trash'></i> Trash</button></div>"
        var element = x1+word+x2;
        $(".row").append(element);
    }
    });
}, false);

$(document).on('click',"#submitbutton",function(e) {
    
    var word = document.getElementById("addword").value;
    if(word.indexOf(' ') >= 0 ){

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
            chrome.storage.sync.set({[word]:"pracheta"}, function(){
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
});

$(document).on('click', "button", function(e){
    
    var entry = $(this).parent(); 
    var ele_id = $(this).attr('id');
    entry.remove();
    chrome.storage.sync.remove(ele_id, function(Items)
    {
        var notifoptions = {
                        type:"basic", 
                        iconUrl:"images/logo128.png",
                        title:"Word Thesaurus",
                        message: "Word removed from Dictionary"
                    }
            chrome.notifications.create('limitnotif', notifoptions);
            chrome.notifications.clear('limitnotif');
    });
});



