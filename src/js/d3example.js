import $ from 'jquery';
import d3 from 'd3';

console.log('main.js');

function renderChart(data) {
  const width = 420;
  const barHeight = 20;

  const x = d3.scaleLinear()
    .domain([0, d3.max(data)])
    .range([0, width]);

  const chart = d3.select('.chart')
    .attr('width', width)
    .attr('height', barHeight * data.length);

  const bar = chart.selectAll('g')
    .data(data)
    .enter()
    .append('g')
    .attr('transform', (d, i) => {
      const translate = 'translate(0, ' + (i * barHeight) + ')';
      return translate;
    });

  bar.append('rect')
    .attr('width', x)
    .attr('height', barHeight - 1);

  bar.append('text')
    .attr('x', (d) => { return x(d) - 3; })
    .attr('y', barHeight / 2)
    .attr('dy', '.35em')
    .text((d) => { return d; });
}

function weatherOnload() {
  console.log('weatherOnload...');
  $.get('/weather')
    .done((data) => {
      let loadData = data;
      loadData = loadData.map((curr, i) => {
        console.log('Map', curr, i);
        return curr.outTemp;
      });

      console.log('d3', loadData);
      renderChart(loadData);
    });
}

$(weatherOnload);
