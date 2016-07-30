const $ = require('jquery');
// const d3 = require('d3');

function drawGraph(data) {
  const margin = 100;
  const h = 700;
  const width = 1100;

  const chart = d3.select('#test').append('svg')
    .attr('class', 'chart')
    .attr('width', width)
    .attr('height', h)
    .append('g');

  d3.select('svg g')
    .attr('transform', 'translate(50, 50)');

  const x = d3.time.scale()
    .domain([data[0].time, d3.time.day.offset(data[data.length - 1].time, 1)])
    .range([0, width - margin]);

  const y = d3.scale.linear()
    .domain(
      [0,
        d3.max(data, (d) => {
          return d.outHum;
        }),
      ])
    .rangeRound([0, h - margin]);

  // safety bars
  const limits = {
    high: 140,
    x: x.range()[0],
    y: (h - margin) - y(140) + 0.5,
    width: (width - margin),
    height: y(140) - y(70) + 0.5,
  };

  // Bars
  const dots = chart
  .append('g')
    .attr('class', 'dots');

  dots.selectAll('circle')
    .data(data)
  .enter()
  .append('circle')
    .attr('class', 'circ')
    .attr('cx', (d) => {
      return Math.ceil(x(d.time));
    })
    .attr('cy', (d) => {
      return (h - margin) - y(d.outHum) + 0.5;
    })
    .attr('r', '0.5ex')
    .append('g');

  const tooltip = d3.svg

  // Axis
  const xAxis = d3.svg.axis()
    .scale(x)
    .ticks(12)
    .tickFormat(d3.time.format('%m.%d.%y'))
    .tickSize(10, 20, 1);

  const yAxis = d3.svg.axis()
    .scale(d3.scale.linear().domain([0, d3.max(data, (d) => {
      return d.outHum || 0;
    })])
    .rangeRound([h - margin, 0]))
    .ticks(7)
    .tickSize(6, 10, 1)
    .orient('left');
    // .orient('right');

  chart.append('g')
    .attr('class', 'x axis')
    .attr('transform', `translate(0, ${h - margin})`)
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
  fRow.time = fRow.time;
  fRow.outHum = parseInt(fRow.outHum, 10);
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
