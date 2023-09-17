import React from 'react';
import { useIntl } from 'react-intl';
import styles from './index.module.css';
import I18nKey from '../../utils/I18nKey';

interface ErrorActionRowProps {
  readonly keepTheFirstLine: () => void;
  readonly combineBalance: () => void;
}

export const ErrorActionRow: React.FC<ErrorActionRowProps> = (props) => {
  const intl = useIntl();

  const duplicatedLabel = intl.formatMessage({
    id: I18nKey.COMPONENTS_ERROR_ACTION_ROW_DUPLICATED,
  });

  const keepTheFirstOneLabel = intl.formatMessage({
    id: I18nKey.COMPONENTS_ERROR_ACTION_ROW_KEEP_THE_FIRST_LINE,
  });

  const combineBalanceLabel = intl.formatMessage({
    id: I18nKey.COMPONENTS_ERROR_ACTION_ROW_COMBINE_BALANCE,
  });

  const onClickHandler1 = (event: React.MouseEvent) => {
    event.preventDefault();
    props.keepTheFirstLine();
  }

  const onClickHandler2 = (event: React.MouseEvent) => {
    event.preventDefault();
    props.combineBalance();
  }

  return (
    <div className={styles.container}>
      <label className={styles.left}>{duplicatedLabel}</label>
      <div className={styles.right}>
        <a href='#' onClick={onClickHandler1}>{keepTheFirstOneLabel}</a>
        <a href='#' onClick={onClickHandler2}>{combineBalanceLabel}</a>
      </div>
    </div>
  );
}

ErrorActionRow.displayName = 'ErrorActionRow';
