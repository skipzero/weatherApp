import $ from 'jquery';
debugger;
'use strict';
console.log('main.js');
$(weatherOnload);

function weatherOnload () {
  console.log('weatherOnload...');
  $.get('/weather')
    .done((data) => {
      console.log('DATA RETREIVED!!', data);
      renderChart(data);
    });

  data = JSON.parse(data);
  data = data.map((curr, i) => {
    console.log('Map', curr, i);
    return curr.outTemp;
  });
  console.log('d3', data);
  renderChart(data);
};


function renderChart(data) {
  var width = 420,
      barHeight = 20;

  var x = d3.scaleLinear()
      .domain([0, d3.max(data)])
      .range([0, width]);

  var chart = d3.select(".chart")
      .attr("width", width)
      .attr("height", barHeight * data.length);

  var bar = chart.selectAll("g")
      .data(data)
    .enter().append("g")
      .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });

  bar.append("rect")
      .attr("width", x)
      .attr("height", barHeight - 1);

  bar.append("text")
      .attr("x", function(d) { return x(d) - 3; })
      .attr("y", barHeight / 2)
      .attr("dy", ".35em")
      .text((d) => { return d; });
};
