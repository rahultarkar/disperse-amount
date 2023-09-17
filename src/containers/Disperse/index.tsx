import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import I18nKey from '../../utils/I18nKey';
import styles from './index.module.css';
import { TextEditorInput } from '../../components/TextEditorInput';
import isValid from '../../utils/isValid';
import { ErrorMessage } from '../../components/ErrorMessage';
import { Button } from '../../components/Button';
import { ErrorActionRow } from '../../components/ErrorActionRow';
import keepFirstAddress from '../../utils/keepFirstAddress';
import combineBalance from '../../utils/combineBalance';

interface DisperseProps {}

export const Disperse: React.FC<DisperseProps> = () => {
  const intl = useIntl();
  const [value, setValue] = useState<string>('');
  const [isInputValid, setInputValid] = useState<boolean>(true);
  const [hasDuplicates, setDuplicates] = useState<boolean>(false);
  const [isAmountInvalid, setAmountInvalid] = useState<boolean>(false);

  const addressesWithAmountLabel = intl.formatMessage({
    id: I18nKey.CONTAINERS_DISPERSE_ADDRESSES_WITH_AMOUNT
  });

  const separatedLabel = intl.formatMessage({
    id: I18nKey.CONTAINERS_DISPERSE_SEPARATED_TEXT
  });

  const nextLabel = intl.formatMessage({
    id: I18nKey.COMPONENTS_BUTTON_LABEL_NEXT
  });

  const onSubmit = () => {
    const validObject = isValid(intl, value);

    if (validObject.isInputValid === false) setInputValid(false);
    if (validObject.hasDuplicates === true) setDuplicates(true);
    if (validObject.isAmountValid === false) setAmountInvalid(true);
  }

  const keepFirstOne = () => {
    setValue(keepFirstAddress(value));
    setAmountInvalid(false);
    setDuplicates(false);
    setInputValid(true);
  }

  const combineBalances = () => {
    setValue(combineBalance(value));
    setAmountInvalid(false);
    setDuplicates(false);
    setInputValid(true);
  }

  return (
    <div className={styles.container}>
      <label>{addressesWithAmountLabel}</label>
        <TextEditorInput
          value={value}
          onChange={(inputValue: string) => {
            setValue(inputValue)
            setInputValid(true);
            setAmountInvalid(false);
            setDuplicates(false);
          }}
        />
      <label>{separatedLabel}</label>
      {hasDuplicates && !isAmountInvalid ? (
        <ErrorActionRow
          keepTheFirstLine={keepFirstOne}
          combineBalance={combineBalances}
        />
      ) : null}
      {!isInputValid 
        ? <ErrorMessage errorMessages={isValid(intl, value).errorMessages} /> 
        : null}
      <div className={styles.submitBtn}>
        <Button onClick={onSubmit} label={nextLabel} />
      </div>
    </div>
  );
}

Disperse.displayName = 'Disperse';
