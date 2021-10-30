/* chrome.runtime.onMessage.addListener((msg, sender, response) => {
    console.log(msg);
    var tzone = msg.timezone;
    var lang = msg.lang;
    
    alert(tzone);
    alert(lang);

});
 */

chrome.storage.local.get(['getLanguagedata'], function(result){
      
    if(result.getLanguagedata === undefined){
        //alert('data undefined');
    }else{
      var languages = result.getLanguagedata;
      var singlelang = 'en';
      chrome.storage.local.get(['getTimezonedata'], function(result){
      
        if(result.getTimezonedata === undefined){
            //alert('data undefined');
        }else{
          
          var timezones = result.getTimezonedata;
          
          var script1 = document.createElement("script");
          script1.src = chrome.extension.getURL("injectsecond.js");

          var s = document.createElement('script');
          s.dataset.timezonevalue = timezones.toString();
          //s.dataset.timezones = 'some string variable';
          //s.dataset.not_a_string = JSON.stringify({some: 'object'});
          s.dataset.languagevalue = languages;
          //var templang = languages.split(',')[0].split('-')[0];
          s.dataset.langsingle = 'zh';
          s.src = chrome.extension.getURL('inject.js');
          s.onload = function() {
            this.remove();
          };
          
          (document.head || document.documentElement).appendChild(s);
          (document.head || document.documentElement).appendChild(script1);
        }
        
    });
    }
    
});







//var script = document.createElement("script");
//script.src = chrome.extension.getURL("injectsecond.js");
/* var script1 = document.createElement("script");
script1.src = chrome.extension.getURL("inject.js");

script1.onload = function() {
  this.remove();
};

//(document.head || document.documentElement).appendChild(script);
(document.head || document.documentElement).appendChild(script1);
 */










