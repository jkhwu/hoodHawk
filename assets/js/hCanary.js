hCanaryObj = {

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

hCanaryObj.details()


// var key = '3LSLSSTG46BO8P7H96I4'
// var secret = 'XnqjMq7SujGcGlS05WCa4THVGNhpAU4a';

// var url = "https://cors-anywhere.herokuapp.com/https://api.housecanary.com/v2/property/value?address=10216+N+Willow+Ave&zipcode=64157";

// $.ajax({
//     url: url,
//     type: 'GET',
//     beforeSend: function (xhr) {
//         xhr.setRequestHeader(
//             'Authorization',
//             'Basic ' + btoa(key + ":" + secret)
//         );
//     },
//     data: {}
// }).then(function(data) { 
//     console.log(data);
// });