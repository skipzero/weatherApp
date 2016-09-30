## [Real Time D3 Charts](https://rluta.github.io/d3-realtime/)

//  CHART update code

    function update(objectArray) {
      let duration = this.options('transition');
      let height = this.height()-1;
      let x = this.options('x');
      let y = this.options('y');

      xScale.domain(objectArray.map(x));
      yScale.domain([0, d3.max(objectArray, y)]);

      axisX.call(xAxisFn);
      axisY.call(yAxisFn);

      let selectedData = svg.selectAll('.bar').data(objectArray, x);

      selectedData.enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('width', xScale.rangeBand())
        .attr('x', function(d) { return xScale(x(d)) })
        .attr('y', height)
        .attr('height', 0);

      selectedData.transition().duration(duration)
        .attr("x", function(d) { return xScale(x(d)) })
        .attr("y", function(d) { return yScale(y(d)) });
        .attr("height", function(d) {
            return height - yScale(y(d))
        });

      selectedData.exit().transition().duration(duration)
        .attr('x', function(d) { return xScale(x(d)) })
        .attr('y', height)
        .attr('height', 0)
        .remove();
      }

//  REFRESH code

    let timerId = null;
    $(mySection).on('start', function (event, args) {
      if (timerId === null) {
        timerId = setInterval(function () {
          data = refreshData()
          chart.update(data)
        },args.rate)
      }
    });

    $(mySection).on('stop', function () {
      if (timerId !== null) {
        clearInterval(timerId);
        timerId = null;
      }
    })

//  DASHBOARD

    function updateDashboard (addMore,max) {
      for (let i=0; i < addMore; i++) {
        let order = genOrder();
        orders.push(order);
        if (orders.length > max) {
          orders.shift():
          let current = counts.get(order.customer) || 0;
          counts.set(
            order.customer,
            Math.round(current+order.price*order.quantity)
          );
        }

        total = d3.sum(orders,function (d) {
          return d.price*d.quantity
        });

        datatable.update(orders);
        gauge.update(total);
        customerBar.update(counts.topN(5));
      }
    }

//  DATATABLE

    function update(objectArray) {
      let colnames = [];
      if (mydata != null && mydata.length > 0) {
          colnames = d3.keys(objectArray[0])
      }

      let th = thead.selectAll('th').data(colnames,identity)

      th.enter().append('th')
      th.text(identity);
      th.exit().remove();

      let tr = tbody.selectAll('tr').data(objectArray, opts.id)

      tr.enter().append('tr')
      tr.exit().transition().duration(200).remove()

      let cells = tr.selectAll('td').data(d3.values)
      cells.enter().append('td')
      cells.text(identity);
      cells.exit().transition().duration(200).remove();
    }

//  GAUGE

    this._update = function(objectArray) {
      var duration = this.options('transition');

      pointer.transition().duration(duration)
        .attr('transform', 'rotate(' +angle(objectArray) +')');

      value.text(valueFormat(objectArray));
    };

    this._render = function (objectArray) {
      var center = 'translate('+radius +','+ radius +')';
      var colorFn = this.options('arcColorFn');

      var svg = this.svg().append('g').attr('class', 'gauge')
        .attr('width', this.width())
        .attr('height', this.height());

      var arcs = svg.append('g').attr('class', 'arc').attr('transform', center);

      arcs.selectAll('path').data(tickData)
        .enter().append('path')
        .attr('fill', function(d, i) { return colorFn(d * i); })
        .attr('d', arc);

      var labelMargin = this.options('labelMargin');

      var labels = svg.append('g').attr('class', 'label').attr('transform', center);

      labels.selectAll('text').data(ticks)
        .enter().append('text')
        .attr('transform', function(d) {
          return 'rotate(' +angle(d) +') translate(0,' +(labelMargin - radius) +')';
        })
        .text(this.options('labelFormat'));

      var vg = svg.append('g').attr('class', 'value').attr('transform', center);
      value = vg.append('text').attr('transform', 'translate(0,-'+radius/3+')')

      var pointerWidth = this.options('pointerWidth');
      var pointerTailLength = this.options('pointerTailLength');
      var lineData = [
        [pointerWidth / 2, 0],
        [0, -pointerHeadLength],
        [-(pointerWidth / 2), 0],
        [0, pointerTailLength],
        [pointerWidth / 2, 0]
      ];

      var pointerLine = d3.svg.line().interpolate('monotone');
      var pg = svg.append('g').data([lineData])
        .attr('class', 'pointer')
        .attr('transform', centerTx);

      pointer = pg.append('path')
        .attr('d', pointerLine)
        .attr('transform', 'rotate(' +minAngle +')');

      this._update(objectArray ? objectArray : 0);
    };

//  BACK PRESSURE Example UI

    const lastRun = Date.now();
    let onHold = false;

    function refreshChart(timestamp) {
      window.requestAnimationFrame(refreshChart);
      if (timestamp - lastRun > 40) {
        worker.postMessage('hold');
        onHold = true;
      } else if (onHold) {
        worker.postMessage('resume');
      }
      lastRun = timestamp;
      chart.update(data);
    }


//  BACK PRESSURE Example ServiceWorker

    state.eb.registerHandler('votes', function (message) {

      state.queue.push(message);
      state.display.push(message);

      if (state.display.length > 5) {
        state.display.shift();
      }

      if (message.answer) {
        state.counts.set(message.answer, (state.counts.get(message.answer) || 0) + 1);
        state.total += 1;
      }

      if (state.queue.length > config.discard) {
        state.queue.shift();
        state.lost += 1;
        state.eb.send('control','pause', function (reply) {
          state.onHold = true;
        })
      }

      if (onHold && state.queue.length < config.discard * 0.8) {
        state.eb.send('control','resume', function (reply) {
          state.onHold = false;
        });
      }
    });
