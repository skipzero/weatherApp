/*eslint no-console: ['warn', { allow: ['log', 'info', 'error'] }] */
const d3 = require('d3');

function getRain() {

  const margin = { top: 0, right: 0, bottom: 0, left: 0 };
  const width = 550 - margin.left - margin.right;
  const height = 550 - margin.top - margin.bottom;

  const x = d3.scaleBand().range([0, width]);
  const y = d3.scaleLinear().range([height, 0]);

  const svg = d3.select('.bar').append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
    .append('g')
      .attr('transform', `translate( ${margin.left}, ${margin.top})`);

  let rainData = localStorage.getItem('rainTot');
  const rainInches = rainData * 0.39370;

  // const bucket = {
  //   fill: '#000',
  //   stroke: '#fff',
  //   strokewidth: '0.50',
  //   strokemiterlimit: '10',
  // }

  x.domain(() => {
    return rainInches;
  });

  y.domain([0, d3.max(rainData, () => { return 25; })]);

  svg.selectAll('.rain')
      .data(rainData)
<<<<<<< Updated upstream
      .append('path')
      .attr('d', can)
=======
    .enter().append('rect')
>>>>>>> Stashed changes
      .attr('class', 'rain')
      .attr('x', () => { return x(rainData); })
      .attr('width', x.bandwidth())
      .attr('y', () => { console.log('data', y(rainData)); return y(rainData); })
      .attr('height', () => { return height - y(rainData); });
      // .attr('clip-path', 'url(#clipper)');

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
    .curve(d3.curveBasis);

<<<<<<< Updated upstream
  const div = d3.select('.chart1')
    .append('div')
      .attr('class','tip')
          .style('opacity', 0);
=======
  // const tooltip = d3.select('div.weather-app')
  //   .append('div')
  //     .attr('tip')
  //     .x((d) => { return x(d.created); })
  //     .y((d) => { return y(d.inTemp); });
>>>>>>> Stashed changes

  const svg = d3.selectAll('.chart1')
    .append('svg')
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
          div.transition(500)
              .style('opacity', 1);

          div.html(`${d.created} \n ${d.outHum}`)
              .style('left', `${d3.event.pageX}px`)
              .style('top', `${d3.event.pageY}px`);
        })
        .on('mouseout', (d) => {
          div.transition()
              .duration(500)
              .style('opacity', 0);
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
