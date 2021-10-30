$(function(){

    //console.log('each click called');

      

      
    chrome.storage.local.get(['getuseragent'], function(result){
        console.log(result.getuseragent);
        if(result.getuseragent === undefined){
            GetUserAgentData();
        }else{
            $("#actualuseragent").text(result.getuseragent.toString());
        }
        return false;
    });
    //uagent.then(setUseragentChoice, onErrorKeyUseragent); 

    chrome.storage.local.get(['getcityvalue'], function(result){
        console.log(result.getcityvalue);
        if(result.getcityvalue === undefined){
            
        }else{
            $("#current_city_by_ip").text(result.getcityvalue.toString());
        }
        return false;
    });

    /* chrome.storage.local.get(['gethost'], function(result){
        console.log(result.gethost);
        if(result.gethost === undefined){
            
        }else{
            //$("#current_city_by_ip").text(result.getcityvalue.toString());
        }
        return false;
    }); */
    //uagentcity.then(setCityChoice, onError);

    chrome.storage.local.get(['getipvalue'], function(result){
        console.log(result.getipvalue);
        if(result.getipvalue === undefined){
            
        }else{
            $("#current_ip").text(result.getipvalue.toString());
        }
        return false;
    });
    //uagentip.then(setIpChoice, onError);

    chrome.storage.local.get(['countryvalue'], function(result){
        console.log(result.countryvalue);
        if(result.countryvalue === undefined){
            
        }else{
            $("#country_id").val(result.countryvalue.toString());
        }
    });
    //uagentcountryvalue.then(setcountryvalueChoice, onError);  

    chrome.storage.local.get(['tempusername'], function(result){
        if(result.tempusername === undefined){
            $('#divlogin').css("display", "block");
            $('#main').css("display", "none");
            $('#signout').css("display", "none");
          }else{
            //document.querySelector("#color").value = result.color || "blue";
            $('#divlogin').css("display", "none");
            $('#main').css("display", "block");
            $('#signout').css("display", "block");
          }
    
          return false;
    });
    //getting.then(setCurrentChoice, onErrorKey);


    $("#btnlogin").click(function(e){
        
        LoginData(e);
        return false;
    });	
    
    $("#btnsignout").click(function(){
        
        signoutuser();
        return false;
    });

    $("#clear_proxy_using").click(function(){
        clearProxy();
        return false;
        });

    $('#refreshproxy').click(function(){
        // $(this).prop('disabled', true);
        RefreshProxy();

        /* setTimeout(function(){
            $(this).prop('disabled', false);
        }, 5000); */
        return false;
    });
    
    $('#country_id').change(function() {
        
        countryChange();
        return false;
      });

      $('#getnewagent').click(function(){
        
          GetUserAgentData();
          return false;
      });

});//End of DOM Ready function


function RefreshProxy(){
    countryChange();
}

function setUseragentChoice(result) {
    console.log(result.getuseragent);
    if(result.getuseragent === undefined){
        GetUserAgentData();
    }else{
        $("#actualuseragent").text(result.getuseragent.toString());
    }
    return false;
  }

  function setIpChoice(result) {
    console.log(result.getipvalue);
    if(result.getipvalue === undefined){
        
    }else{
        $("#current_ip").text(result.getipvalue.toString());
    }
    return false;
  }

  function setCityChoice(result) {
    console.log(result.getcityvalue);
    if(result.getcityvalue === undefined){
        
    }else{
        $("#current_city_by_ip").text(result.getcityvalue.toString());
    }
    return false;
  }

  function setcountryvalueChoice(result) {
    console.log(result.countryvalue);
    if(result.countryvalue === undefined){
        
    }else{
        $("#country_id").val(result.countryvalue.toString());
    }

    return false;
  }
  
  function onErrorKeyUseragent(e) {
    //GetUserAgentData();
  }

function onCleared() {
    //console.log("OK");
  }
  
  function onError(e) {
    //console.log(e);
  }

function onErrorKey(error) {
    //console.log(`Error: ${error}`);
    $('#divlogin').css("display", "block");
    $('#main').css("display", "none");
    $('#signout').css("display", "none");
  }

  function setCurrentChoice(result) {
      //console.log('aaa');
      //console.log(result.tempusername);
      if(result.tempusername === undefined){
        $('#divlogin').css("display", "block");
        $('#main').css("display", "none");
        $('#signout').css("display", "none");
      }else{
        //document.querySelector("#color").value = result.color || "blue";
        $('#divlogin').css("display", "none");
        $('#main').css("display", "block");
        $('#signout').css("display", "block");
      }

      return false;
    
  }

function GetUserAgentData(){
  
    $("#actualuseragent").text("Loading.......");
    var url = "http://www.fjfgroups.com/api/LeadApi/GetUserAgent";
    
    
    var settings = {
        type : "GET",
        dataType : "json",
        //contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        url : url,
        //data : {username: usernamevalue,password: passwordvalue},
        success : function(result){
            
            //$('#messageboxspan').html(JSON.stringify(result));
            var obj = JSON.stringify(result);
            if(obj.toString() != ''){
                chrome.storage.local.set({
                    getuseragent: obj.toString()
                  }, function(){

                  });
                $("#actualuseragent").text(obj.toString());
                chrome.runtime.sendMessage({
                    action: obj.toString()
                });
                
            }else{
                
                $('#messageboxspan').html("No user agent found");
            }
            
            
            
        },
        error : function(err){
            //$('#divlogin').css("display", "none");
            
            $('#messageboxspan').html(JSON.stringify(err));
            //alert(JSON.stringify(err));	
            //$('#signout').css("display", "block");				
        }
    };
    
    $.ajax(settings);
    return false;
}

function signoutuser(){
    $('#messageboxspan').html("");
    $('#current_ip').html("");
    $('#current_country_by_ip').html("");
    $('#current_city_by_ip').html("");
    $('#divlogin').css("display", "block");
    $('#main').css("display", "none");
    $('#signout').css("display", "none");
    chrome.runtime.sendMessage({
        valuedata: "proxyClear"
    });
    chrome.storage.local.remove(["getcityvalue","getipvalue", "countryvalue", "getuseragent", "tempusername"],function(){
        var error = chrome.runtime.lastError;
           if (error) {
               console.error(error);
           }
       })

    
}

function clearProxy(){
    $('#messageboxspan').html("");
    $('#current_ip').html("");
    $('#current_country_by_ip').html("");
    $('#current_city_by_ip').html("");
    
    chrome.runtime.sendMessage({
        valuedata: "proxyClear"
    });
      

    chrome.storage.local.remove(["getcityvalue","getipvalue", "countryvalue"],function(){
        var error = chrome.runtime.lastError;
           if (error) {
               console.error(error);
           }
       });
}

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }




function countryChange(){
    
    
    //var sessionidvalue = makeid(8);
    $('#current_ip').html("Loading......");
    $('#current_country_by_ip').html("Loading......");
    $('#current_city_by_ip').html("Loading......");
    var countriesid = $('#country_id').val();



    var ijRandom = Math.floor(Math.random() * 8) + 1;  
    var tempusernamedata = 'lum-customer-c_1f034242-zone-zonesanjib-country-' + countriesid + '-session-' + ijRandom;
    $('#messageboxspan').html(tempusernamedata);

    chrome.runtime.sendMessage({
        valuedata: "proxy",
        username: tempusernamedata,
        passwordpass: 'a46ycwhmowbr'
    }, function(response) {
        //if(response.statusvalue == "correct"){
            $.ajax({
                type : "GET",
                dataType : "json",
                url: "http://fjfgroups.com/api/LeadApi/GetIpAddress",
                
                success: function (datainner) {
                    var tempresinner = JSON.stringify(datainner).split("~");
                    $('#current_ip').html(tempresinner[0].replace('"',''));
                    $('#current_country_by_ip').html(tempresinner[1]);
                    $('#current_city_by_ip').html(tempresinner[2]);

                    
                    
        
                      chrome.storage.local.set({
                        getipvalue: tempresinner[0].replace('"','')
                      }, function(){
                        $.ajax({
                            type: "GET",
                            dataType : "json",
                            url: "https://ipapi.co/"+tempresinner[0].replace('"','')+"/json/",
                            success: function(successdata){

                               var getTimezonedata = moment().utcOffset(successdata.utc_offset).utcOffset();
                               var getLanguagedata = successdata.languages;

                               /* chrome.tabs.executeScript({
                                code: "var timezonedata = JSON.parse('"
                                      + JSON.stringify(getTimezonedata).replace(/\\/g,'\\\\').replace(/'/g,"\\'") + "';"
                            }, function () {
                                chrome.tabs.executeScript({
                                    file: "content.js"
                                });
                            }); */

                                /* chrome.tabs.query({}, tabs => {
                                    tabs.forEach(tab => {
                                    chrome.tabs.sendMessage(tab.id, { timezone: getTimezonedata, lang: getLanguagedata});
                                  });
                                }); */

                                chrome.storage.local.set({
                                    getTimezonedata: moment().utcOffset(successdata.utc_offset).utcOffset()
                                  }, function(){
                
                                  });
                                  chrome.storage.local.set({
                                    getLanguagedata: successdata.languages
                                  }, function(){
                
                                  });
                            },
                            error: function(errordata){
                              $('#messageboxspan').html(JSON.stringify(errordata));
                            }
                        });
                        chrome.storage.local.set({
                            getcityvalue: tempresinner[2]
                          }, function(){
                            chrome.storage.local.set({
                                countryvalue: $('#country_id').val().toString()
                              }, function(){
                                //window.location.reload(true);
                            });
            
                          });
                      });

                      
        
                      
                },
                error : function(errinner){
                    //$('#divlogin').css("display", "none");
                    
                    $('#messageboxspan').html(JSON.stringify(errinner));
                                
                }
            });
        //}
      });
    
    
    
    //$.ajax(settings);
    
    
    

}



function LoginData(e){
    var url = "https://digimarkon.com/login/getuserinfo";
    var usernamevalue = $("#username").val();
    var passwordvalue = $("#password").val();
    
    var settings = {
        type : "POST",
        dataType : "json",
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        url : url,
        data : {username: usernamevalue,password: passwordvalue},
        success : function(result){
            
            //$('#messageboxspan').html(JSON.stringify(result));
            var obj = result;
            if(obj.Result.Username.toString() != ''){
                chrome.storage.local.set({
                    tempusername: usernamevalue
                  }, function(){
                  
                });
                $('#divlogin').css("display", "none");
                $('#main').css("display", "block");
                $('#signout').css("display", "block");
            }else{
                
                $('#messageboxspan').html("Kindly enter correct Username/Password");
            }
            

            
        },
        error : function(err){
            //$('#divlogin').css("display", "none");
            
            
            $('#messageboxspan').html(JSON.stringify(err));
            //alert(JSON.stringify(err));	
            //$('#signout').css("display", "block");				
        }
    };
    
    $.ajax(settings);
    e.preventDefault();
    
}//LoadData