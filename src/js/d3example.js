const $ = require('jquery');
// const d3 = require('d3');

function renderChart(data) {
  let json = data;
  console.log('TOP...', json)
  json.forEach(fixRow);

  const url = './sugars.csv';
  draw_graph(json);

  function draw_graph(data) {
    let results;
    let chart;
    let dots;
    let margin = 100;
    let w = 8;
    let h = 500;
    let x;
    let y;
    let width = 1100;
    let xAxis;
    let yAxis;

    $('#lab #test').remove( );
    $('#lab').append( $('#clone').clone(true).attr('id', 'test') );

    chart = d3.select( '#test' ).append( 'svg' )
      .attr( 'class', 'chart' )
      .attr( 'width', width )
      .attr( 'height', h )
      .append('g');

    d3.select('svg g')
      .attr('transform', 'translate(50, 50)');

    x = d3.time.scale()
      .domain( [data[0].time, d3.time.day.offset(data[data.length - 1].time, 1)] )
      .range( [0, width - margin] )

    y = d3.scale.linear()
      .domain(
        [0,
          d3.max(data, (d) => {
            return d.outHum;
          })
        ])
      .rangeRound([0, h - margin]);

    // safety bars
    const safeties = {
    low: 70,
    high: 140,
    x: x.range()[0],
    y: (h - margin) - y(140) + .5,
    width: (width - margin),
    height: y(140) -  y(70)  + 0.5,

    };

    const bars = chart.append('g')
      .attr('class', 'safety');

    bars.append('rect')
      .attr('class', 'out-hum')
      .attr('x', safeties.x)
      .attr('y', safeties.y)
      .attr('width', safeties.width)
      .attr('height', safeties.height);

    // Bars
    dots = chart.append('g')
      .attr('class', 'dots');

    dots.selectAll('circle')
      .data(data)
    .enter().append('circle')
      .attr('class', 'circ')
      .attr( 'cx', (d, i) => {
        return Math.ceil(x(d.time));
      })
      .attr('cy', (d) => {
        return (h - margin) - y(d.outHum) + 0.5;
      })
      .attr('r', '.5ex')
      .append('g');

    // Axis
    xAxis = d3.svg.axis()
      .scale(x)
      .ticks(12)
      .tickFormat(d3.time.format('%m/%d/%y'))
      .tickSize(10, 20, 1);

    yAxis = d3.svg.axis()
      .scale(d3.scale.linear().domain([0, d3.max(data, (d) => {
        return d.outHum || 0;
      })])
      .rangeRound([h - margin, 0]))
      .ticks(7)
      .tickSize(6, 3, 1)
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

  function fixRow(row, i) {
    const fRow = row;
    fRow.time = new Date(fRow.created);
    fRow.time = fRow.time.getTime();
    fRow.time = fRow.time;
    fRow.outHum = parseInt(fRow.outHum, 10);
    console.log('rows each', i, row.time);
  }

  function updateData(rows) {
    if (rows) {
      rows.forEach(fixRow);
      draw_graph(rows);
    }
  }
}

function weatherOnload() {
  $.get('/weather').done((data) => {
    const loadData = data;
    // loadData = loadData.map((curr) => {
    //   return curr.outHum;
    // });
    renderChart(loadData);
  });
}

$(weatherOnload);
