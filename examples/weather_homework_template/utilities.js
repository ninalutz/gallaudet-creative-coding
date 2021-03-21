// a handful of utility functions


// round the number and add the degree symbol to the end 
function formatDegrees(amount) {
  // the degree symbol, or \u00B0
  return round(amount) + '°';  
}


// take a number from 0..1 and format it as a percentage (no decimal points)
function formatPercent(amount) {
  return round(amount * 100) + "%";
}


// round down by 10s, e.g. anything from 31 through 39 becomes 30  
function roundDown(value) {
  var r = value % 10;
  return value - r;
}


// round a number up to the next 10, e.g. anything from 61 to 69 becomes 70 
function roundUp(value) {
  var r = value % 10;
  return value + (10 - r);
}