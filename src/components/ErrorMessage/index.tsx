import React from 'react';
import styles from './index.module.css';

interface ErrorMessageProps {
  readonly errorMessages: string[];
}

export const ErrorMessage: React.FC<ErrorMessageProps> = (props) => {
  const { errorMessages } = props;

  return (
    <div className={styles.errorMessage}>
      <div className={styles.left}>

      </div>
      <div className={styles.right}>
        {errorMessages.map((message) => (
          <div key={message}>
            {message}
          </div>
        ))}
      </div>
    </div>
  );
}

ErrorMessage.displayName = 'ErrorMessage';
