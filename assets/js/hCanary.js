/*hCanaryObj = {

    key : '3LSLSSTG46BO8P7H96I4' ,
    secret : 'XnqjMq7SujGcGlS05WCa4THVGNhpAU4a' ,
    url : "https://cors-anywhere.herokuapp.com/https://api.housecanary.com/v2/property/value?address=10216+N+Willow+Ave&zipcode=64157" ,
    
   
   details : function() {
    $.ajax({
        url: this.url ,
        type: 'GET',
        beforeSend: function (xhr) {
            console.log(this)
            console.log(hCanaryObj)
            xhr.setRequestHeader(
                'Authorization',
                'Basic ' + btoa(hCanaryObj.key + ":" + hCanaryObj.secret)
            )
        },
        data: {}
    }).then(function(data) { 
        console.log(data)
    });
    }
}

hCanaryObj.details()*/
var block = ''
var blockGroup = ''
var zip = ''
initial()

function initial() {
    var key = '3LSLSSTG46BO8P7H96I4'
    var secret = 'XnqjMq7SujGcGlS05WCa4THVGNhpAU4a';
    var url = "https://cors-anywhere.herokuapp.com/https://api.housecanary.com/v2/property/details?address=1130huntingdondr&zipcode=95129"

    $.ajax({
        url: url,
        type: 'GET',
        beforeSend: function(xhr) {
            xhr.setRequestHeader(
                'Authorization',
                'Basic ' + btoa(key + ":" + secret)
            );
        },
        data: {}
    }).then(function(data) {
        console.log(data)
        block = data[0].address_info.block_id
        blockGroup = data[0].address_info.blockgroup_id
        zip = data[0].address_info.zipcode

        crime()
        blockgroup()
        zipdetail()
    });
}

function crime() {
    console.log(block)
    console.log(blockGroup)
    console.log(zip)
    var key = '3LSLSSTG46BO8P7H96I4'
    var secret = 'XnqjMq7SujGcGlS05WCa4THVGNhpAU4a';
    var url = `https://cors-anywhere.herokuapp.com/https://api.housecanary.com/v2/block/crime?block_id=${block}`
    $.ajax({
        url: url,
        type: 'GET',
        beforeSend: function(xhr) {
            xhr.setRequestHeader(
                'Authorization',
                'Basic ' + btoa(key + ":" + secret)
            );
        },
        data: {}
    }).then(function(data) {
        console.log(data)
    });
}

function blockgroup() {
    var key = '3LSLSSTG46BO8P7H96I4'
    var secret = 'XnqjMq7SujGcGlS05WCa4THVGNhpAU4a';
    var url = `https://cors-anywhere.herokuapp.com/https://api.housecanary.com/v2/blockgroup/hcri?blockgroup_id=${blockGroup}&property_type=SFD`
    $.ajax({
        url: url,
        type: 'GET',
        beforeSend: function(xhr) {
            xhr.setRequestHeader(
                'Authorization',
                'Basic ' + btoa(key + ":" + secret)
            );
        },
        data: {}
    }).then(function(data) {
        console.log(data)
    });
}

function zipdetail() {
    var key = '3LSLSSTG46BO8P7H96I4'
    var secret = 'XnqjMq7SujGcGlS05WCa4THVGNhpAU4a';
    var url = `https://cors-anywhere.herokuapp.com/https://api.housecanary.com/v2/zip/details?zipcode=${zip}`
    $.ajax({
        url: url,
        type: 'GET',
        beforeSend: function(xhr) {
            xhr.setRequestHeader(
                'Authorization',
                'Basic ' + btoa(key + ":" + secret)
            );
        },
        data: {}
    }).then(function(data) {
        console.log(data)
    });
}