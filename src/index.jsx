/* eslint-disable */
import React from 'react';
import { render } from 'react-dom';

import Main from './Main';

window.DatoCmsPlugin.init((plugin) => {
  plugin.startAutoResizer();
  
  function setPluginFieldValue (data) { 
    plugin.setFieldValue(plugin.fieldPath, JSON.stringify(data) );
  }

  const container = document.createElement('div');
  document.body.appendChild(container);
  render(<Main plugin={plugin} setPluginFieldValue={setPluginFieldValue} />, container);
});
