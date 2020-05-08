/* eslint-disable */
import React from 'react';
import { render } from 'react-dom';

import Main from './Main';

(function() {
  const desmosEmbed = document.createElement('script')
  desmosEmbed.src = 'https://www.desmos.com/api/v1.5/calculator.js?apiKey=dcb31709b452b1cf9dc26972add0fda6'
  document.body.append(desmosEmbed)
})()

window.DatoCmsPlugin.init((plugin) => {
  plugin.startAutoResizer();
  function setPluginFieldValue (data) { 
    plugin.setFieldValue(plugin.fieldPath, JSON.stringify(data) );
  }

  const container = document.createElement('div');
  document.body.appendChild(container);
  render(<Main plugin={plugin} setPluginFieldValue={setPluginFieldValue} />, container);
});
