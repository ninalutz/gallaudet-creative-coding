"use strict";


// This wraps weather API calls (or loading from a file)
// Scroll down to line ~50 where it says "This is the useful part" for more.

function requestWeather() {
  var args = arguments;
  
  function Weather() {
    this.ready = false;
    this.data = null;
    var self = this;
    
    var loadCallback = function(data) {
      //console.log('got load');
      self.data = data;  // keep a copy of the original
      
      self.currently = data.currently;
      self.minutely = data.minutely;
      self.hourly = data.hourly; 
      self.daily = data.daily;
      self.flags = data.flags;  // not really needed

      self.ready = true;      
    }
    
    var errorCallback = function(response) {
      console.log('Error while trying to retrieve the weather:');
      console.log(response);
    }

    if (args.length === 1) {
      //console.log(loadJSON);
      loadJSON(args[0], loadCallback, errorCallback);
      
    } else if (args.length === 3) {
      var lat = args[0];
      var lon = args[1];
      var apiKey = args[2];
      var url = "https://api.forecast.io/forecast/" + apiKey + "/" + lat + "," + lon;
      console.log('Loading weather from ' + url);
      loadJSON(url, loadCallback, "jsonp");
    
    } else {
      console.log(arguments);
      console.log('Use requestWeather(filename) or requestWeather(lat, lon, apiKey)');
    }   


    // . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

    // This is the useful section of this code. It wraps parts of the Dark Sky API
    // for easier user. Read more about the API here: https://darksky.net/dev/docs
    // or more details about the data returned: https://darksky.net/dev/docs/response
    
    // These functions wrap what's available in the API, but advanced users who
    // understand how JSON objects work can access the information directly, i.e.:
    // 
    // w = requestWeather();
    // if (w.ready) {
    //   console.log(w.data);  // print the JSON object as returned by the API
    //   conosole.log(w.hourly);  // same as w.data.hourly, but here as a convenience
    // }
    
    // time using the 'instant' class for easier handling 
    this.getTime = function(range) {
      if (range) {
        // get array of times as seconds
        var sec = gatherRange(range, 'time');
        var outgoing = [ ];
        for (var i = 0; i < sec.length; i++) {
          // create each instant by multiplying seconds from the api to millis expected by Date()
          outgoing.push(new Moment(sec[i] * 1000));
        }
        return outgoing;
      } 
      return new Moment(this.currently.time * 1000);
    }

    
    // time in seconds, as returned from the api
    this.getTimeSeconds = function(range) {
      return range ? gatherRange(range, 'time') : this.currently.time;
    }

        
    // short summary of the weather
    this.getSummary = function(range) {
      print(this.currently.summary);
      return range ? gatherRange(range, 'summary') : this.currently.summary;
    }


    // gets an icon name for the current weather
    this.getIcon = function(range) {
      return range ? gatherRange(range, 'icon') : this.currently.icon;
    }
    
        
    // only current... does not work for minutes, hours, days
    this.getNearestStormDistance = function() {
      return this.currently.nearestStormDistance;
    }
      
      
    // only current... does not work for minutes, hours, days
    this.getNearestStormBearing = function() {
      return this.currently.nearestStormBearing;
    }


    // amount of precipitation (in inches)
    this.getPrecipIntensity = function(range) {
      return range ? gatherRange(range, 'precipIntensity') : this.currently.precipIntensity;
    }
    
    
    // percent chance of precipitation (0..1) 
    this.getPrecipProbability = function(range) {
      return range ? gatherRange(range, 'precipProbability') : this.currently.precipProbability;
    }
    
    
    // you can guess what this does
    this.getTemperature = function(range) {
      return range ? gatherRange(range, 'temperature') : this.currently.temperature;
    }
    
        this.getTemperatureMin = function(range) {
      return range ? gatherRange(range, 'temperatureMin') : this.currently.temperature;
    }
    
            this.getTemperatureMax = function(range) {
      return range ? gatherRange(range, 'temperatureMax') : this.currently.temperature;
    }
    
    
    
    // what the temperature feels like
    this.getApparentTemperature = function(range) {
      return range ? gatherRange(range, 'apparentTemperature') : this.currently.apparentTemperature;
    }
    
    
    // returns humidity percentage as number (0..1)
    this.getHumidity = function(range) {
      return range ? gatherRange(range, 'humidity') : this.currently.humidity;
    }
    
    
    // wind speed in miles per hour
    this.getWindSpeed = function(range) {
      return range ? gatherRange(range, 'windSpeed') : this.currently.windSpeed;
    }
    
    
    // wind direction in degrees (0..359), but only if getWindSpeed() is not 0 
    this.getWindBearing = function(range) {
      return range ? gatherRange(range, 'windBearing') : this.currently.windBearing;
    }
    
    
    // percent of sky covered by clouds (0..1)
    this.getCloudCover = function(range) {
      return range ? gatherRange(range, 'cloudCover') : this.currently.cloudCover;
    }
    
    
    // sea level air pressure in millibars
    this.getPressure = function(range) {
      return range ? gatherRange(range, 'pressure') : this.currently.pressure;
    }
    
    
    // "The columnar density of total atmospheric ozone...in Dobson units"
    this.getOzone = function(range) {
      return range ? gatherRange(range, 'ozone') : this.currently.ozone;
    }
    
    
    // . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
    
    // Internal functions, you can safely ignore these
    
    
    function gatherRange(range, name) {
      if (range === 'hourly') {
        return gatherField(name, self.hourly.data);
      } else if (range === 'daily') {
        return gatherField(name, self.daily.data);
      } else {
        throw TypeError("Use 'daily', 'hourly', or 'minutely'");
      }
    }

    function gatherField(name, array) {
      var outgoing = [ ];
      var len = array.length;
      for (var i = 0; i < len; i++) {
        outgoing.push(array[i][name]);
      }
      return outgoing;
    }
  }
  return new Weather();
}