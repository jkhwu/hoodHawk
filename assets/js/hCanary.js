  //                \\
  // Global Variables \\
  //                    \\
  var block = ''
  var blockGroup = ''
  var zip = ''
  var lat = ""
  var long = ""


  //                 \\
  //   Event Handler   \\
  //                     \\

  $('#submit').on('click', function() {
      console.log("You Hit Me!")

      event.preventDefault()
      var address = $('#addressInput').val()
      var zipCode = $('#zipCodeInput').val()

      initial()


      // Main Data Call \\ 
      function initial() {
          var key = '6MHHSYNZLAN18I6Y5A3L'
          var secret = 'WyiwLMO1DJy1R6AiQ4pAEjlNTMVDmpL3'
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
              if (data[0]["property/details"].result === null) {
                  $("#addressHeader").text("Sorry! I couldn't find any information about that address.")
              } else {
                  block = data[0].address_info.block_id
                  blockGroup = data[0].address_info.blockgroup_id
                  zip = data[0].address_info.zipcode
                  lat = data[0].address_info.lat
                  long = data[0].address_info.lng
                  $("#bed, #bath").removeClass("blue-grey-text text-lighten-4").addClass("cyan-text");
                  $("#numBath").text(data[0]["property/details"].result.property.total_bath_count)
                  $("#numBed").text(data[0]["property/details"].result.property.number_of_bedrooms)
                  airConditioning = data[0]["property/details"].result.property.air_conditioning
                  if (airConditioning === null) {
                      $("#icy").removeClass("blue-text")
                  } else {
                      $("#icy").removeClass("blue-grey-text text-lighten-4")
                      $("#icy").addClass("blue-text")
                  }
                  heating = data[0]["property/details"].result.property.heating
                  if (heating === null) {
                      $("#fire").removeClass("deep-orange-text")
                  } else {
                      $("#fire").removeClass("blue-grey-text text-lighten-4")
                      $("#fire").addClass("deep-orange-text")
                  }
                  $("#sqFtText").text(data[0]["property/details"].result.property.building_area_sq_ft.toLocaleString())
                  $("#propTypeText").text(data[0]["property/details"].result.property.property_type)
                  $("#assessedValueText").text(`$${data[0]["property/details"].result.assessment.total_assessed_value.toLocaleString()}`)
                  $("#assessmentYearText").text(data[0]["property/details"].result.assessment.assessment_year)

                  $("#propertyTax").text(data[0]["property/details"].result.assessment.tax_amount.toLocaleString())
                  $("#addressHeader").text(data[0].address_info.address_full)
                  school()
                  crime()
                  rental()
                      // blockgroup()
                      // zipdetail()
                  initMap()
              }
          });
      }


      // School Stats Call \\

      function school() {
          var key = '6MHHSYNZLAN18I6Y5A3L'
          var secret = 'WyiwLMO1DJy1R6AiQ4pAEjlNTMVDmpL3'
          var url = `https://cors-anywhere.herokuapp.com/https://api.housecanary.com/v2/property/school?address=${address}&zipcode=${zipCode}`
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
              $("#schoolsElem").text(titleCase(data[0]["property/school"].result.school.elementary[0].name))
              $("#schoolsMiddle").text(titleCase(data[0]["property/school"].result.school.middle[0].name))
              $("#schoolsHigh").text(titleCase(data[0]["property/school"].result.school.high[0].name))
          })
      }

      // Crime Stats Call \\
      function crime() {
          console.log(block)
          console.log(blockGroup)
          console.log(zip)
          var key = '6MHHSYNZLAN18I6Y5A3L'
          var secret = 'WyiwLMO1DJy1R6AiQ4pAEjlNTMVDmpL3'
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
              $("#crimePctNational").text(data[0]["block/crime"].result.all.nation_percentile)
              $("#crimeIncidents").text(data[0]["block/crime"].result.all.incidents)
              $("#crimePctCounty").text(data[0]["block/crime"].result.all.county_percentile)

          });
      }

      // Property Rental Stats Call \\
      function rental() {
          var key = '6MHHSYNZLAN18I6Y5A3L'
          var secret = 'WyiwLMO1DJy1R6AiQ4pAEjlNTMVDmpL3'
          var url = `https://cors-anywhere.herokuapp.com/https://api.housecanary.com/v2/property/rental_yield?address=${address}&zipcode=${zipCode}`
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
              $("#houseValue").text(`$${data[0]["property/rental_yield"].result.value.toLocaleString()}`);
              $("#monthlyRent").text(`$${data[0]["property/rental_yield"].result.monthly_rent.toLocaleString()} per month`);

          })
      }

      // Rewrite strings so only first letter is capitalized \\
      function titleCase(str) {
          var splitStr = str.toLowerCase().split(' ');
          for (var i = 0; i < splitStr.length; i++) {
              splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
          }
          return splitStr.join(' ');
      }


      function blockgroup() {
          var key = '6MHHSYNZLAN18I6Y5A3L'
          var secret = 'WyiwLMO1DJy1R6AiQ4pAEjlNTMVDmpL3'
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
          var key = '6MHHSYNZLAN18I6Y5A3L'
          var secret = 'WyiwLMO1DJy1R6AiQ4pAEjlNTMVDmpL3'
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