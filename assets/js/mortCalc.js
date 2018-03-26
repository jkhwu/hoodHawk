//                 \\
//   Event Handler   \\
//                     \\

// $(document).ready(function () {
//     console.log("Get Some!")

// event.preventDefault()

// mortCalc()

// Main Data Call \\

function mortCalc() {
    var key = '6MHHSYNZLAN18I6Y5A3L'
    var secret = 'WyiwLMO1DJy1R6AiQ4pAEjlNTMVDmpL3'
    var url = "https://www.quandl.com/api/v3/datasets/FMAC/30US?start_date=2018-03-15&end_date=2018-03-15&api_key=XL3yWf8pFs7G_1xc-Juk"

    $.ajax({
        url: url,
        type: 'GET',
        data: {}
    }).then(function(data) {
        console.log("Quandl: " + data)
        var int = data.dataset.data[0][1] / 100;
        console.log("interest: " + int)
        var mort = (houseVal * ((int / 12) * (1 + (int / 12)) ** 360)) / (((1 + (int / 12)) ** 360) - 1)
        console.log("mortgage: " + mort)
        console.log("house val: " + houseVal)
        $("#affordTable").append('<tr><th>Mortgage:</th><td><span id="mortgage"></span></td></tr>')
        if (mort == null) $("#mortgage").text("not available")
        else $("#mortgage").text("$" + Math.round(mort).toLocaleString() + " per month")
    });
}
// })