import React, { useState } from 'react';
import { Form, FormControlProps } from 'react-bootstrap';
import * as z from 'zod';
import classNames from 'classnames';
import styles from './Input.module.scss';
import RequiredAsterisk from '../RequiredAsterisk/RequiredAsterisk';

export interface InputProps
  extends FormControlProps,
    Omit<
      React.HTMLAttributes<HTMLInputElement | HTMLTextAreaElement>,
      'onChange'
    > {
  label?: string;
  labelClassName?: string;
  error?: string | z.ZodIssue; // Will make the input border red as well
  errorClassName?: string;
  inlinePostText?: string;
  postTextClassName?: string;
  required?: boolean;
  rows?: number; // TODO should be in the html attributes of htmltextareaelement???
}

const Input: React.FC<InputProps> = ({
  label,
  labelClassName,
  error,
  errorClassName,
  inlinePostText,
  postTextClassName,
  required,
  className,
  readOnly,
  onChange,
  isInvalid,
  isValid,
  value,
  children,
  ...formControlProps
}) => {
  const [isEmpty, setIsEmpty] = useState<boolean>(!value || value === '');

  return (
    <Form.Group>
      {(label || required) && (
        <Form.Label className={classNames(styles.label, labelClassName)}>
          {label} {required && <RequiredAsterisk />}
        </Form.Label>
      )}

      <div className="d-flex">
        <Form.Control
          {...formControlProps}
          value={value}
          className={classNames(className, {
            [styles.unfilled]: isEmpty && !readOnly,
            [styles.filled]: !isEmpty || readOnly,
            [styles.readonly]: readOnly,
            [styles.invalid]: (isInvalid || error) && !readOnly,
          })}
          isValid={!readOnly && isValid}
          readOnly={readOnly}
          onChange={(e) => {
            setIsEmpty(!e.target.value || e.target.value === '');
            if (onChange) onChange(e);
          }}
        />

        {inlinePostText && (
          <div className={classNames(styles.inlineText, postTextClassName)}>
            {inlinePostText}
          </div>
        )}
      </div>

      {children}

      {error && (
        <Form.Label className={classNames(styles.error, errorClassName)}>
          {error}
        </Form.Label>
      )}
    </Form.Group>
  );
};

export default Input;
