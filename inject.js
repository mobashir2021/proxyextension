(function() {
    "use strict";
  
    //var variable = document.currentScript.dataset.variable;
    //var not_a_string = JSON.parse(document.currentScript.dataset.not_a_string);
    
    var tzdata = parseInt(document.currentScript.dataset.timezonevalue);
    var lang = document.currentScript.dataset.languagevalue; 
    var singlelang = document.currentScript.dataset.langsingle;

    const originalUserAgent = window.navigator.userAgent;
    const fakeUserAgent = originalUserAgent.replace(
      /\(.*?(?=(; rv:[^\)]+)?\))/,
      "(Windows NT 10.0; Win64; x64"
    );
    const fakeVersion = fakeUserAgent.substr(8);
  
    window.navigator.__defineGetter__("appVersion", function() {
      return fakeVersion;
    });
    

    /* chrome.storage.local.get(['getLanguagedata'], function(result){
      
      if(result.getLanguagedata === undefined){
          
      }else{
        
        window.navigator.__defineGetter__("language", function() {
          var splitdata = result.getLanguagedata.split(',')[0];
          return splitdata.split('-')[0];
        });
      }
      
  });

    chrome.storage.local.get(['getLanguagedata'], function(result){
      
      if(result.getLanguagedata === undefined){
          
      }else{
        window.navigator.__defineGetter__("languages", function() {
          return [result.getLanguagedata];
        });
      }
      
  }); */

  window.navigator.__defineGetter__("language", function() {
    return singlelang;
  });

    window.navigator.__defineGetter__("languages", function() {
      return lang;
    });
    window.navigator.__defineGetter__("mimeTypes", function() {
      return { length: 0 };
    });
    window.navigator.__defineGetter__("oscpu", function() {
      return undefined;
    });
    window.navigator.__defineGetter__("platform", function() {
      return "Linux";
    });
    window.navigator.__defineGetter__("plugins", function() {
      return { length: 0 };
    });
    // window.navigator.__defineGetter__("userAgent", function() {
    //   return fakeUserAgent;
    // });


   var d = new Date(); // Mon Jul 13 2015 10:58:12 GMT+0200 (CEST)
     // -120, My local "real" timezone.

    // Save the original method.
    var getTimezoneOffset = Date.prototype.getTimezoneOffset;

    Date.prototype.getTimezoneOffset = function () {
      return tzdata;
    }

    /* chrome.storage.local.get(['getTimezonedata'], function(result){
      
      if(result.getTimezonedata === undefined){
          
      }else{
        Date.prototype.getTimezoneOffset = function () {
          return result.getTimezonedata;
        }
      }
      
  }); */

    



    

    
  


  })();


 

  
  