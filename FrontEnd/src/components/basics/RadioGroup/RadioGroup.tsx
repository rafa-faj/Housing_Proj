import React, { FunctionComponent } from 'react';
import RadioButton, { RadioButtonProps } from './RadioButton';
import { Row } from 'react-bootstrap';
import { ErrorBox } from '@basics';
import styles from './RadioGroup.module.scss';
import * as z from 'zod';
import cn from 'classnames';

export interface RadioGroupProps {
  buttonProps: RadioButtonProps[];
  wrapperClass?: string;
  className?: string;
  error?: string | z.ZodIssue;
  isInvalid?: boolean;
}

const RadioGroup: FunctionComponent<RadioGroupProps> = ({
  buttonProps,
  error,
  isInvalid,
  wrapperClass = 'mr-3',
  className = 'w-100',
}) => {
  return (
    <Row className={cn(className, styles.wrapperRow)}>
      {(isInvalid || error) && <ErrorBox />}
      {buttonProps.map((props, index) => (
        <div
          key={index.toString()}
          className={cn(wrapperClass, styles.buttonGroupChild)}
        >
          <RadioButton {...props} />
        </div>
      ))}
    </Row>
  );
};

export default RadioGroup;
