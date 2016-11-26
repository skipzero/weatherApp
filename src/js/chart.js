/*eslint no-console: ['warn', { allow: ['log', 'info', 'error'] }] */
const d3 = require('d3');

function getRain() {

  // localStorage.setItem('rainTot', 12.3);

  const margin = { top: 10, right: 10, bottom: 10, left: 10 };
  const width = 300 - margin.left - margin.right;
  const height = 300 - margin.top - margin.bottom;

  const x = d3.scaleBand().range([0, width]);
  const y = d3.scaleLinear().range([height, 0]);

  const svg = d3.select('.bar').append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
    .append('g')
      .attr('transform', `translate( ${margin.left}, ${margin.top})`);

  let rainData = localStorage.getItem('rainTot') || 0;
  // const rainInches = rainData * 0.39370;

  // const can = 'm190.526344,40.879174c-10.725157,0 -18.323585,8.405195 -23.535941,19.270506l-0.305,-15.004042c0,-7.305289 -3.207253,-13.915638 -7.166184,-13.915638l-78.816255,0c-3.955511,0 -7.166184,6.610349 -7.166184,13.915638l-0.886134,39.773489l-46.792713,-60.050681c2.208308,-8.434254 2.466213,-15.461079 0.19599,-17.979308c-3.265367,-3.618135 -10.423953,3.878433 -15.988414,16.636655c-5.564456,12.752166 -7.427504,26.072148 -4.162518,29.68968c2.502676,2.77126 7.28203,-0.96613 11.885528,-8.584376l53.259636,111.702222l-1.093141,46.731308c0,7.30468 3.207253,13.411389 7.166184,13.411389l85.979019,0c3.955511,0 7.166184,-6.106702 7.166184,-13.411389l-0.573917,-24.572708c6.722927,-13.192254 14.528358,-22.088985 22.152233,-31.067442c13.565881,-15.97683 26.375903,-30.876149 26.375903,-64.097402c0.000381,-25.498886 -11.128535,-42.447895 -27.694281,-42.447895l0.000005,-0.000006zm-3.614047,96.281704c-5.706133,6.721127 -11.833493,14.054867 -17.648251,23.247004l-1.667058,-73.451778c2.621942,-13.244311 8.869706,-32.84473 22.92898,-32.84473c12.146086,0 19.395453,10.986983 19.395453,29.406378c0.000381,26.552791 -10.155036,38.505904 -23.009124,53.643119l0,0.000006z';
  // console.info(can);

  x.domain(() => {
    return rainData;
  });

  y.domain([0, d3.max(rainData, () => { return 25; })]); // set to 25" as that's the average annual rainfall in Oakland Ca.

  svg.selectAll('.rain')
      .data(rainData)
      .enter().append('rect')
      // .attr('d', can)
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

  const div = d3.select('.dashboard')
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

    const timeFormatter = d3.timeFormat('%d.%m.%y %H:%M:%S');
    const leng = data.length;
    const jsonData = data.slice(leng - 400, leng - 1);

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
        row.display = timeFormatter(new Date(row.created));
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
          div.transition(200)
              .style('opacity', 1);
console.log('THIS...', d)
          div.html(`${d.display} \n ${d.outHum}`)
              .style('left', `${d3.event.screenX - 30}px`)
              .style('top', `${d3.event.screenY - 120}px`);
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
