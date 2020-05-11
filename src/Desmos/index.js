/* eslint-disable */
import Desmos from "desmos";

export default {
  getDesmosInstance
}

function getDesmosInstance() {
  var elt = document.getElementById("desmos-calculator");
  const calculator = Desmos.GraphingCalculator(elt);

  calculator.updateSettings({
    invertedColors: true,
    fontSize: 12,
    backgroundColor: "#4f515a",
  });

  return calculator;
}

