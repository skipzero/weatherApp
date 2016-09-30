/*eslint no-console: ['warn', { allow: ['log', 'info', 'error'] }] */

const d3 = require('d3');
// const debug = ;
function drawGraph() {
  const margin = { top: 20, right: 20, bottom: 30, left: 50 };
  const width = 900 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  const path = 'http://angerbunny.net/weather';

  // set the ranges
  const x = d3.scaleTime().range([0, width]);
  const y = d3.scaleLinear().range([height, 0]);

  // define the line
  const humidity = d3.line()
    .x((d) => { return x(d.created); })
    .y((d) => { return y(d.outHum); })
    .curve(d3.curveMonotoneX);

  const temp = d3.line()
    .x((d) => { return x(d.created); })
    .y((d) => { return y(d.inTemp); })
    .curve(d3.curveCatmullRom);

  const svg = d3.selectAll('.chartHumid').append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
    .append('g')
      .attr('transform', `translate( ${margin.left}, ${margin.top})`);

  d3.json(path, (error, data) => {
    if (error) {
      throw error;
    }
    // const leng = data.length;

    window.myData = data;
    const jsonData = data; //.slice(leng - 600, leng - 1);

      // format the data
    jsonData.forEach((d) => {
      const row = d;
      row.created = d3.isoParse(row.created);
    });

    // Scale the range of the data
    x.domain(d3.extent(jsonData, (d) => { return d.created; }));
    y.domain([0, d3.max(jsonData, (d) => { return d.outHum; })]);

    svg.append('path')
      .data([jsonData])
      .attr('class', 'line humid')
      .attr('d', humidity);

      // Our temp for same graph.
    svg.append('path')
      .data([jsonData])
      .attr('class', 'line temp')
      .attr('d', temp);


    svg.selectAll('dot')
        .data(jsonData)
      .enter()
        .append('circle')
        .attr('r', 2)
        .attr('cx', (d) => { return x(d.created); })
        .attr('cy', (d) => { return y(d.outHum); });

    svg.append('g')
        .attr('transform', `translate(0, ${height} )`)
        .call(d3.axisBottom(x)
          .ticks(8));

    svg.append('g')
        .call(d3.axisLeft(y)
          .ticks(10));

    svg.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0 - margin.left)
      .attr('x', 0 - (height / 2))
      .attr('dy', '0.8em')
      .style('text-anchor', 'middle')
      .text('Humidity');
  });
}

drawGraph();
