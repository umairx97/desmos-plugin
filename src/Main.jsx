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

  static propTypes = {
    fieldValue: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      desmosURL: "",
      desmosInstance: null,
    };

    this.renderDesmos = this.renderDesmos.bind(this);
    this.importDesmos = this.importDesmos.bind(this);
    this.updateDesmos = this.updateDesmos.bind(this);
  }


  componentDidMount() {
    this.renderDesmos();
  }

  renderDesmos() {
    const { plugin } = this.props;
    const initialGraph = JSON.parse(
      plugin.getFieldValue(plugin.fieldPath) || "{}"
    );

    const calculator = Desmos.getDesmosInstance();
    calculator.setState(initialGraph.state)
    this.setState({ desmosInstance: calculator });
  }

  importDesmos() {
    const { desmosURL, desmosInstance } = this.state;
    const { plugin, setPluginFieldValue } = this.props

    if (!desmosURL) return plugin.alert("Please Input Desmos Graph Url")

    // https://www.desmos.com/calculator/zwul0vwq80
    axios.get(desmosURL).then((response) => {
      this.setState({ desmosURL: '' })
      desmosInstance.setState(response.data.state);
      setPluginFieldValue({
        state: desmosInstance.getState(),
        settings: desmosInstance.settings,
      });

      plugin.notice('Desmos Graph Imported')
    }).catch(err => {
      plugin.alert(err.message)
    });
  }


  updateDesmos() {
    const { desmosInstance } = this.state
    const { setPluginFieldValue, plugin } = this.props

    setPluginFieldValue({
      state: desmosInstance.getState(),
      settings: desmosInstance.settings,
    });

    plugin.notice('Desmos Graph Updated')
  }


  render() {
    const { fieldValue, plugin } = this.props;
    return (
      <div className="container">
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
        <button className="desmos-btn" onClick={this.updateDesmos}>
          Update Desmos
        </button>
      </div>
    );
  }
}
