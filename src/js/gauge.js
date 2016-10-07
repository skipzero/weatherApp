/*eslint no-console: ['error', { allow: ['log', 'info', 'error'] }], no-shadow: [ 0, { 'builtinGlobals': true,}], no-unused-vars: 0, no-invalid-this: 0 */

const gauge = () => {
  const containersRy = document.querySelector('.container');
  const svg = document.querySelector('.typeRange');
  const output = document.querySelector('.output');
  const outline = document.querySelector('.outline');
  const fill = document.querySelector('.fill');
  const center = document.querySelector('.center');
  const needle = document.querySelector('.needle');

<<<<<<< Updated upstream
  const initialValue = document.querySelector('input.initialValue');  //  localStorage.getItem('WindGustMax'); // || 33;
=======
  const initialValue = document.querySelector('input.initialValue'); //  localStorage.getItem('WindGustMax'); // || 33;
>>>>>>> Stashed changes

  const rad = Math.PI / 180;
  const NS = 'http://www.w3.org/2000/svg';

  const W = parseInt(window.getComputedStyle(svg, null).getPropertyValue('width'), 10);
  const offset = 40;
  const cx = ~~(W / 2);
  const cy = 160;

  const r1 = cx - offset;
  const delta = ~~(r1 / 4);

  const initVal = localStorage.getItem('WindGustMax');  //  initialValue.value;

  let isDragging = false;

  const x1 = cx + r1;
  const y1 = cy;

  const r2 = r1 - delta;

  const x2 = offset;
  const y2 = cy;

  const x3 = x1 - delta;
  const y3 = cy;

  function drawScale() {
    const sr1 = r1 + 5;
    const sr2 = r2 - 5;
    const srT = r1 + 20;
    const scale = document.querySelector('.scale');

    function clearRect(node) {
      while (node.firstChild) {
        node.removeChild(node.firstChild);
      }
    }

    clearRect(scale);

    let n = 0;

    for (let sa = -180; sa <= 0; sa += 18) {
      const sx1 = cx + sr1 * Math.cos(sa * rad);
      const sy1 = cy + sr1 * Math.sin(sa * rad);
      const sx2 = cx + sr2 * Math.cos(sa * rad);
      const sy2 = cy + sr2 * Math.sin(sa * rad);
      const sxT = cx + srT * Math.cos(sa * rad);
      const syT = cy + srT * Math.sin(sa * rad);

      const scaleLine = document.createElementNS(NS, 'line');
      const scaleLineObj = {
        class: 'scale',
        x1: sx1,
        y1: sy1,
        x2: sx2,
        y2: sy2,
      };
      setSVGAttributes(scaleLine, scaleLineObj);

      scale.appendChild(scaleLine);

      const scaleText = document.createElementNS(NS, 'text');
      const scaleTextObj = {
        class: 'scale',
        x: sxT,
        y: syT,
      };
      setSVGAttributes(scaleText, scaleTextObj);
      scaleText.textContent = n * 10;
      scale.appendChild(scaleText);

      n++;
    }
  }

  function drawInput(cx, cy, r1, offset, delta, a) {
    const d1 = getD1(cx, cy, r1, offset, delta);
    const d2 = getD2(cx, cy, r1, offset, delta, a);

    drawScale();

    outline.setAttributeNS(null, 'd', d1);
    fill.setAttributeNS(null, 'd', d2);

    drawNeedle(cx, cy, r1, a);
  }

  function updateInput(p, cx, cy, r1, offset, delta) {
    const x = p.x;
    const y = p.y;
    const lx = cx - x;
    const ly = cy - y;

    const a = Math.atan2(ly, lx) / rad - 180;

    drawInput(cx, cy, r1, offset, delta, a);
    output.innerHTML = Math.round((a + 180) / 1.8);
    initialValue.value = Math.round((a + 180) / 1.8);
  }

  function getD1(cx, cy, r1, offset, delta) {
    const x1 = cx + r1;
    const y1 = cy;

    const x2 = offset;
    const y2 = cy;

    const r2 = r1 - delta;

    const x3 = x1 - delta;
    const y3 = cy;

    const d1 = `M ${x1}, ${y1} A${r1},${r1} 0 0 0 ${x2},${y2} H${offset + delta} A${r2},${r2} 0 0 1 ${x3},${y3} z`;
    return d1;
  }

  function getD2(cx, cy, r1, offset, delta, a) {
    a *= rad;
    const r2 = r1 - delta;
    const x4 = cx + r1 * Math.cos(a);
    const y4 = cy + r1 * Math.sin(a);
    const x5 = cx + r2 * Math.cos(a);
    const y5 = cy + r2 * Math.sin(a);

    const d2 = `M ${x4},${y4} A${r1},${r1} 0 0 0 ${x2},${y2} H${offset + delta} A${r2},${r2} 0 0 1 ${x5},${y5} z`;
    return d2;
  }

  function drawNeedle(cx, cy, r1, a) {
    const nx1 = cx + 5 * Math.cos((a - 90) * rad);
    const ny1 = cy + 5 * Math.sin((a - 90) * rad);

    const nx2 = cx + (r1 + 15) * Math.cos(a * rad);
    const ny2 = cy + (r1 + 15) * Math.sin(a * rad);

    const nx3 = cx + 5 * Math.cos((a + 90) * rad);
    const ny3 = cy + 5 * Math.sin((a + 90) * rad);

    const points = `${nx1},${ny1} ${nx2},${ny2} ${nx3},${ny3}`;
    needle.setAttributeNS(null, 'points', points);
  }

  // helpers
  function oMousePos(elmt, evt) {
    const ClientRect = elmt.getBoundingClientRect();

    return {
      x: Math.round(evt.clientX - ClientRect.left),
      y: Math.min(Math.round(evt.clientY - ClientRect.top), cy),
    };
  }

  function setSVGAttributes(elmt, oAtt) {
    for (const prop in oAtt) {
      elmt.setAttributeNS(null, prop, oAtt[prop]);
    }
  }

  // events
  window.addEventListener('load', function () {
    const pa = (initVal * 1.8) - 180;
    const p = {};
    p.x = cx + r1 * Math.cos(pa * rad);
    p.y = cy + r1 * Math.sin(pa * rad);
    updateInput(p, cx, cy, r1, offset, delta);
    getWindSpeed();
  }, false);

  initialValue.addEventListener('input', function() {
    // const val = this.value;

    const val = getWindSpeed();
    console.log('updateVal', val);
    const newVal = (!isNaN(val) && val >= 0 && val <= 100) ? val : 18;
    const pa = (newVal * 1.8) - 180;
    const p = {};
    p.x = cx + r1 * Math.cos(pa * rad);
    p.y = cy + r1 * Math.sin(pa * rad);
    updateInput(p, cx, cy, r1, offset, delta);
  }, false);

  svg.addEventListener('mousedown', function(evt) {
    isDragging = true;
    this.classList.add('focusable');
    const mousePos = oMousePos(svg, evt);
    updateInput(mousePos, cx, cy, r1, offset, delta);
  }, false);

  svg.addEventListener('mouseup', function() {
    isDragging = false;
    this.classList.remove('focusable');
  }, false);

  svg.addEventListener('mouseout', function() {
    isDragging = false;
    this.classList.remove('focusable');
  }, false);

  svg.addEventListener('mousemove', function(evt) {
    if (isDragging) {
      const mousePos = oMousePos(svg, evt);
      updateInput(mousePos, cx, cy, r1, offset, delta);
    }
  }, false);

  function getWindSpeed () {
    let windData;
    const windTimer = setTimeout(() => {
      windData = localStorage.getItem('WindGustMax');
      console.log('local Storage', windData);
      const pa = (windData * 1.8) - 180;
      const p = {};
      p.x = cx + r1 * Math.cos(pa * rad);
      p.y = cy + r1 * Math.sin(pa * rad);
      updateInput(p, cx, cy, r1, offset, delta);
      getWindSpeed();

      // realTimeGauge(windData);

      return windData;
    }, 1000);
    // return windData;
  }
};

//  EPOCH gauge stuff
// function realTimeGauge(data) {
//   $('#gaugeChart').epoch({
//     type: 'time.gauge',
//     value: 0.25,
//     options: {
//       domain: [0,120],
//       ticks: 6,
//       tickSize: 1,
//     },
//   });
// }

gauge();
module.exports = gauge;
