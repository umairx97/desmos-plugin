/* eslint-disable */
import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Desmos from "./Desmos";
import connectToDatoCms from "./connectToDatoCms";
import "./main.css";
import "./style.sass";

@connectToDatoCms((plugin) => ({
  developmentMode: plugin.parameters.global.developmentMode,
  fieldValue: plugin.getFieldValue(plugin.fieldPath),
}))
export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expressions: [],
      desmosURL: "",
      desmosInstance: null,
    };

    this.renderDesmos = this.renderDesmos.bind(this);
    this.importDesmos = this.importDesmos.bind(this);
  }

  static propTypes = {
    fieldValue: PropTypes.bool.isRequired,
  };

  renderDesmos() {
    const calculator = Desmos.getDesmosInstance();
    calculator.updateSettings({
      invertedColors: true,
      fontSize: 12,
      backgroundColor: "#4f515a",
    });

    this.setState({
      desmosInstance: calculator,
      expressions: calculator.getState().expressions.list,
    });

    calculator.observeEvent("change", () => {
      this.setState({ expressions: calculator.getState().expressions.list });
    });
  }

  importDesmos() {
    const { desmosURL, desmosInstance } = this.state;
    // https://www.desmos.com/calculator/zwul0vwq80
    axios.get(desmosURL).then((response) => {
      desmosInstance.setState(response.data.state);
      this.props.setPluginFieldValue({
        state: desmosInstance.getState(),
        settings: desmosInstance.settings,
      });
    });
  }

  componentDidMount() {
    this.renderDesmos();
  }

  render() {
    const { fieldValue, plugin } = this.props;
    return (
      <div className="container">
        {/* {JSON.stringify(fieldValue)} */}
        <input
          type="text"
          name="desmosURL"
          value={this.state.desmosURL}
          placeholder="Paste Desmos Url"
          onChange={(ev) =>
            this.setState({ [ev.target.name]: ev.target.value })
          }
        />
        <button className="desmos-btn" onClick={this.importDesmos}>
          Import Desmos
        </button>
        <div id="desmos-calculator" style={{ height: "500px" }} />
        {/* <button className="desmos-btn">Update Desmos</button> */}
      </div>
    );
  }
}
