/*eslint no-console: ['warn', { allow: ['log', 'info', 'error'] }] */
const d3 = require('d3');

function getRain() {
  const margin = { top: 0, right: 0, bottom: 20, left: 20 };
  const width = 150 - margin.left - margin.right;
  const height = 200 - margin.top - margin.bottom;

  const x = d3.scaleBand().range([0, width]);
  const y = d3.scaleLinear().range([height, 0]);

  const svg = d3.select('.bar').append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
    .append('g')
      .attr('transform', `translate( ${margin.left}, ${margin.top})`);

  let rainData = localStorage.getItem('rainTot') || 0.00;
  console.log('our rain total:', rainData);

  x.domain(() => {
    return rainData;
  });

  y.domain([0, d3.max(rainData, () => { return 25; })]); // set to 25" as that's the average annual rainfall in Oakland Ca.

  svg.selectAll('.rain')
      .data(rainData)
      .enter().append('rect')
      .attr('class', 'rain')
      .attr('x', () => { return x(rainData); })
      .attr('width', x.bandwidth())
      .attr('y', () => { console.log('data', y(rainData)); return y(rainData); })
      .attr('height', () => { return height - y(rainData); });

  svg.append('g')
    .call(d3.axisRight(y));
}

function getParams () {
  let path = 'http://angerbunny.net/weather/';
  let urlParam = window.location.pathname.substring(1);

  if (urlParam.length >= 1 && typeof urlParam === 'string') {
    path = path + urlParam;
    return path;
  }
  return path;
}

function drawGraph() {
  const margin = { top: 0, right: 0, bottom: 20, left: 20 };
  const width = 900 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;
  const timeFormatter = d3.timeFormat('%d.%m.%y %H:%M:%S');

  let path = getParams();
  console.log('PATH', path);
  // set the ranges
  const x = d3.scaleTime().range([0, width]);
  const y = d3.scaleLinear().range([height, 0]);

  // define the line
  const humidity = d3.line()
    .x((d) => { return x(d.created); })
    .y((d) => { return y(d.outHum); })
    .curve(d3.curveBasis);

  const temp = d3.line()
    .x((d) => { return x(d.created); })
    .y((d) => { return y(d.outTemp); })
    .curve(d3.curveBasis);

  const div = d3.select('.chart1')
    .append('div')
      .attr('class','tip')
      .style('opacity', 0)
      .style('position', 'absolute');

  const svg = d3.selectAll('.chart1')
    .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
    .append('g')
      .attr('transform', `translate( ${margin.left}, ${margin.top})`);

  d3.json(path, (error, data) => {
    if (error) {
      console.error(`[ERROR]: ${error}`);
      throw error;
    }

    const leng = data.length;
    const jsonData = data.slice(leng - 800, leng - 1);

    //  Convert the temp to Imperial from metric...
    const imperialTemp = n => {
      return (n * 1.8 + 32).toFixed(2);
    };

    // let
    console.log('json Data///', jsonData.outTemp);
    // TODO: create obj with imperial/metric flag and add the weather json
    let imperial = true;

    // format the data & do our converstions if needed...
    jsonData.forEach((d) => {
      const row = d;
      if (imperial) {
        row.inTemp = imperialTemp(row.inTemp);
        row.outTemp = imperialTemp(row.outTemp);
      }
      row.display = timeFormatter(new Date(row.created)).split(' ');
      row.created = d3.isoParse(row.created);
    });

    // Scale the range of the data
    x.domain(d3.extent(jsonData, (d) => { return d.created; }));
    y.domain([0, 100]);

    svg.append('path')
      .data([jsonData])
        .attr('class', 'line humid')
        .attr('d', humidity);

      // Our temp for same graph.
    svg.append('path')
      .data([jsonData])
        .attr('class', 'line temp')
        .attr('d', temp);

    svg.selectAll('tempdot')  // Temp dots and tool tips
      .data(jsonData)
      .enter()
        .append('circle')
        .attr('class', 'tempdot')
        .attr('r', 2)
        .attr('cx', (d) => { return x(d.created); })
        .attr('cy', (d) => { return y(d.outTemp); })
        .on('mouseover', (d) => {
          div.transition(200)
              .style('opacity', 1);

          div.html(`<span>${d.display[0]}</span>
                    <span>${d.display[1]}</span>
                      ${parseInt(d.outTemp, 10)}°`)
              .style('left', `${d3.event.screenX - 80}px`)
              .style('top', `${d3.event.screenY - 405}px`);
        });
        // .on('mouseout', () => {
        //   div.transition(500)
        //       .style('opacity', 0);
        // });

    svg.selectAll('dot')  // Humidity dots and tool tips
      .data(jsonData)
      .enter()
        .append('circle')
        .attr('class', 'humdot')
        .attr('r', 2)
        .attr('cx', (d) => { return x(d.created); })
        .attr('cy', (d) => { return y(d.outHum); })
        .on('mouseover', (d) => {
          div.transition(200)
              .style('opacity', 1);

          div.html(`<span>${d.display[0]}</span>
                    <span>${d.display[1]}</span>
                      ${parseInt(d.outHum, 10)}%`)
              .style('left', `${d3.event.screenX - 80}px`)
              .style('top', `${d3.event.screenY - 405}px`);
        })
        .on('mouseout', () => {
          div.transition(500)
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
