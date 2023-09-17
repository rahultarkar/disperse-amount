import React from "react";
import styles from './index.module.css';

interface ButtonProps {
  readonly onClick: () => void;
  readonly label: string;
}

export const Button: React.FC<ButtonProps> = (props) => {
  const { onClick, label } = props;

  return (
    <button className={styles.button} onClick={onClick}>
      {label}
    </button>
  );
}

Button.displayName = 'Button';
