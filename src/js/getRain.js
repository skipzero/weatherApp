/* eslint no-console: ['warn', { allow: ['info', 'error'] }] */
//**  getRain  **//
import * as d3 from 'd3';

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

  let rainTotal = localStorage.getItem('rain');
  rainTotal = JSON.parse(rainTotal).totalrainin;
  // rainData = rainData * 0.039370;
  x.domain(() => {
    return rainData;
  });

  y.domain([0, d3.max(rainData, () => {
    return 25;  // set to 25" as that's the average annual rainfall in Oakland Ca.
  })]);

  svg.selectAll('.rain')
    .data(rainData)
    .enter().append('rect')
    .attr('class', 'rain')
    .attr('x', () => { return x(rainData); })
    .attr('width', x.bandwidth())
    .attr('y', () => { return y(rainData); })
    .attr('height', () => { return height - y(rainData); });

  svg.append('g')
    .call(d3.axisRight(y));
}

getRain();
