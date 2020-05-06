import React, { Component } from 'react';
import PropTypes from 'prop-types';

import connectToDatoCms from './connectToDatoCms';
import './style.sass';

@connectToDatoCms(plugin => ({
  developmentMode: plugin.parameters.global.developmentMode,
  fieldValue: plugin.getFieldValue(plugin.fieldPath),
}))

export default class Main extends Component {
  static propTypes = {
    fieldValue: PropTypes.bool.isRequired,
  }

  render() {
    const { fieldValue } = this.props;

    return (
      <div className="container">
        {JSON.stringify(fieldValue)}
      </div>
    );
  }
}
