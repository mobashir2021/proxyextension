

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    asyncFunctionWithAwait(request, sender, sendResponse);
    
    
    
    
    return true;
  });

  const asyncFunctionWithAwait = async (request, sender, sendResponse) => {

    if (request.valuedata == "proxy"){
        /* console.log(request.httpip);
        console.log(request.passwordpass); */
        
        var config = {
            mode: "fixed_servers",
            rules: {
              singleProxy: {
                scheme: "http",
                host: 'zproxy.lum-superproxy.io',
                port:  22225
              },
              bypassList: []
            }
          };

          var authCredentials = function (proxyUsername, proxyPassword) {
            return {
                
                authCredentials: {
                    username: proxyUsername,
                    password: proxyPassword
                }
            }
        };


    

    await chrome.proxy.settings.set(
      {value: config, scope: 'regular'},
      function() {
        if (chrome.webRequest.onAuthRequired) {
            chrome.webRequest.onAuthRequired.addListener(
                 function (details) {
                    console.log("onAuthRequired!");
                return authCredentials(request.username.toString(), request.passwordpass.toString());
            } 
            /* function(details, callbackFn) {
                console.log("onAuthRequired!", details, callbackFn);
                callbackFn({
                    authCredentials: {username: "sanjibdangi", password: request.passwordpass}
                });
            } */
            /* function(details) {
                console.log("onAuthRequired!", details);
                
                    authCredentials: {username: "sanjibdangi", password: request.passwordpass}
                
            } */
            , {urls: ['<all_urls>']}, ['blocking']);
            
        } 

      });
      sendResponse({statusvalue: "correct"});
    }

    if (request.valuedata == "proxyClear"){

        var config = {
            mode: "direct"
          };

         await chrome.proxy.settings.set(
            {value: config, scope: 'regular'},
            function() {
            });
    }
  }

  

  chrome.webRequest.onBeforeSendHeaders.addListener(
    function(details) {
        chrome.storage.local.get(['getuseragent'], function(result){
            
            if(result.getuseragent === undefined){
                
            }else{
                for (var i = 0; i < details.requestHeaders.length; ++i) {
                    if (details.requestHeaders[i].name === 'User-Agent') {
                        details.requestHeaders[i].value = result.getuseragent;
                        
                        break;
                    }
                }
                console.log('useragent');
                console.log(result.getuseragent);
                return {requestHeaders: details.requestHeaders};
            }
            
        });

        
    }, {urls: ['<all_urls>']}, ['blocking', 'requestHeaders']);