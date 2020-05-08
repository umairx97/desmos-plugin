/* eslint-disable */
import Desmos from "desmos";
const getDesmosId = (desmosUrl) => desmosUrl.split("/").pop();

const getDesmosInstance = () => {
  var elt = document.getElementById("desmos-calculator");
  const calculator = Desmos.GraphingCalculator(elt);
  return calculator;
};

export default {
  getDesmosId,
  getDesmosInstance,
};
