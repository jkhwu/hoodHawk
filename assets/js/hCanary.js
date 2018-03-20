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
        var key = '3LSLSSTG46BO8P7H96I4'
        var secret = 'XnqjMq7SujGcGlS05WCa4THVGNhpAU4a';
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
            block = data[0].address_info.block_id ,
            blockGroup = data[0].address_info.blockgroup_id ,
            zip = data[0].address_info.zipcode ,
            lat = data[0].address_info.lat ,
            long = data[0].address_info.lng ,
            bathrooms = data[0]["property/details"].result.property.total_bath_count,
            bedrooms = data[0]["property/details"].result.property.number_of_bedrooms,
            airConditioning = data[0]["property/details"].result.property.air_conditioning,
            heating = data[0]["property/details"].result.property.heating,
            propertyType = data[0]["property/details"].result.property.property_type,
            squareFeet = data[0]["property/details"].result.property.building_area_sq_ft,
            assessedValue = data[0]["property/details"].result.assessment.total_assessed_value,
            assessmentYear = data[0]["property/details"].result.assessment.assessment_year,
            propertyTax = data[0]["property/details"].result.assessment.tax_amount,

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