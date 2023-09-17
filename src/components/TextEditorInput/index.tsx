import React, { useEffect, useMemo, useRef, useState } from 'react';
import styles from './index.module.css';
import { Line } from './types';
import { NumberOfLines } from './NumerOfLines';

interface TextEditorInputProps {
  readonly value: string;
  readonly onChange: (value: string) => void;
}

export const TextEditorInput: React.FC<TextEditorInputProps> = (props) => {
  const { value, onChange } = props;
  const [numberOfLines, setNumberOfLines] = useState<number>(value.split('\n').length);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const lines = useMemo(() => {
    const _lines: Line[] = [];
    for (let i = 0; i < numberOfLines; i++) {
      _lines.push({
        id: `${i + 1}_line`,
        label: `${i + 1}.`,
      });
    }
    return _lines;
  }, [numberOfLines]);

  useEffect(() => {
    if (numberOfLines !== value.split('\n').length) {
      setNumberOfLines(value.split('\n').length);
    }

    if (textareaRef.current !== null) {
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [value]);

  const onChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { target } = event;
    onChange(target.value);
  }

  return (
    <div className={styles.textEditorInputContainer}>
      <NumberOfLines lines={lines} />
      <textarea
        ref={textareaRef}
        className={styles.textArea}
        value={value} onChange={onChangeHandler}
      />
    </div>
  );
}
