var block = ''
var blockGroup = ''
var zip = ''
var lat = ""
var long = ""

$('#submit').on('click', function() {

    event.preventDefault()
    var address = $('#addressInput').val()
    var zipCode = $('#zipCodeInput').val()

    initial()

    function initial() {
        var key = '6MHHSYNZLAN18I6Y5A3L'
        var secret = 'WyiwLMO1DJy1R6AiQ4pAEjlNTMVDmpL3';
        var url = `https://cors-anywhere.herokuapp.com/https://api.housecanary.com/v2/property/details?address=${address}&zipcode=${zipCode}`

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
            lat = data[0].address_info.lat
            long = data[0].address_info.lng
            $("#numBath").text(data[0]["property/details"].result.property.total_bath_count)
            $("#numBed").text(data[0]["property/details"].result.property.number_of_bedrooms)
            $("#bed, #bath").removeClass("blue-grey-text text-lighten-4").addClass("cyan-text")
            airConditioning = data[0]["property/details"].result.property.air_conditioning
            if (airConditioning === null) {
                $("#icy").removeClass("blue-text")
                $("#icy").addClass("blue-grey-text text-lighten-4")
            } else {
                $("#icy").removeClass("blue-grey-text text-lighten-4")
                $("#icy").addClass("blue-text")
            }
            heating = data[0]["property/details"].result.property.heating
            if (heating === null) {
                $("#fire").removeClass("deep-orange-text")
                $("#fire").addClass("blue-grey-text text-lighten-4")
            } else {
                $("#fire").removeClass("blue-grey-text text-lighten-4")
                $("#fire").addClass("deep-orange-text")
            }
            $("#propTypeText").text(data[0]["property/details"].result.property.property_type)
            $("#sqFtText").text(data[0]["property/details"].result.property.building_area_sq_ft)
            $("#assessedValueText").text(data[0]["property/details"].result.assessment.total_assessed_value.toLocaleString())
            assessmentYear = data[0]["property/details"].result.assessment.assessment_year
            propertyTax = data[0]["property/details"].result.assessment.tax_amount
            $("#addressHeader").text(data[0].address_info.address_full)
            crime()
            blockgroup()
            zipdetail()
            initMap()
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
            nationalPct = data[0]["block/crime"].result.all.nation_percentile
            numberIncidents = data[0]["block/crime"].result.all.incidents
            countyPct = data[0]["block/crime"].result.all.county_percentile

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
})