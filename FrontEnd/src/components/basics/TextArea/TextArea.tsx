import React, { FunctionComponent, useState } from 'react';
import { Form, Col, FormControlProps } from 'react-bootstrap';
import styles from './TextArea.module.scss';
import { Body2 } from '@basics';
import * as z from 'zod';
import cn from 'classnames';
import { Icon as IconType, miscIcons } from '@icons';
import { useRandomID } from '@hooks';

interface TextAreaProps extends FormControlProps {
  maxLength: number;
  label?: string;
  error?: string | z.ZodIssue; // Will make the input border red as well
  controlId?: string;
  defaultContent?: string;
  placeHolder?: string;
  className?: string;
  isInvalid?: boolean;
}

const TextArea: FunctionComponent<TextAreaProps> = ({
  maxLength,
  label,
  error,
  controlId,
  isInvalid,
  defaultContent = '',
  readOnly,
  placeHolder = '',
  onChange,
  className,
}) => {
  const randomID = useRandomID(controlId);
  var [content, setContent] = useState<string>(defaultContent);

  return (
    <Form.Row className={className}>
      <Form.Group as={Col} controlId={randomID} className="pl-0">
        {label && <Form.Label className={styles.label}>{label}</Form.Label>}
        <div className={styles.formControlWrapper}>
          <Form.Control
            placeholder={placeHolder}
            readOnly={readOnly}
            as="textarea"
            className={cn(styles.content, {
              [styles.unfilled]: content.length === 0,
              [styles.readOnly]: readOnly,
              [styles.invalid]: isInvalid || error,
            })}
            type="text"
            maxLength={maxLength}
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              if (onChange) onChange(e);
            }}
          />
          <Body2
            className={cn(styles.charCheck, {
              [styles.charCheckError]: error,
            })}
          >
            {content.length}/{maxLength.toString()}
          </Body2>
        </div>
        {error && <miscIcons.alert className={styles.inputStatus} />}
        {error && <Form.Label className={styles.error}>{error}</Form.Label>}
      </Form.Group>
    </Form.Row>
  );
};

export default TextArea;
