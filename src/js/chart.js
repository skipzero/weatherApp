/*eslint no-console: ['warn', { allow: ['info', 'error'] }] */
import * as d3 from 'd3';

const extractRain = (row) => {
  const rainKeys = Object.keys(row);
  return rainKeys.reduce((acc, key) => {
    if (key.includes('rain')) {
      acc[key] = row[key];
    }
    return acc;
  }, {});
}

function drawGraph() {
  const margin = { top: 0, right: 0, bottom: 20, left: 20 };
  const width = 900 - margin.left - margin.right;
  const height = 450 - margin.top - margin.bottom;
  const timeFormatter = d3.timeFormat('%d.%m.%y %H:%M:%S');

  let path = getParams();
  // set the ranges
  const x = d3.scaleTime().range([0, width]);
  const y = d3.scaleLinear().range([height, 0]);

  // define the line
  const humidity = d3.line()
    .x((d) => { return x(d.date); })
    .y((d) => { return y(d.humidity); })
    .curve(d3.curveBasis);

  const temp = d3.line()
    .x((d) => { return x(d.date); })
    .y((d) => { return y(d.tempf); })
    .curve(d3.curveBasis);

  // Tooltips
  const div = d3.select('.chart1')
    .append('div')
    .attr('class', 'tip')
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
      console.error(`[ERROR-path]: ${error}`);
      throw error;
    }

    const leng = data.result.length;
    const jsonData = data.result.reduce((acc, curr) => {
      if (curr.id % 10 === 0) {
        console.log(curr);
        acc.push(curr);
      }
      // console.log('ACC::', acc)
      return acc;
    }, []);

    // format the data & do our converstions if needed...
    jsonData.forEach((d) => {
      const row = d;
      row.display = timeFormatter(new Date(row.date)).split(' ');
      row.date = d3.isoParse(row.date);
      localStorage.setItem('rain', JSON.stringify(extractRain(row)));
    });

    const currWind = jsonData[0].windspeedmph;

    // Scale the range of the data
    // x.domain(d3.extent(jsonData, (d) => { return d.date; }));
    // y.domain([0, 100]);

    // const clip = d3.append('defs')
    //   .append('svg:clipPath')
    //   .attr('id', 'clip')
    //   .append('svg:rect')
    //   .attr('width', width)
    //   .attr('height', height)
    //   .attr('x', 0)
    //   .attr('y', 0);
    //
    // const brush = d3.brush()
    //   .extent([[0,0], [width, height]])
    //   .on('end', updateChart);

    const scatter = svg.append('g')
      .attr('clip-path', 'url(#clip)');

    const x = d3.scaleLinear()
      .domain([0, 200])
      .range([0, width]);
    const y = d3.scaleLinear()
      .domain([0, 200])
      .range([height, 0]);

    svg.append('path')
      .data([jsonData])
      .attr('class', 'line humid')
      .attr('d', humidity);

    // Our temp for same graph.
    svg.append('path')
      .data([jsonData])
      .attr('class', 'line temp')
      .attr('d', temp);

    scatter
      .selectAll('tempdot')  // Temp dots and tool tips
      .data(jsonData)
      .enter()
      .append('circle')
      .attr('class', 'tempdot')
      .attr('r', 2)
      .attr('cx', (d) => { return x(d.date); })
      .attr('cy', (d) => { return y(d.tempf); })
      .on('mouseover', (d) => {
        div.transition(200)
          .style('opacity', 1);

        div.html(`<span>${d.display[0]}</span>
                        <span>${d.display[1]}</span>
                          ${parseInt(d.tempf, 10)}°`)
          .style('left', `${d3.event.screenX - 60}px`)
          .style('top', `${d3.event.screenY - 390}px`);
      });
    // .on('mouseout', () => {
    //   div.transition(500)
    //       .style('opacity', 0);
    // });
    /****
    *
    * Humidity dots and tool tips
    *
    ****/
    scatter
      .selectAll('dot')
      .data(jsonData)
      .enter()
      .append('circle')
      .attr('class', 'humdot')
      .attr('r', 2)
      .attr('cx', (d) => { return x(d.date); })
      .attr('cy', (d) => { return y(d.humidity); })
      .on('mouseover', (d) => {
        div.transition(200)
          .style('opacity', 1);

        div.html(`<span>${d.display[0]}</span>
                    <span>${d.display[1]}</span>
                      ${parseInt(d.humidity, 10)}%`)
          .style('left', `${d3.event.screenX - 80}px`)
          .style('top', `${d3.event.screenY - 405}px`);
      })
      .on('mouseout', () => {
        div.transition(500)
          .style('opacity', 0);
      });

    // scatter.append('g')
    //   .attr('class', 'brush')
    //   .call(brush);

    scatter
      .append('g')
      .attr('transform', `translate(0, ${height} )`)
      .call(d3.axisBottom(x));

    svg.append('g')
      .call(d3.axisLeft(y));

    svg.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0 - margin.left)
      .attr('x', 0 - (height / 2))
      .attr('dy', '0.8em')
      .style('text-anchor', 'middle');
    // .text('Humidity');
  });
}

function getParams() {
  let path = 'weather/';
  let urlParam = window.location.pathname.substring(1);
  if (urlParam.length >= 1 && typeof urlParam === 'string') {
    path = path + urlParam;
    return path;
  }
  return path;
}

drawGraph();
