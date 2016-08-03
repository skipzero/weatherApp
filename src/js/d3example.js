const $ = require('jquery');
const d3 = require('d3');

function drawGraph(data) {
  let chartData = data;

  const margin = { top: 30, right: 20, bottom: 30, left: 50 };
  const height = 700 - margin.top - margin.bottom;
  const width = 1100 - margin.left - margin.right;

  const parseTime = d3.timeParse('%m.%d.%y');

  const x = d3.scaleTime().range([0, width]);
  const y = d3.scaleLinear().rangeRound([height, 0]);

  const humLine = d3.line()
      .x(d => { return x(d.time); })
      .y(d => { return y(d.outHum); });

  const svg = d3.select('body').append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
    .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

  // d3.json('http://10.0.0.35/FullDataString', (err, json) => {
  //   console.log('got data from statyion...', json)
  //   chartData = json;
  // });

  x.domain(d3.extent(chartData, (d) => { return d.time; }));
  x.domain([0, d3.max(chartData, (d) => { return d.outHum; })]);

  svg.append('path')
      .data([chartData])
      .attr('class', 'line')
      .attr('d', humLine);

  // svg.selectAll('dot')
  //     .data(chartData)
  //   .enter()
  //   .append('circle')
  //     .attr('r', 5)
  //     .attr('cx', (d) => { return x(d.time); })
  //     .attr('cy', (d) => { return y(d.outHum); })
  //     .on('mouseover', (d) => {
  //       console.log('DDDDDD mousr', d);
  //     });

  svg.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(x));

  svg.append('g')
      .call(d3.axisleft(y));

  svg.append('text')
      .attr('transform', `translate((${width} + 3), ${y(data[0].outHum)})`)
      .attr('dy', '.35em')
      .attr('text-anchor', 'start')
      .style('fill', 'red')
      .text('Open');

  svg.append('text')
      .attr('transform', `translate((${width} + 3), ${y(data[0].outHum)})`)
      .attr('dy', '.35em')
      .attr('text-anchor', 'start')
      .style('fill', 'steelblue')
      .text('Close');

  const chart = d3.select('#test')
  .append('svg')
    .attr('class', 'chart')
    .attr('width', width)
    .attr('height', height)
  .append('g');

  d3.select('svg g')
    .attr('transform', 'translate(50, 50)');

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
      console.log('mouse over ', e);
    })
  ;

  const tooltip = chart.selectAll('circle')
  .append('div')
    .attr('class', 'tooltip')
    .attr('left', (d) => {
      return x(d.time);
    })
    .attr('top', (d) => {
      return chartHeight(height) - y(d.outHum) + 0.5;
    });

  console.log('TOOLTIP===', tooltip);

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
  .attr('transform', `translate( ${x.range()[1]} )`)
  .call(yAxis);
}

function fixRow(row) {
  const fRow = row;
  fRow.time = new Date(fRow.created);
  fRow.time = fRow.time.getTime();
  // fRow.time = drawGraph().parseTime(fRow.time);
  fRow.outHum = parseInt(fRow.outHum, 10);
  console.log('fixRow', fRow.time);
  return fRow;
}

function weatherOnload() {
  $.get('/weather').done((data) => {
    let loadData = data;
    console.log('TOP...', loadData);

    console.log('This is my onLoad',loadData.map(fixRow))
    drawGraph(loadData);
  });
}

$(weatherOnload);
