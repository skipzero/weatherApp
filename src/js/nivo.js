import React, { Component, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import range from 'lodash/range'
import last from 'lodash/last'
import { area, curveMonotoneX } from 'd3-shapes'
import * as time from 'd3-time'
import { timeFormat } from 'd3-time-format'

function lineChart() {
  const [useData, setData] = useState([]);

  useEffect(() => {
    fetch('https://angerbunny.com/weather',
      {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
        }),
      })
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.error(err))
  }, []);
  if (useData !== []) {
    console.log(useData)
  }
}

ReactDOM.render(lineChart, '#root ')
