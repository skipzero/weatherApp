var Outdoor_Temperature = 0.0;
var Outdoor_Humidity = 0.0;

var Indoor_Temperature = 0.0;
var Barometric_Pressure = 0.0;
var Altitude = 0.0;

var currentWindSpeed = 0.0;
var currentWindGust = 0.0;
var currentWindDirection = 0.0;
var rainTotal = 0.0;
var windSpeedMin = 0.0;
var windSpeedMax = 0.0;
var windGustMin = 0.0;
var windGustMax = 0.0;
var currentWindDirection = 0.0;

var windDirectionMin = 0.0;
var windDirectionMax = 0.0;
var EnglishOrMetric = 0;
var SampleTimeStamp = "";
var runningStatus = " Not Connected";
var IPAddress = "";
var ourStationName = "";
var AQSQual = "";
var AQSQuan = 0;

$(document).ready( function () {
 initData();
});

   function initData()
{
$('#StationName').text( ourStationName);
if (ourStationName.length > 0)
             $('#StationName2').text("for "+ourStationName);
else
             $('#StationName2').text( ourStationName);

IPAddress = localStorage.IPAddress;
   document.getElementById("myIPAddress").value = IPAddress;
runningStatus = "Not Connected";
 $('#runningStatus').text( runningStatus);

if (IPAddress.length > 0)
{
 runningStatus = "Reading.....";
   $('#runningStatus').text( runningStatus);
 getCurrentOurWeather();
}
 }


function returnQualitativeAQS()
{
if (AQSQuan == 0)
 return "Not Present";
if (AQSQual == 0)
 return "Very High Pollution Detected";
if (AQSQual == 1)
 return "High Pollution";
if (AQSQual == 2)
 return "Medium Pollution";
if (AQSQual == 3)
 return "Low Pollution";
if (AQSQual == 4)
 return "Fresh Air";

return "Not Present";


}

   function getCurrentOurWeather() {

if (IPAddress.length == 0)
{
alert("OurWeather IP Address Not Set.  Use Setup IP Address Button Below");

}
else
{
      $.getJSON('http://'+IPAddress+'/FullDataString', function (data) {
var obj = jQuery.parseJSON(JSON.stringify(data));
runningStatus = "Connected";
$('#runningStatus').text( runningStatus);

var result = obj.FullDataString.split(",");

      EnglishOrMetric = result[15];

SampleTimeStamp = result[16];

if (result.length > 17)
ourStationName = result[17];
else
ourStationName = "";
if (result.length > 19)
{
   AQSQual = result[19];
   AQSQuan = result[18];
}
else
{
   AQSQual =  0;
   AQSQuan =  0;

}
    $('#AQSQuan').text( AQSQuan);
    $('#AQSQual').text( returnQualitativeAQS());

$('#StationName').text( ourStationName);

if (ourStationName.length > 0)
             $('#StationName2').text("for "+ourStationName);
else
             $('#StationName2').text( ourStationName);


$('#SampleTimeStamp').text( SampleTimeStamp);

      Outdoor_Temperature = Number(result[0]);

if (EnglishOrMetric == "0")
{
       Outdoor_Temperature = Outdoor_Temperature  * 1.8 + 32.0;
 $('#Outdoor_Temperature').text( Outdoor_Temperature.toFixed(2)+" F");
      }
else
{
 $('#Outdoor_Temperature').text( Outdoor_Temperature.toFixed(2)+" C");
      }
      Outdoor_Humidity = Number(result[1]);
      if (EnglishOrMetric == "0") {
 $('#Outdoor_Humidity').text( Outdoor_Humidity+" %");
}
else
{
 $('#Outdoor_Humidity').text( Outdoor_Humidity+" %");
}



      Indoor_Temperature = Number(result[2]);
if (EnglishOrMetric == "0")
{
       Indoor_Temperature = Indoor_Temperature  * 1.8 + 32.0;
 $('#Indoor_Temperature').text( Indoor_Temperature.toFixed(2)+" F");
      }
else
{
 $('#Indoor_Temperature').text( Indoor_Temperature.toFixed(2)+" C");
}

      Barometric_Pressure = Number(result[3]);
if (EnglishOrMetric == "0")
{
       Barometric_Pressure = (Barometric_Pressure  / 1000.0) * 0.29529980165
 $('#Barometric_Pressure').text( Barometric_Pressure.toFixed(2)+" in");
      }
else
{
       Barometric_Pressure = Barometric_Pressure  / 100.0;
 $('#Barometric_Pressure').text( Barometric_Pressure.toFixed(2)+" kPa");
}

      Altitude = Number(result[4]);
if (EnglishOrMetric == "0")
{
         Altitude = Altitude * 3.28084;
 $('#Altitude').text( Altitude.toFixed(2)+" ft");
      }
else
{
 $('#Altitude').text( Altitude.toFixed(2)+" m");
}


      currentWindSpeed = Number(result[5]);
if (EnglishOrMetric == "0")
{
       currentWindSpeed = currentWindSpeed * 0.62137121212121;
 $('#currentWindSpeed').text( currentWindSpeed.toFixed(2)+"  mph");
      }
else
{
 $('#currentWindSpeed').text( currentWindSpeed.toFixed(2)+" kph");
}

      currentWindGust = Number(result[6]);
if (EnglishOrMetric == "0")
{
       currentWindGust = currentWindGust * 0.62137121212121;
 $('#currentWindGust').text( currentWindGust.toFixed(2)+" mph");
      }
else
{
 $('#currentWindGust').text( currentWindGust.toFixed(2)+" kph");
}

      currentWindDirection = Number(result[7]);
$('#currentWindDirection').text( currentWindDirection+" Degrees");

      rainTotal = Number(result[8]);

if (EnglishOrMetric == "0")
{
       rainTotal = rainTotal * 0.039370079999999869902;
 $('#rainTotal').text( rainTotal.toFixed(2)+" in");
      }
else
{
 $('#rainTotal').text( rainTotal.toFixed(2)+" mm");
}

      windSpeedMin = Number(result[9]);
if (EnglishOrMetric == "0")
{
       windSpeedMin = windSpeedMin * 0.62137121212121;
 $('#windSpeedMin').text( windSpeedMin.toFixed(2)+" mph");
      }
else
{
 $('#windSpeedMin').text( windSpeedMin.toFixed(2)+" kph");
}

      windSpeedMax = Number(result[10]);
if (EnglishOrMetric == "0")
{
       windSpeedMax = windSpeedMax * 0.62137121212121;
 $('#windSpeedMax').text( windSpeedMax.toFixed(2)+" mph");
      }
else
{
 $('#windSpeedMax').text( windSpeedMax.toFixed(2)+" kph");
}

      windGustMin = Number(result[11]);
if (EnglishOrMetric == "0")
{
       windGustMin = windGustMin * 0.62137121212121;
 $('#windGustMin').text( windGustMin.toFixed(2)+" mph");
      }
else
{
 $('#windGustMin').text( windGustMin.toFixed(2)+" kph");
}

      windGustMax = Number(result[12]);
if (EnglishOrMetric == "0")
{
       windGustMax = windGustMax * 0.62137121212121;
 $('#windGustMax').text( windGustMax.toFixed(2)+" mph");
      }
else
{
 $('#windGustMax').text( windGustMax.toFixed(2)+" kph");
}


      windDirectionMin = Number(result[13]);
$('#windDirectionMin').text( windDirectionMin+" Degrees");

      windDirectionMax = Number(result[14]);
$('#windDirectionMax').text( windDirectionMax+" Degrees");

//location.reload(false);
       });
     }
}
   function setMetricUnits() {
       $.getJSON('http://'+IPAddress+'/MetricUnits', function (data) {
           alert("Metric Units Set")
 runningStatus = "Reading.....";
   $('#runningStatus').text( runningStatus);
 getCurrentOurWeather();
       });
}

   function setEnglishUnits() {
       $.getJSON('http://'+IPAddress+'/EnglishUnits', function (data) {
           alert("English Units Set")
 runningStatus = "Reading.....";
   $('#runningStatus').text( runningStatus);
 getCurrentOurWeather();
       });

   }

   function setDisplaySmall() {
       $.getJSON('http://'+IPAddress+'/WeatherSmall', function (data) {
           alert("Weather Display Set to Small")

       });

   }

   function setDisplayMedium() {
       $.getJSON('http://'+IPAddress+'/WeatherMedium', function (data) {
           alert("Weather Display Set to Medium")

       });

   }

   function setDisplayLarge() {
       $.getJSON('http://'+IPAddress+'/WeatherLarge', function (data) {
           alert("Weather Display Set to Large")
       });

   }

   function setDisplayDemo() {
       $.getJSON('http://'+IPAddress+'/WeatherDemo', function (data) {
           alert("Weather Display Set to Demo")
       });

   }

   function setIPAddress() {
IPAddress = document.getElementById("myIPAddress").value;
localStorage.IPAddress = IPAddress;
           alert("OurWeather IP Address Set to: "+IPAddress);


   }
