import getSeparator from "./getSeparator";

export default (input: string) => {
  const addressesWithAmounts = input.split('\n').map(_ => _.split(getSeparator(_)));

  const output: {
    [key: string]: string
  } = {};

  addressesWithAmounts.forEach(([address, amount]) => {
    if (output[address] === undefined) {
      output[address] = amount;
    }
  });

  return Object.entries(output).map(([address, amount]) => `${address} ${amount}`).join('\n');
}
