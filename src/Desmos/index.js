/* eslint-disable */
import Desmos from "desmos";
const getDesmosId = (desmosUrl) => desmosUrl.split("/").pop();

const getDesmosInstance = () => {
  var elt = document.getElementById("desmos-calculator");
  const calculator = Desmos.GraphingCalculator(elt);
 
  calculator.updateSettings({
    invertedColors: true,
    fontSize: 12,
    backgroundColor: "#4f515a",
  });

  return calculator;
};

export default {
  getDesmosId,
  getDesmosInstance,
};
