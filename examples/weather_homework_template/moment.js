// utility functions for to work with a single instant in time


function Moment(millis) {
  var value = millis;  // milliseconds
  var d = new Date(value);


  // current hour from 0 (midnight) through 23 (11pm)
  this.hour24 = function() {
    return d.getHours();
  }


  // the hour as a number from 1-12
  this.hour = function(value) {
    var h = this.hour24();
    h = h % 12;
    if (h === 0) {
      h = 12;
    }
    return h;
  }


  // return 'am' or 'pm' for the specified time (ante meridiem or post meridiem)
  // use toUpperCase() to make this into AM and PM
  this.meridiem = function() {
    return (this.hour24() < 12) ? 'AM' : 'PM';
  }


  // e.g. 6:43
  this.hourMinute = function() {
    return this.hour() + ':' + nf(minute(), 2);
  }


  // e.g. 6:43 pm
  this.hourMinuteLong = function() {
    return this.hourMinute() + ' ' + this.meridiem();
  }


  // e.g. 11a, 2p, 7p
  this.hourShort = function() {
    return this.hour() + this.meridiem()[0];
  }


  // the current minute
  this.minute = function() {
    return d.getMinutes();
  }


  // day of the month, 1 through 31
  this.day = function() {
    return d.getDate();
  }


  // month of the year, returns 1 through 12
  this.month = function() {
    return d.getMonth() + 1;
  }


  // name of the month, use monthName()[0] to get the first letter
  this.monthName = function() {
    return [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ][d.getMonth()];
  }


  // 1968, 2001
  this.year = function() {
    return d.getFullYear();
  }


  // returns 0-6, useful for plotting or indexing
  this.dayOfWeekIndex = function(value) {
    return d.getDay();
  }


  // e.g. Sunday, Tuesday, Friday; use dayOfWeek()[0] to get the first letter
  this.dayOfWeek = function(value) {
    return [
      'SUN', 'MON', 'TUE', 'WED',
      'THU', 'FRI', 'SAT'
    ][d.getDay()];
  }
}
