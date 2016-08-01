const $ = require('jquery');
// const d3 = require('d3');

function drawGraph(data) {
  const margin = {top: 100, right: 100, bottom: 0, left: 0, }
  const height = 700 - margin.top - margin.bottom;
  const width = 1100 - margin.left - margin.right;

  function chartHeight (h) {
    return h - margin.top - margin.bottom;
  };

  function chartWidth (w) {
    return w - margin.left - margin.right;
  }

  const chart = d3.select('#test')
  .append('svg')
    .attr('class', 'chart')
    .attr('width', width)
    .attr('height', height)
  .append('g');

  d3.select('svg g')
    .attr('transform', 'translate(50, 50)');

  const x = d3.time.scale()
  .domain([data[0].time, d3.time.day.offset(data[data.length - 1].time, 1)])
  .range([0, chartWidth(width)]);

  const y = d3.scale.linear()
  .domain([0, d3.max(data, (d) => { return d.outHum; }),])
  .rangeRound([0, height]);

  // safety bars
  // const limits = {
  //   high: 140,
  //   x: x.range()[0],
  //   y: height - y(140) + 0.5,
  //   width: width,
  //   height: y(140) - y(70) + 0.5,
  // };

  // Bars
  const dots = chart
  .append('g')
  .attr('class', 'dots');

  dots.selectAll('circle')
    .data(data)
    .enter()
  .append('circle')
    .attr('class', 'circ')
    .attr('r', '0.4ex')
    .attr('cx', (d) => {
      return x(d.time);
    })
    .attr('cy', (d) => {
      return height - y(d.outHum) + 0.5;
    })
    .on('mouseover', (e) => {
      console.log('mouse over ', e)
    })
  ;

  const tooltip = chart.selectAll('circle')
  .append('div')
    .attr('class', 'tooltip')
    .attr('left', '0' //(d) => {
      // return x(d.time);}
    )
    .attr('top', '0' //(d) => {
      // return (height - margin.top - margin.bottom) - y(d.outHum) + 0.5;}
    );

  console.log('TOOLTIP===', tooltip)

  // Axis
  const xAxis = d3.svg.axis()
  .scale(x)
  .ticks(12)
  .tickFormat(d3.time.format('%m.%d.%y'))
  .tickSize(10, 20, 1)
  .orient('bottom');


  const yAxis = d3.svg.axis()
  .scale(d3.scale.linear().domain([0, d3.max(data, (d) => {
    return d.outHum || 0;
  })])
  .rangeRound([height, 0]))
  .ticks(7)
  .tickSize(6, 10, 1)
  .orient('left');
  // .orient('right');

  chart.append('g')
  .attr('class', 'x axis')
  .attr('transform', `translate(0, ${height})`)
  .call(xAxis);

  chart.append('g')
  .attr('class', 'y axis')
  // .attr('transform', 'translate(' + x.range()[1] + ')')
  .call(yAxis);
}

function fixRow(row) {
  const fRow = row;
  fRow.time = new Date(fRow.created);
  fRow.time = fRow.time.getTime();
  // fRow.time = fRow.time / 1000;
  fRow.outHum = parseInt(fRow.outHum, 10);
  console.log('fixRow', fRow.time)
  return fRow;
}

function weatherOnload() {
  $.get('/weather').done((data) => {
  let loadData = data;
  console.log('TOP...', loadData);

  loadData = loadData.map(fixRow);
  drawGraph(loadData);
  });
}

$(weatherOnload);
