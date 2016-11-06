/*eslint no-console: ['warn', { allow: ['log', 'info', 'error'] }] */
const d3 = require('d3');

function getRain() {

  const margin = { top: 0, right: 0, bottom: 0, left: 0 };
  const width = 200 - margin.left - margin.right;
  const height = 200 - margin.top - margin.bottom;

  const x = d3.scaleBand().range([0, width]);
  const y = d3.scaleLinear().range([height, 0]);

  const svg = d3.select('.bar').append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
    .append('g')
      .attr('transform', `translate( ${margin.left}, ${margin.top})`);

  let rainData = localStorage.getItem('rainTot');
  const imperialRain = rainData * 0.39370;

  // const bucket = {
  //   fill: '#000',
  //   stroke: '#fff',
  //   strokewidth: '0.50',
  //   strokemiterlimit: '10',
  // }

  const can = `m190.526344,40.879174c-10.725157,0 -18.323585,8.405195 -23.535941,19.270506l-0.305,-15.004042c0,-7.305289 -3.207253,-13.915638 -7.166184,-13.915638l-78.816255,0c-3.955511,0 -7.166184,6.610349 -7.166184,13.915638l-0.886134,39.773489l-46.792713,-60.050681c2.208308,-8.434254 2.466213,-15.461079 0.19599,-17.979308c-3.265367,-3.618135 -10.423953,3.878433 -15.988414,16.636655c-5.564456,12.752166 -7.427504,26.072148 -4.162518,29.68968c2.502676,2.77126 7.28203,-0.96613 11.885528,-8.584376l53.259636,111.702222l-1.093141,46.731308c0,7.30468 3.207253,13.411389 7.166184,13.411389l85.979019,0c3.955511,0 7.166184,-6.106702 7.166184,-13.411389l-0.573917,-24.572708c6.722927,-13.192254 14.528358,-22.088985 22.152233,-31.067442c13.565881,-15.97683 26.375903,-30.876149 26.375903,-64.097402c0.000381,-25.498886 -11.128535,-42.447895 -27.694281,-42.447895l0.000005,-0.000006zm-3.614047,96.281704c-5.706133,6.721127 -11.833493,14.054867 -17.648251,23.247004l-1.667058,-73.451778c2.621942,-13.244311 8.869706,-32.84473 22.92898,-32.84473c12.146086,0 19.395453,10.986983 19.395453,29.406378c0.000381,26.552791 -10.155036,38.505904 -23.009124,53.643119l0,0.000006z`

  const clipper = `M490.307,165.398c-28.237,0-48.242,13.885-61.965,31.834l-0.803-24.786c0-12.068-8.444-22.988-18.867-22.988H201.166
    c-10.414,0-18.867,10.92-18.867,22.988l-2.333,65.704L56.771,138.949c5.814-13.933,6.493-25.541,0.516-29.701
    c-8.597-5.977-27.444,6.407-42.094,27.483c-14.65,21.066-19.555,43.07-10.959,49.046c6.589,4.578,19.172-1.596,31.292-14.181
    l140.221,184.527l-2.878,77.198c0,12.067,8.444,22.155,18.867,22.155H418.1c10.414,0,18.867-10.088,18.867-22.155l-1.511-40.593
    c17.7-21.793,38.25-36.49,58.322-51.322c35.716-26.393,69.442-51.006,69.442-105.886
    C563.221,193.397,533.921,165.398,490.307,165.398z M480.792,324.451c-15.023,11.103-31.155,23.218-46.464,38.403l-4.389-121.339
    c6.903-21.879,23.352-54.258,60.367-54.258c31.978,0,51.064,18.15,51.064,48.578C541.371,279.699,514.634,299.445,480.792,324.451z`;

  console.log('MyRain ', typeof rainData);

  x.domain(() => {
    return rainData;
  });

  y.domain([0, d3.max(rainData, () => { return 25; })]);

  svg.selectAll('.rain')
      .data(rainData)
    .enter().append('path')
      .attr('d', can)
      .attr('class', 'rain')
      .attr('x', () => { return x(rainData); })
      .attr('width', x.bandwidth())
      .attr('y', () => { console.log('data', y(rainData)); return y(rainData); })
      .attr('height', () => { return height - y(rainData); })
      // .attr('clip-path', 'url(#clipper)');

  // svg.append('g')
  //     .attr('transform', `translate(0, ${height})`)
  //     .call(d3.axisBottom(x));

  svg.append('g')
      .call(d3.axisRight(y));
}

function drawGraph() {
  const margin = { top: 25, right: 10, bottom: 20, left: 25 };
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
