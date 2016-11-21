var width = 840;
var height = 500;
var outerRadius = height / 2 - 10;
var innerRadius = 120;

var svg = d3.select('body').append('svg')
  .attr('width', width)
  .attr('height', height)
  .attr('class', 'stacked-radial')
  .append('g')
  .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

d3.csv('data.csv', function(data) {
  // data preprocessing

  // turn strings into numbers
  data.forEach(function(d) {
    d.time = +d.time;
    d.value = +d.value;
  });

  // nest operator
  var nest = d3.nest()
    .key(function(d) { return d.key; });

  // stack operator
  var stack = d3.layout.stack()
    .offset('zero')  // stack from a baseline
    .values(function(d) { return d.values; })
    .x(function(d) { return d.time; })
    .y(function(d) { return d.value; });

  var layers = stack(nest.entries(data));


  // draw stacked radial area chart

  // [0, 7] -> [0, 2π]
  var angle = d3.time.scale()
    .domain([0, d3.max(data, function(d) {
      return d.time + 1;
    })])
    .range([0, 2 * Math.PI]);

  // value -> radius
  var radius = d3.scale.linear()
    .domain([0, d3.max(data, function(d) {
      return d.y0 + d.y;
    })])
    .range([innerRadius, outerRadius]);

  // ordinal scale of 20 colors
  var color = d3.scale.category20c();

  // area generator
  var area = d3.svg.area.radial()
    .interpolate('cardinal-closed')
    .angle(function(d) { return angle(d.time); })
    .innerRadius(function(d) { return radius(d.y0); })
    .outerRadius(function(d) { return radius(d.y0 + d.y); });

  svg.selectAll('.layer')
    .data(layers)
    .enter().append('path')
      .attr('class', 'layer')
      .attr('d', function(d) { return area(d.values); })
      .style('fill', function(d, i) { return color(i); });


  // draw axes

  // date -> weekday name
  var formatDate = d3.time.format('%a');
  // day -> weekday name
  var formatDay = function(d) {
    return formatDate(new Date(2007, 0, d));
  };

  svg.selectAll('.axis')
    .data(d3.range(
      d3.max(data, function(d) { return d.time; }) -
      d3.min(data, function(d) { return d.time; }) + 1))
    .enter().append('g')
      .attr('class', 'axis')
      .attr('transform', function(d) {
        return 'rotate(' + angle(d) * 180 / Math.PI + ')';
      })
      .call(d3.svg.axis()
        .scale(radius.copy().range([-innerRadius, -outerRadius]))
        .orient('left'))
      .append('text')  // weekdays
        .attr('y', -innerRadius + 6)
        .attr('dy', '.71em')
        .attr('text-anchor', 'middle')
        .text(function(d) { return formatDay(d); });


  // interaction

  var selected = [];  // ui state
  layers.forEach(function() { selected.push(false); });  // initialize state

  // add mouse click listener
  svg.selectAll('.layer')
    .on('click', function(d, i) {
      selected[i] = !selected[i];
      render();
    });

  // render current state
  var render = function() {
    svg.selectAll('.layer')
      .transition()
        .style('fill', function(d, i) {
          if (d3.max(selected)) {
            // something is selected
            return selected[i] ? color(i) : '#eee';
          }
          // nothing is selected
          return color(i);

        });
  };
});

console.log('Fired from chart #2... oops.')
