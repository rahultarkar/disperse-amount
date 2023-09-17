import I18nKey from './I18nKey';
import { ADDRESSES } from './consts';
import { IntlShape } from 'react-intl';
import getSeparator from './getSeparator';

const isValidAmount = (amount: string) => {
  if (amount === undefined) return true;
  for (let i = 0; i < amount.length; i++) {
    if (isNaN(parseFloat(amount[i]))) return false;
  }

  return true;
}

const getErrorMessages = (intl: IntlShape, addressesWithAmounts: Array<Array<string>>) => {
  const messages: string[] = [];
  const _obj: {
    [key: string]: {
      line: number,
      address: string,
      isValidAmount: boolean,
      isDuplicate: boolean,
      duplicateLines: number[],
    }
  } = {};
  addressesWithAmounts.forEach(([address, amount], index) => {
    const isValid  = isValidAmount(amount);

    if (!isValid) {
      messages.push(intl.formatMessage({
        id: I18nKey.COMPONENTS_ERROR_MESSAGE_INVALID_AMOUNT
      }, {
        address,
        line: index + 1,
      }));
    }

    if (_obj[address] === undefined) {
      _obj[address] = {
        address,
        duplicateLines: [index + 1],
        isDuplicate: false,
        isValidAmount: isValid,
        line: index + 1,
      }
    } else {
      _obj[address].isDuplicate = true;
      _obj[address].duplicateLines = [..._obj[address].duplicateLines, index + 1];
    }
  });

  Object.entries(_obj).forEach(([address, value]) => {
    if (value.isDuplicate) {
      messages.push(intl.formatMessage({
        id: I18nKey.COMPONENTS_ERROR_MESSAGE_DUPLICATE_ROWS,
      }, {
        lines: value.duplicateLines.join(','),
        address,
      }))
    }
  });

  return messages;
}

export default (intl: IntlShape, input: string) => {
  const addressesWithAmounts = input.split('\n').map(addressWithAmount => addressWithAmount.split(getSeparator(addressWithAmount)));
  const _obj: {
    [key: string]: number;
  } = {};

  addressesWithAmounts.forEach(([address]) => {
    if (_obj[address] === undefined) {
      _obj[address] = 1;
    } else {
      _obj[address]++;
    }
  });
  
  return {
    isInputValid: addressesWithAmounts.every(([address, amount]) => {
      return _obj[address] === 1 && isValidAmount(amount);
    }),
    errorMessages: getErrorMessages(intl, addressesWithAmounts),
    hasDuplicates: addressesWithAmounts.some(([address]) => _obj[address] > 1),
    isAmountValid: addressesWithAmounts.every(([_, amount]) => isValidAmount(amount))
  }
}
