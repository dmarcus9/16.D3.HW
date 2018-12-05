//    .eslintrc.json is hidden file…why?  Does what?  should not be there.  

// @TODO: YOUR CODE HERE!  ...questions
// state abbrev. in circles?
// text from index.html?
// see other ?s in 16.notes

// You need to create a scatter plot between two of the data variables such as 
// Lacks Healthcare (%) as a function of In Poverty (%)    or `Smokers vs. Age`.

// https://factfinder.census.gov/faces/nav/jsf/pages/searchresults.xhtml is source of data

//   Step 1:   Set up our chart
var svgWidth = 960;
var svgHeight = 500;
// why these #s above? l & w of graph in pixels       OR...
// // SVG wrapper dimensions are determined by the current width & height of the browser window.
// good if you only had 1 chart to show...if you have accompanying info, not so much.
      // var svgWidth = window.innerWidth;
      // var svgHeight = window.innerHeight; 

var margin = {
    top: 20,
    right: 40,
    bottom: 60,
    left: 100};
// for scales of axes
var height = svgHeight - margin.top - margin.bottom;
var width = svgWidth - margin.left - margin.right;

//   Step 2:   Create an SVG wrapper ,
// append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

//   Step 3:    Import data 
//  pull in the data from `data.csv` by using the `d3.csv` function. 
var file = "assets/data/data.csv"
d3.csv(file).then(successHandle, errorHandle);

function errorHandle(error){
  throw error;} 

function successHandle(data) {

//   Step 4:   Parse the data...   
// // NOT NEEDED  Create a function to parse date and time...  var parseTime = d3.timeParse("%d-%b");
// Format the data...convert to numerical values
    data.forEach(function(data) {
        data.poverty = +data.poverty;
        data.healthcare = +data.healthcare; });

  //   Step 5:   Create the scales for the chart
// domain is actual axes vs. range is where pts are graphed
    var xLinearScale = d3.scaleLinear()
        .domain([7, d3.max(data, d => d.poverty)])
        .range([0, width]);

    var yLinearScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.healthcare)])
        .range([height, 0]);

  // Step 6: Create axis functions
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);
  
  // Step 7: Append Axes to the chart
  chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  chartGroup.append("g")
    .call(leftAxis);

// scatter plot represents each state with circle elements...Step 8: Create Circles
   var circlesGroup = chartGroup.selectAll("circle")
   .data(data)
   .enter();

   circlesGroup
   .append("circle")
   .attr("cx", d => xLinearScale(d.poverty))
   .attr("cy", d => yLinearScale(d.healthcare)) 
   .attr("r", "15")
   .attr("fill", "blue")
   .attr("opacity", ".5")

// Include state abbreviations in the circles... ???  TODO ?
    circlesGroup.append("text") 
   .text(d => d.abbr)
   .attr("dx", d => xLinearScale(d.poverty)-10)
   .attr("dy", d => yLinearScale(d.healthcare)+5); 

// Step 9: Create and situate your axes and labels to the left and bottom of the chart.
  chartGroup.append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
    .attr("class", "axisText")
    .text("In Poverty (%)");

  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 40)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .attr("class", "axisText")
    .text("Healthcare (%)");}

//  Note: You'll need to use `python -m http-server 8000` to run the visualization. 
// This will host the page at `localhost:8000` in your web browser.
// this is addressed when I load in csv with proper path
