/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Desmos from 'desmos'
import axios from 'axios'

import connectToDatoCms from './connectToDatoCms';
import './style.sass';

@connectToDatoCms(plugin => ({
  developmentMode: plugin.parameters.global.developmentMode,
  fieldValue: plugin.getFieldValue(plugin.fieldPath),
}))

export default class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      expressions: []
    }

    this.renderDesmos = this.renderDesmos.bind(this)

  }
  static propTypes = {
    fieldValue: PropTypes.bool.isRequired,
  }

  renderDesmos() {
    const { plugin } = this.props
    const self = this
    var elt = document.getElementById('desmos-calculator');
    const calculator = Desmos.GraphingCalculator(elt)
    calculator.setExpression({ id: 'graph1', latex: 'y=x^2' })
    self.setState({ expressions: calculator.getState().expressions.list })
    calculator.updateSettings({
      invertedColors: true,
      fontSize: 12,
      backgroundColor: '#4f515a'
    });
    calculator.observeEvent('change', function () {
      self.setState({ expressions: calculator.getState().expressions.list })
    })
  }

  componentDidMount() {
    this.renderDesmos()
  }

  render() {
    const { fieldValue } = this.props;
    console.log("EXP IN STATE", this.state.expressions)
    return (
      <div className="container">
        {fieldValue}
        <input
          type="text"
          name="desmos"
          placeholder="Paste Desmos Url"
          // value={expressions}
          onChange={(e) => this.setState({ [e.target.name]: e.target.value })}
        />
        <br />
        <div id="desmos-calculator" style={{ height: '500px' }}/>
      </div>
    );
  }
}
