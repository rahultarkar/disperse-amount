import getSeparator from "./getSeparator";

export default (input: string) => {
  const addressesWithAmounts = input.split('\n').map(_ => _.split(getSeparator(_)));

  const output: {
    [key: string]: number
  } = {};

  addressesWithAmounts.forEach(([address, amount]) => {
    if (output[address] === undefined) {
      output[address] = parseFloat(amount);
    } else {
      output[address] += parseFloat(amount);
    }
  });

  return Object.entries(output).map(([address, amount]) => `${address} ${amount}`).join('\n');
}
