/*eslint no-console: ['warn', { allow: ['log', 'info', 'error'] }] */
const d3 = require('d3');

function getRain() {

  const margin = { top: 10, right: 40, bottom: 20, left: 10 };
  const width = 250 - margin.left - margin.right;
  const height = 250 - margin.top - margin.bottom;

  const x = d3.scaleBand().range([0, width]);
  const y = d3.scaleLinear().range([height, 0]);

  const svg = d3.select('.bar').append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
    .append('g')
      .attr('transform', `translate( ${margin.left}, ${margin.top})`);

  const rainData = localStorage.getItem('rainTot');
  const imperialRain = rainData * 0.39370;

  console.log('MyRain ', imperialRain);

  x.domain(() => {
    return rainData;
  });

  y.domain([0, d3.max(rainData, d => { return 25; })]);

  svg.selectAll('.rain')
      .data(rainData)
    .enter().append('rect')
      .attr('class', 'rain')
      .attr('x', d => { return x(d); })
      .attr('width', x.bandwidth())
      .attr('y', d => { return y(d); })
      .attr('height', d => { return height - y(d); });

  // svg.append('g')
  //     .attr('transform', `translate(0, ${height})`)
  //     .call(d3.axisBottom(x));

  svg.append('g')
      .call(d3.axisRight(y));
}

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

  // const tooltip = d3.select('div.weather-app')
  //   .append('div')
  //     .attr('tip')

  const svg = d3.selectAll('.chartHumid').append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
    .append('g')
      .attr('transform', `translate( ${margin.left}, ${margin.top})`);

  d3.json(path, (error, data) => {
    if (error) {
      throw error;
    }
    const leng = data.length;
    // tooltip('tip');

    window.myData = data;
    const jsonData = data.slice(leng - 200, leng - 1);

    // weatherData.engMetric = 1;
    //  Convert the temp to Imperial from metric...
    const imperialTemp = n => {
      return (n * 1.8 + 32).toFixed(2);
    };

    // TODO: create obj with imperial/metric flag and add the weather json
    let imperial = true;
    // format the data & do our converstions if needed...
    jsonData.forEach((d) => {
      const row = d;
      if (imperial) {
        row.inTemp = imperialTemp(row.inTemp);
        row.outTemp = imperialTemp(row.outTemp);
        row.created = d3.isoParse(row.created);
      }
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
        .attr('cy', (d) => { return y(d.outHum); })
        .on('mouseover', (d) => {
          console.log('Da', d);
        });

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
      .style('text-anchor', 'middle');
      // .text('Humidity');
  });
}

drawGraph();
getRain();
