import React from 'react';
import { Line } from '../types';
import styles from './index.module.css';

interface NumberOfLinesProps {
  readonly lines: Line[];
}

export const NumberOfLines: React.FC<NumberOfLinesProps> = (props) => {
  const { lines } = props;

  return (
    <div className={styles.container}>
      {lines.map(({ id, label }) => (
        <label className={styles.listItem} key={id}>{label}</label>
      ))}
    </div>
  );
}

NumberOfLines.displayName = 'NumberOfLines';
