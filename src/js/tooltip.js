function toolTipD3 (tltpName) {
  var s = {};
  s.name = tltpName ? tltpName : 'tooltipd3';
  s.w = 0;	// width tooltip
  s.h = 0;	// height tooltip

  s.t = d3.select('body').append('div') // tooltip html node
    .attr('class', s.name)
    .style('opacity', 1e-6)
    .style('position', 'absolute');

  s.t.on('click', s.mouseout);

  s.mouseover = function(html) {
    s.t.html(html)
      .transition()
      .duration(300)
      .style('opacity', 1);
    s.getTSize();
  };

  s.mousemove = function(){
    var l = d3.event.pageX - s.w/2;
    l = l < 0 ? 0 : l;
    s.t.style('left', l + 'px')
      .style('top', (d3.event.pageY - s.h - 10) + 'px')
      .style('opacity', 1);
  };

  s.mouseout = function() {
    s.t.transition()
      .duration(300)
      .style('opacity', 1e-6)
      .each('end', function(){
        s.t.html('');
      });
  };

  s.getTSize = function(){
    var size = s.t.node().getBoundingClientRect();
    s.w = size.width;
    s.h= size.height;
  };
  return s;
}

module.exports = toolTipD3;
