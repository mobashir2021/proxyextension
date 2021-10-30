// DNS-JS.com - Make DNS queries from Javascript
// Copyright 2019 Infinite Loop Development Ltd - InfiniteLoop.ie
// Do not remove this notice.

DNS = {
    QueryType : {
        A : 1,
        NS : 2,
        MD : 3,
        MF : 4,
        CNAME : 5,
        SOA : 6,
        MB : 7,
        MG : 8,
        MR : 9,
        NULL : 10,
        WKS : 11,
        PTR : 12,
        HINFO : 13,
        MINFO : 14,
        MX : 15,
        TXT : 16,
        RP : 17,
        AFSDB : 18,
        AAAA : 28,
        SRV : 33,
        SSHFP : 44,
        RRSIG : 46,
        AXFR : 252,
        ANY : 255,
        URI : 256,
        CAA : 257
    },
    Query: function (domain, type, callback) {
        DNS._callApi({
            Action: "Query",
            Domain: domain,
            Type: type
        },
        callback);
    },
    _callApi: function (request, callback) {
        var xhr = new XMLHttpRequest();
        URL = "https://www.dns-js.com/api.aspx";
        xhr.open("POST", URL);
        xhr.onreadystatechange = function () {
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                callback(JSON.parse(xhr.response));
            }
        }
        xhr.send(JSON.stringify(request));
    }
};